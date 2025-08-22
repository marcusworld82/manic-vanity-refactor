#!/usr/bin/env tsx
/**
 * Generate sitemap.xml at build time
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Environment validation  
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing required environment variables for sitemap generation');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface SitemapEntry {
  path: string;
  lastmod?: string;
  priority?: number;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

/**
 * Static routes with priorities
 */
const staticRoutes: SitemapEntry[] = [
  { path: '/', priority: 1.0, changefreq: 'daily' },
  { path: '/shop', priority: 0.9, changefreq: 'daily' },
  { path: '/auth/sign-in', priority: 0.5, changefreq: 'monthly' },
  { path: '/auth/sign-up', priority: 0.5, changefreq: 'monthly' }
];

/**
 * Fetch dynamic product routes
 */
async function getProductRoutes(): Promise<SitemapEntry[]> {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('slug, created_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products for sitemap:', error);
      return [];
    }

    return products?.map(product => ({
      path: `/product/${product.slug}`,
      lastmod: new Date(product.created_at).toISOString().split('T')[0],
      priority: 0.8,
      changefreq: 'weekly' as const
    })) || [];
  } catch (error) {
    console.error('Failed to fetch product routes:', error);
    return [];
  }
}

/**
 * Fetch dynamic category routes
 */
async function getCategoryRoutes(): Promise<SitemapEntry[]> {
  try {
    const { data: categories, error } = await supabase
      .from('categories')
      .select('slug')
      .order('name');

    if (error) {
      console.error('Error fetching categories for sitemap:', error);
      return [];
    }

    return categories?.map(category => ({
      path: `/shop?category=${category.slug}`,
      priority: 0.7,
      changefreq: 'weekly' as const
    })) || [];
  } catch (error) {
    console.error('Failed to fetch category routes:', error);
    return [];
  }
}

/**
 * Generate XML sitemap content
 */
function generateSitemapXML(entries: SitemapEntry[]): string {
  const baseUrl = 'https://example.com'; // Will be replaced at build time
  
  const urlEntries = entries.map(entry => {
    const lastmod = entry.lastmod || new Date().toISOString().split('T')[0];
    const priority = entry.priority?.toFixed(1) || '0.7';
    const changefreq = entry.changefreq || 'weekly';
    
    return `  <url>
    <loc>${baseUrl}${entry.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Main sitemap generation function
 */
async function generateSitemap() {
  try {
    console.log('🗺️  Generating sitemap...');
    
    // Collect all routes
    const [productRoutes, categoryRoutes] = await Promise.all([
      getProductRoutes(),
      getCategoryRoutes()
    ]);
    
    const allRoutes = [
      ...staticRoutes,
      ...productRoutes,
      ...categoryRoutes
    ];
    
    // Generate XML
    const sitemapXML = generateSitemapXML(allRoutes);
    
    // Ensure public directory exists
    const publicDir = path.join(process.cwd(), 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write sitemap.xml
    const sitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(sitemapPath, sitemapXML, 'utf8');
    
    console.log(`✅ Sitemap generated with ${allRoutes.length} URLs`);
    console.log(`   📍 Static routes: ${staticRoutes.length}`);
    console.log(`   📦 Product routes: ${productRoutes.length}`);
    console.log(`   🏷️  Category routes: ${categoryRoutes.length}`);
    console.log(`   📄 Saved to: ${sitemapPath}`);
    
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateSitemap();
}

export { generateSitemap };