/**
 * SEO utilities and structured data helpers
 */

export interface ProductSEOData {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  availability: 'InStock' | 'OutOfStock' | 'PreOrder';
  brand?: string;
  sku?: string;
  url?: string;
}

export interface PageSEOData {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'product' | 'article';
  structuredData?: Record<string, any>;
}

/**
 * Generate product JSON-LD structured data
 */
export function generateProductJsonLd(product: ProductSEOData): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "brand": {
      "@type": "Brand",
      "name": product.brand || "MANIC VANITY"
    },
    "sku": product.sku,
    "offers": {
      "@type": "Offer",
      "price": product.price,
      "priceCurrency": product.currency.toUpperCase(),
      "availability": `https://schema.org/${product.availability}`,
      "url": product.url
    }
  };
}

/**
 * Generate organization JSON-LD structured data
 */
export function generateOrganizationJsonLd(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MANIC VANITY",
    "description": "Fearless fashion for bold individuals. Express your unique style with our curated collection of vibrant, statement pieces.",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/logo.png` : '',
    "sameAs": [
      "https://instagram.com/manicvanity",
      "https://twitter.com/manicvanity"
    ]
  };
}

/**
 * Generate website JSON-LD structured data
 */
export function generateWebsiteJsonLd(): Record<string, any> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "MANIC VANITY",
    "description": "Fearless fashion for bold individuals",
    "url": typeof window !== 'undefined' ? window.location.origin : '',
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${typeof window !== 'undefined' ? window.location.origin : ''}/shop?search={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate meta tags for a page
 */
export function generateMetaTags(seo: PageSEOData): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const fullUrl = seo.canonical ? `${origin}${seo.canonical}` : '';
  
  const tags = [
    // Basic meta tags
    `<title>${seo.title}</title>`,
    `<meta name="description" content="${seo.description}" />`,
    seo.canonical ? `<link rel="canonical" href="${fullUrl}" />` : '',
    
    // Open Graph tags
    `<meta property="og:title" content="${seo.title}" />`,
    `<meta property="og:description" content="${seo.description}" />`,
    `<meta property="og:type" content="${seo.type || 'website'}" />`,
    fullUrl ? `<meta property="og:url" content="${fullUrl}" />` : '',
    seo.image ? `<meta property="og:image" content="${seo.image}" />` : '',
    `<meta property="og:site_name" content="MANIC VANITY" />`,
    
    // Twitter Card tags
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${seo.title}" />`,
    `<meta name="twitter:description" content="${seo.description}" />`,
    seo.image ? `<meta name="twitter:image" content="${seo.image}" />` : '',
    
    // Structured data
    seo.structuredData ? `<script type="application/ld+json">${JSON.stringify(seo.structuredData, null, 2)}</script>` : ''
  ].filter(Boolean);
  
  return tags.join('\n');
}

/**
 * Set document head meta tags
 */
export function setPageSEO(seo: PageSEOData): void {
  if (typeof document === 'undefined') return;
  
  // Set title
  document.title = seo.title;
  
  // Set or update meta description
  let metaDescription = document.querySelector('meta[name="description"]');
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.setAttribute('name', 'description');
    document.head.appendChild(metaDescription);
  }
  metaDescription.setAttribute('content', seo.description);
  
  // Set canonical link
  if (seo.canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${window.location.origin}${seo.canonical}`);
  }
  
  // Set structured data
  if (seo.structuredData) {
    // Remove existing structured data scripts
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(seo.structuredData, null, 2);
    document.head.appendChild(script);
  }
}

/**
 * Generate sitemap XML
 */
export function generateSitemap(routes: Array<{ path: string; lastmod?: string; priority?: number }>): string {
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
  
  const urlEntries = routes.map(route => {
    const lastmod = route.lastmod || new Date().toISOString().split('T')[0];
    const priority = route.priority || 0.7;
    
    return `  <url>
    <loc>${origin}${route.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

export default {
  generateProductJsonLd,
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  generateMetaTags,
  setPageSEO,
  generateSitemap
};