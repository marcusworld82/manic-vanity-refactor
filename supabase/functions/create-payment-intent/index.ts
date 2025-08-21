import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Stripe
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? ""
    );

    // Get the request data
    const { cartId, amount } = await req.json();

    if (!cartId || !amount) {
      return new Response(
        JSON.stringify({ error: "cartId and amount are required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Verify cart exists and get items
    const { data: cartItems, error: cartError } = await supabaseClient
      .from("cart_items")
      .select(`
        *,
        products (name, price_cents),
        variants (name, price_cents)
      `)
      .eq("cart_id", cartId);

    if (cartError) {
      console.error("Cart error:", cartError);
      return new Response(
        JSON.stringify({ error: "Failed to fetch cart items" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    if (!cartItems || cartItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Calculate total from cart items (server-side verification)
    let calculatedTotal = 0;
    for (const item of cartItems) {
      const unitPrice = item.variants?.price_cents || item.products.price_cents;
      calculatedTotal += unitPrice * item.qty;
    }

    // Verify the amount matches (within reasonable tolerance for rounding)
    if (Math.abs(calculatedTotal - amount) > 1) {
      console.error("Amount mismatch:", { calculatedTotal, providedAmount: amount });
      return new Response(
        JSON.stringify({ error: "Amount verification failed" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Get or create Stripe customer
    const authHeader = req.headers.get("Authorization");
    let customerId = null;
    
    if (authHeader) {
      try {
        const token = authHeader.replace("Bearer ", "");
        const { data: userData } = await supabaseClient.auth.getUser(token);
        
        if (userData.user?.email) {
          // Check if customer exists
          const customers = await stripe.customers.list({ 
            email: userData.user.email, 
            limit: 1 
          });
          
          if (customers.data.length > 0) {
            customerId = customers.data[0].id;
          } else {
            // Create new customer
            const customer = await stripe.customers.create({
              email: userData.user.email,
              metadata: {
                supabase_user_id: userData.user.id,
              },
            });
            customerId = customer.id;
          }
        }
      } catch (authError) {
        console.log("Auth error (proceeding as guest):", authError);
      }
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculatedTotal,
      currency: "usd",
      customer: customerId,
      metadata: {
        cart_id: cartId,
        item_count: cartItems.length.toString(),
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Optional: Create draft order record
    try {
      const { error: orderError } = await supabaseClient
        .from("orders")
        .insert({
          stripe_session_id: paymentIntent.id,
          total_cents: calculatedTotal,
          currency: "usd",
          status: "pending",
          temp_cart: cartItems, // Store cart snapshot
        });

      if (orderError) {
        console.error("Order creation error:", orderError);
        // Don't fail the payment intent creation for this
      }
    } catch (orderCreateError) {
      console.error("Failed to create draft order:", orderCreateError);
    }

    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );

  } catch (error) {
    console.error("Payment intent creation error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});