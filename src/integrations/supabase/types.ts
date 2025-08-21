export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      addresses: {
        Row: {
          city: string
          country: string
          full_name: string
          id: string
          is_default: boolean | null
          line1: string
          line2: string | null
          phone: string | null
          postal_code: string
          region: string
          user_id: string
        }
        Insert: {
          city: string
          country: string
          full_name: string
          id?: string
          is_default?: boolean | null
          line1: string
          line2?: string | null
          phone?: string | null
          postal_code: string
          region: string
          user_id: string
        }
        Update: {
          city?: string
          country?: string
          full_name?: string
          id?: string
          is_default?: boolean | null
          line1?: string
          line2?: string | null
          phone?: string | null
          postal_code?: string
          region?: string
          user_id?: string
        }
        Relationships: []
      }
      cart_items: {
        Row: {
          cart_id: string | null
          id: string
          product_id: string | null
          qty: number
          variant_id: string | null
        }
        Insert: {
          cart_id?: string | null
          id?: string
          product_id?: string | null
          qty?: number
          variant_id?: string | null
        }
        Update: {
          cart_id?: string | null
          id?: string
          product_id?: string | null
          qty?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "carts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cart_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      carts: {
        Row: {
          created_at: string | null
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      content_ideas: {
        Row: {
          archived: boolean | null
          created_at: string | null
          id: string
          notes: string | null
          priority: number | null
          title: string
        }
        Insert: {
          archived?: boolean | null
          created_at?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          title: string
        }
        Update: {
          archived?: boolean | null
          created_at?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          title?: string
        }
        Relationships: []
      }
      content_piece_tags: {
        Row: {
          piece_id: string
          tag_id: string
        }
        Insert: {
          piece_id: string
          tag_id: string
        }
        Update: {
          piece_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_piece_tags_piece_id_fkey"
            columns: ["piece_id"]
            isOneToOne: false
            referencedRelation: "content_pieces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "content_piece_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "content_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      content_pieces: {
        Row: {
          brief: string | null
          created_at: string | null
          cta: string | null
          id: string
          planned_at: string | null
          platform: string
          published_at: string | null
          slug: string
          status: string
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          brief?: string | null
          created_at?: string | null
          cta?: string | null
          id?: string
          planned_at?: string | null
          platform: string
          published_at?: string | null
          slug: string
          status?: string
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          brief?: string | null
          created_at?: string | null
          cta?: string | null
          id?: string
          planned_at?: string | null
          platform?: string
          published_at?: string | null
          slug?: string
          status?: string
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      content_tags: {
        Row: {
          id: string
          name: string
        }
        Insert: {
          id?: string
          name: string
        }
        Update: {
          id?: string
          name?: string
        }
        Relationships: []
      }
      dev_emails: {
        Row: {
          body: string
          created_at: string | null
          id: string
          subject: string
          to_email: string
        }
        Insert: {
          body: string
          created_at?: string | null
          id?: string
          subject: string
          to_email: string
        }
        Update: {
          body?: string
          created_at?: string | null
          id?: string
          subject?: string
          to_email?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          id: string
          order_id: string | null
          product_id: string | null
          qty: number
          unit_cents: number
          variant_id: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          qty: number
          unit_cents: number
          variant_id?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          product_id?: string | null
          qty?: number
          unit_cents?: number
          variant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_variant_id_fkey"
            columns: ["variant_id"]
            isOneToOne: false
            referencedRelation: "variants"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          currency: string | null
          id: string
          payment_method: string | null
          status: string | null
          stripe_session_id: string | null
          temp_cart: Json | null
          total_cents: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          temp_cart?: Json | null
          total_cents: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_method?: string | null
          status?: string | null
          stripe_session_id?: string | null
          temp_cart?: Json | null
          total_cents?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      product_images: {
        Row: {
          alt: string | null
          id: string
          position: number | null
          product_id: string | null
          url: string
        }
        Insert: {
          alt?: string | null
          id?: string
          position?: number | null
          product_id?: string | null
          url: string
        }
        Update: {
          alt?: string | null
          id?: string
          position?: number | null
          product_id?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          category_id: string | null
          compare_at_cents: number | null
          created_at: string | null
          currency: string | null
          description: string | null
          id: string
          name: string
          price_cents: number
          slug: string
        }
        Insert: {
          category_id?: string | null
          compare_at_cents?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name: string
          price_cents: number
          slug: string
        }
        Update: {
          category_id?: string | null
          compare_at_cents?: number | null
          created_at?: string | null
          currency?: string | null
          description?: string | null
          id?: string
          name?: string
          price_cents?: number
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      variants: {
        Row: {
          id: string
          name: string
          price_cents: number | null
          product_id: string | null
          sku: string
          stock: number | null
        }
        Insert: {
          id?: string
          name: string
          price_cents?: number | null
          product_id?: string | null
          sku: string
          stock?: number | null
        }
        Update: {
          id?: string
          name?: string
          price_cents?: number | null
          product_id?: string | null
          sku?: string
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "variants_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist_items: {
        Row: {
          id: string
          product_id: string | null
          wishlist_id: string | null
        }
        Insert: {
          id?: string
          product_id?: string | null
          wishlist_id?: string | null
        }
        Update: {
          id?: string
          product_id?: string | null
          wishlist_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_items_wishlist_id_fkey"
            columns: ["wishlist_id"]
            isOneToOne: false
            referencedRelation: "wishlists"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
