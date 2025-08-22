import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  compare_at_cents: number | null;
  currency: string;
  created_at: string;
  category_id: string | null;
  categories?: {
    id: string;
    name: string;
    slug: string;
  };
  product_images: Array<{
    id: string;
    url: string;
    alt: string | null;
    position: number;
  }>;
  variants?: Array<{
    id: string;
    name: string;
    sku: string;
    stock: number;
    price_cents: number | null;
  }>;
}

export interface ProductsQueryOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  search?: string;
  sortBy?: 'created_at' | 'price_cents' | 'name';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export function useProductsQuery(options: ProductsQueryOptions = {}) {
  return useQuery({
    queryKey: ['products', options],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          product_images (
            id,
            url,
            alt,
            position
          ),
          variants (
            id,
            name,
            sku,
            stock,
            price_cents
          )
        `);

      // Apply filters
      if (options.category) {
        query = query.eq('categories.slug', options.category);
      }

      if (options.minPrice !== undefined) {
        query = query.gte('price_cents', options.minPrice * 100);
      }

      if (options.maxPrice !== undefined) {
        query = query.lte('price_cents', options.maxPrice * 100);
      }

      if (options.search) {
        query = query.or(`name.ilike.%${options.search}%,description.ilike.%${options.search}%`);
      }

      // Apply sorting
      if (options.sortBy) {
        query = query.order(options.sortBy, { 
          ascending: options.sortOrder === 'asc' 
        });
      } else {
        query = query.order('created_at', { ascending: false });
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit);
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
      }

      const { data, error, count } = await query;

      if (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
      }

      // Sort product images by position
      const productsWithSortedImages = data?.map(product => ({
        ...product,
        product_images: product.product_images?.sort((a, b) => a.position - b.position) || []
      })) || [];

      return {
        products: productsWithSortedImages as Product[],
        total: count || 0
      };
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) {
        throw new Error(`Failed to fetch categories: ${error.message}`);
      }

      return data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

export function useProductQuery(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          product_images (
            id,
            url,
            alt,
            position
          ),
          variants (
            id,
            name,
            sku,
            stock,
            price_cents
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
      }

      if (!data) {
        throw new Error('Product not found');
      }

      // Sort product images by position
      const productWithSortedImages = {
        ...data,
        product_images: data.product_images?.sort((a, b) => a.position - b.position) || []
      };

      return productWithSortedImages as Product;
    },
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}