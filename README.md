# MANIC VANITY - Fearless Fashion E-Commerce

**URL**: https://lovable.dev/projects/76605020-b0c0-4c0d-9b55-a446e2a67fd2

A bold, modern e-commerce platform built with React, TypeScript, and Supabase. Express your unique style with our curated collection of vibrant, statement pieces.

## 🚀 Quick Setup

### Prerequisites
- Node.js & npm ([install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- Supabase account
- Stripe account (optional)

### Environment Setup

1. **Clone and install dependencies:**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
npm install
```

2. **Configure environment variables:**
Create a `.env` file with these required variables:
```bash
# Supabase Configuration (Required)
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Admin Panel (Development Only)
VITE_ENABLE_ADMIN=false
```

3. **Database setup and seeding:**
```bash
# Seed the database with sample data
npm run db:seed

# Or reset and reseed (clears all data first)
npm run db:reset
```

4. **Start development server:**
```bash
npm run dev
```

## 🗄️ Database Management

### Seeding Commands
```bash
# Seed database with sample data (safe, won't duplicate)
npm run db:seed

# Reset database and reseed (⚠️  destructive - removes all data)
npm run db:reset
```

The seeding script will populate your database with:
- **6 Categories**: Outerwear, Hoodies, T-Shirts, Bottoms, Footwear, Accessories
- **6 Products**: Sample fashion items with images and descriptions
- **Product Images**: High-quality stock photos for each product
- **Variants**: Size and color options for products

### Database Schema
The app uses these main tables:
- `categories` - Product categories
- `products` - Product catalog with pricing
- `product_images` - Product photos and media
- `variants` - Size/color options and inventory
- `carts` & `cart_items` - Shopping cart functionality
- `orders` & `order_items` - Order management
- `addresses` - Customer shipping addresses

## 🎨 Technology Stack

- **Frontend**: Vite + React + TypeScript
- **UI Components**: shadcn/ui + Tailwind CSS
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Payments**: Stripe Integration
- **State Management**: React Query + Context API
- **Animation**: Framer Motion
- **Deployment**: Lovable Platform

## 🔧 Available Scripts

### Development
```bash
npm run dev          # Start development server
npm run build        # Production build with sitemap generation
npm run build:dev    # Development build
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Database
```bash
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset and reseed database
```

### SEO & Performance
```bash
npm run sitemap:generate  # Generate sitemap.xml from routes
npm run lighthouse       # Run Lighthouse performance audit
```

## 🛡️ Environment Validation

The app automatically validates required environment variables on startup. If any required variables are missing, you'll see a clear error message with instructions.

**Required Variables:**
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Optional Variables:**
- `VITE_STRIPE_PUBLISHABLE_KEY` (for payments)
- `VITE_ENABLE_ADMIN` (admin features)

## 🔒 Stripe Configuration

The app automatically detects test vs live Stripe modes:
- **Test Mode**: Keys starting with `pk_test_`
- **Live Mode**: Keys starting with `pk_live_`

The mode is logged to console on app startup for verification.

## 📊 SEO & Performance

### SEO Features
- ✅ Automatic meta tags and Open Graph data
- ✅ Product JSON-LD structured data
- ✅ Canonical URLs
- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Semantic HTML structure

### Performance Features
- ✅ Image lazy loading
- ✅ Code splitting with React lazy loading
- ✅ React Query caching
- ✅ Optimized build process

### Performance Monitoring
```bash
npm run lighthouse
```
This generates performance reports in HTML and JSON formats.

## 🛒 E-Commerce Features

### Implemented
- ✅ Product catalog with categories
- ✅ Shopping cart with persistence
- ✅ User authentication (Supabase Auth)
- ✅ Stripe checkout integration
- ✅ Order management
- ✅ Responsive design
- ✅ Search and filtering
- ✅ Product variants (sizes, colors)

### Authentication
- Email/password authentication
- Session persistence
- Protected routes
- User profile management

### Cart System
- Server-side cart persistence
- Real-time cart synchronization
- Guest cart support with cookie fallback

## 📱 Pages & Routes

- `/` - Homepage with featured products
- `/shop` - Product catalog with filters
- `/product/:slug` - Product detail pages
- `/cart` - Shopping cart
- `/checkout` - Secure checkout (protected)
- `/order/success/:id` - Order confirmation
- `/account` - User account management (protected)
- `/auth/sign-in` - Login page
- `/auth/sign-up` - Registration page

## 🎯 Design System

The app uses a comprehensive design system with:
- **Color Tokens**: Semantic color variables for theming
- **Typography**: Consistent font scales and weights
- **Spacing**: Systematic spacing tokens
- **Components**: Reusable UI components with variants
- **Animations**: Consistent motion design

All colors use HSL format and semantic tokens for easy theming.

## 🚀 Deployment

### Deploy with Lovable
1. Visit your [Lovable Project](https://lovable.dev/projects/76605020-b0c0-4c0d-9b55-a446e2a67fd2)
2. Click "Share" → "Publish"
3. Your app is live!

### Custom Domain
To connect a custom domain:
1. Navigate to Project > Settings > Domains
2. Click "Connect Domain"
3. Follow the DNS configuration steps

*Note: Custom domains require a paid Lovable plan.*

## 🔍 Troubleshooting

### Common Issues

**Environment Errors:**
- Ensure all required environment variables are set
- Check `.env` file formatting (no spaces around `=`)
- Verify Supabase URL and anon key are correct

**Database Issues:**
- Run `npm run db:reset` to reset database
- Check Supabase project is active
- Verify RLS policies are correctly configured

**Build Errors:**
- Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
- Check TypeScript errors: `npm run lint`

### Getting Help
- Check the [Lovable Documentation](https://docs.lovable.dev/)
- Join the [Lovable Discord Community](https://discord.com/channels/1119885301872070706/1280461670979993613)

## 📄 License

This project is built with Lovable and follows their terms of service.

---

*Built with ❤️ using Lovable - where ideas become reality*