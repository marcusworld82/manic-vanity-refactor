import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { stripePromise } from './lib/stripe';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import CartDrawer from './components/Cart/CartDrawer';
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignInForm from './components/Auth/SignInForm';
import SignUpForm from './components/Auth/SignUpForm';
import Account from './pages/Account';
import CommandCenter from './pages/CommandCenter';
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
// Validate environment on app start
import './lib/env';

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Elements stripe={stripePromise}>
          <AuthProvider>
            <CartProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  {/* Auth Routes */}
                  <Route path="/auth/sign-in" element={<SignInForm />} />
                  <Route path="/auth/sign-up" element={<SignUpForm />} />

                  {/* Main App Routes */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    <Route path="order/success/:paymentIntentId?" element={<OrderSuccess />} />
                    <Route path="account" element={
                      <ProtectedRoute>
                        <Account />
                      </ProtectedRoute>
                    } />
                    <Route path="command-center" element={
                      <ProtectedRoute>
                        <CommandCenter />
                      </ProtectedRoute>
                    } />
                  </Route>

                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <CartDrawer />
              </BrowserRouter>
            </CartProvider>
          </AuthProvider>
        </Elements>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
