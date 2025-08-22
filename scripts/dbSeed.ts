#!/usr/bin/env tsx
/**
 * Database seeding script
 * Runs Supabase schema + seed data idempotently
 */

import { createClient } from '@supabase/supabase-js';

// Environment validation
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  if (!SUPABASE_URL) console.error('  - VITE_SUPABASE_URL');
  if (!SUPABASE_SERVICE_KEY) console.error('  - SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Sample data for seeding
 */
const seedData = {
  categories: [
    { name: 'Outerwear', slug: 'outerwear' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'T-Shirts', slug: 't-shirts' },
    { name: 'Bottoms', slug: 'bottoms' },
    { name: 'Footwear', slug: 'footwear' },
    { name: 'Accessories', slug: 'accessories' }
  ],
  products: [
    {
      name: 'Midnight Rebellion Jacket',
      slug: 'midnight-rebellion-jacket',
      description: 'Bold leather jacket with electric blue accents. Perfect for making a statement.',
      price_cents: 29900,
      compare_at_cents: 34900,
      currency: 'usd'
    },
    {
      name: 'Neon Dreams Hoodie',
      slug: 'neon-dreams-hoodie', 
      description: 'Ultra-soft hoodie with vibrant neon graphics. Comfort meets style.',
      price_cents: 18900,
      currency: 'usd'
    },
    {
      name: 'Electric Pulse Sneakers',
      slug: 'electric-pulse-sneakers',
      description: 'High-performance sneakers with LED accents. The future of footwear.',
      price_cents: 25900,
      currency: 'usd'
    },
    {
      name: 'Cyber Punk Tee',
      slug: 'cyber-punk-tee',
      description: 'Premium cotton tee with futuristic design. Everyday rebellion.',
      price_cents: 8900,
      currency: 'usd'
    },
    {
      name: 'Holographic Backpack',
      slug: 'holographic-backpack',
      description: 'Spacious backpack with color-shifting material. Practical meets magical.',
      price_cents: 14900,
      currency: 'usd'
    },
    {
      name: 'Neon Stripe Joggers',
      slug: 'neon-stripe-joggers',
      description: 'Comfortable joggers with reflective neon stripes. Move with confidence.',
      price_cents: 12900,
      currency: 'usd'
    }
  ],
  product_images: [
    { product_slug: 'midnight-rebellion-jacket', url: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Midnight Rebellion Jacket', position: 0 },
    { product_slug: 'neon-dreams-hoodie', url: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Neon Dreams Hoodie', position: 0 },
    { product_slug: 'electric-pulse-sneakers', url: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Electric Pulse Sneakers', position: 0 },
    { product_slug: 'cyber-punk-tee', url: 'https://images.pexels.com/photos/1656684/pexels-photo-1656684.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Cyber Punk Tee', position: 0 },
    { product_slug: 'holographic-backpack', url: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Holographic Backpack', position: 0 },
    { product_slug: 'neon-stripe-joggers', url: 'https://images.pexels.com/photos/2598024/pexels-photo-2598024.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Neon Stripe Joggers', position: 0 }
  ],
  variants: [
    { product_slug: 'midnight-rebellion-jacket', name: 'Small', sku: 'MRJ-S', stock: 10 },
    { product_slug: 'midnight-rebellion-jacket', name: 'Medium', sku: 'MRJ-M', stock: 15 },
    { product_slug: 'midnight-rebellion-jacket', name: 'Large', sku: 'MRJ-L', stock: 12 },
    { product_slug: 'neon-dreams-hoodie', name: 'Small', sku: 'NDH-S', stock: 8 },
    { product_slug: 'neon-dreams-hoodie', name: 'Medium', sku: 'NDH-M', stock: 20 },
    { product_slug: 'neon-dreams-hoodie', name: 'Large', sku: 'NDH-L', stock: 16 },
    { product_slug: 'electric-pulse-sneakers', name: 'US 8', sku: 'EPS-8', stock: 5 },
    { product_slug: 'electric-pulse-sneakers', name: 'US 9', sku: 'EPS-9', stock: 8 },
    { product_slug: 'electric-pulse-sneakers', name: 'US 10', sku: 'EPS-10', stock: 12 },
    { product_slug: 'electric-pulse-sneakers', name: 'US 11', sku: 'EPS-11', stock: 6 }
  ]
};

/**
 * Seed categories
 */
async function seedCategories() {
  console.log('🌱 Seeding categories...');
  
  for (const category of seedData.categories) {
    const { error } = await supabase
      .from('categories')
      .upsert(category, { onConflict: 'slug', ignoreDuplicates: false });
    
    if (error) {
      console.error(`❌ Error seeding category ${category.name}:`, error);
    } else {
      console.log(`✅ Seeded category: ${category.name}`);
    }
  }
}

/**
 * Seed products with categories
 */
async function seedProducts() {
  console.log('🌱 Seeding products...');
  
  // Get categories to assign to products
  const { data: categories } = await supabase.from('categories').select('id, slug');
  const categoryMap = new Map(categories?.map(c => [c.slug, c.id]) || []);
  
  const categoryAssignments = {
    'midnight-rebellion-jacket': 'outerwear',
    'neon-dreams-hoodie': 'hoodies',
    'electric-pulse-sneakers': 'footwear',
    'cyber-punk-tee': 't-shirts',
    'holographic-backpack': 'accessories',
    'neon-stripe-joggers': 'bottoms'
  };

  for (const product of seedData.products) {
    const categoryId = categoryMap.get(categoryAssignments[product.slug as keyof typeof categoryAssignments]);
    
    const { error } = await supabase
      .from('products')
      .upsert({ ...product, category_id: categoryId }, { onConflict: 'slug', ignoreDuplicates: false });
    
    if (error) {
      console.error(`❌ Error seeding product ${product.name}:`, error);
    } else {
      console.log(`✅ Seeded product: ${product.name}`);
    }
  }
}

/**
 * Seed product images  
 */
async function seedProductImages() {
  console.log('🌱 Seeding product images...');
  
  // Get products to link images
  const { data: products } = await supabase.from('products').select('id, slug');
  const productMap = new Map(products?.map(p => [p.slug, p.id]) || []);
  
  for (const image of seedData.product_images) {
    const productId = productMap.get(image.product_slug);
    if (!productId) continue;

    const { error } = await supabase
      .from('product_images')
      .upsert({
        product_id: productId,
        url: image.url,
        alt: image.alt,
        position: image.position
      }, { onConflict: 'product_id,position', ignoreDuplicates: false });
    
    if (error) {
      console.error(`❌ Error seeding image for ${image.product_slug}:`, error);
    } else {
      console.log(`✅ Seeded image for: ${image.product_slug}`);
    }
  }
}

/**
 * Seed product variants
 */
async function seedVariants() {
  console.log('🌱 Seeding variants...');
  
  // Get products to link variants
  const { data: products } = await supabase.from('products').select('id, slug');
  const productMap = new Map(products?.map(p => [p.slug, p.id]) || []);
  
  for (const variant of seedData.variants) {
    const productId = productMap.get(variant.product_slug);
    if (!productId) continue;

    const { error } = await supabase
      .from('variants')
      .upsert({
        product_id: productId,
        name: variant.name,
        sku: variant.sku,
        stock: variant.stock
      }, { onConflict: 'sku', ignoreDuplicates: false });
    
    if (error) {
      console.error(`❌ Error seeding variant ${variant.sku}:`, error);
    } else {
      console.log(`✅ Seeded variant: ${variant.sku}`);
    }
  }
}

/**
 * Main seeding function
 */
async function seed() {
  try {
    console.log('🚀 Starting database seeding...\n');
    
    await seedCategories();
    console.log('');
    
    await seedProducts();
    console.log('');
    
    await seedProductImages();
    console.log('');
    
    await seedVariants();
    console.log('');
    
    console.log('✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

/**
 * Reset and reseed function
 */
async function reset() {
  try {
    console.log('🔄 Resetting database...\n');
    
    // Delete in reverse order due to foreign keys
    await supabase.from('variants').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('product_images').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('cart_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('wishlist_items').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('categories').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    
    console.log('🗑️  Database reset completed\n');
    
    await seed();
  } catch (error) {
    console.error('❌ Reset failed:', error);
    process.exit(1);
  }
}

// CLI handling
const command = process.argv[2];

if (command === 'reset') {
  reset();
} else {
  seed();
}