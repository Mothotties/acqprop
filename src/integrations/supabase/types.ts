export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      investment_opportunities: {
        Row: {
          created_at: string
          expected_return: number | null
          id: string
          investment_period: number | null
          minimum_investment: number | null
          property_id: string | null
          risk_level: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          expected_return?: number | null
          id?: string
          investment_period?: number | null
          minimum_investment?: number | null
          property_id?: string | null
          risk_level?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          expected_return?: number | null
          id?: string
          investment_period?: number | null
          minimum_investment?: number | null
          property_id?: string | null
          risk_level?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "investment_opportunities_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          investment_preferences: Json | null
          notification_settings: Json | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          investment_preferences?: Json | null
          notification_settings?: Json | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          investment_preferences?: Json | null
          notification_settings?: Json | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      properties: {
        Row: {
          amenities: string[] | null
          bathrooms: number | null
          bedrooms: number | null
          coordinates: unknown | null
          created_at: string
          description: string | null
          id: string
          images: string[] | null
          location: string
          owner_id: string | null
          price: number
          property_type: string
          square_feet: number | null
          status: string | null
          title: string
          updated_at: string
          year_built: number | null
        }
        Insert: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          location: string
          owner_id?: string | null
          price: number
          property_type: string
          square_feet?: number | null
          status?: string | null
          title: string
          updated_at?: string
          year_built?: number | null
        }
        Update: {
          amenities?: string[] | null
          bathrooms?: number | null
          bedrooms?: number | null
          coordinates?: unknown | null
          created_at?: string
          description?: string | null
          id?: string
          images?: string[] | null
          location?: string
          owner_id?: string | null
          price?: number
          property_type?: string
          square_feet?: number | null
          status?: string | null
          title?: string
          updated_at?: string
          year_built?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_analytics: {
        Row: {
          ai_confidence_score: number | null
          cap_rate: number | null
          created_at: string
          id: string
          market_trend: string | null
          market_volatility: number | null
          occupancy_rate: number | null
          predicted_growth: number | null
          property_id: string | null
          risk_score: number | null
          roi: number | null
          updated_at: string
        }
        Insert: {
          ai_confidence_score?: number | null
          cap_rate?: number | null
          created_at?: string
          id?: string
          market_trend?: string | null
          market_volatility?: number | null
          occupancy_rate?: number | null
          predicted_growth?: number | null
          property_id?: string | null
          risk_score?: number | null
          roi?: number | null
          updated_at?: string
        }
        Update: {
          ai_confidence_score?: number | null
          cap_rate?: number | null
          created_at?: string
          id?: string
          market_trend?: string | null
          market_volatility?: number | null
          occupancy_rate?: number | null
          predicted_growth?: number | null
          property_id?: string | null
          risk_score?: number | null
          roi?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_analytics_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      property_documents: {
        Row: {
          created_at: string
          description: string | null
          document_type: string
          file_path: string | null
          id: string
          name: string
          property_id: string | null
          status: string | null
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_type: string
          file_path?: string | null
          id?: string
          name: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          document_type?: string
          file_path?: string | null
          id?: string
          name?: string
          property_id?: string | null
          status?: string | null
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_documents_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      property_market_data: {
        Row: {
          comparable_sales: Json | null
          created_at: string | null
          id: string
          last_updated: string | null
          local_market_trend: string | null
          market_demand_score: number | null
          market_value: number | null
          price_per_sqft: number | null
          property_id: string | null
          updated_at: string | null
        }
        Insert: {
          comparable_sales?: Json | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          local_market_trend?: string | null
          market_demand_score?: number | null
          market_value?: number | null
          price_per_sqft?: number | null
          property_id?: string | null
          updated_at?: string | null
        }
        Update: {
          comparable_sales?: Json | null
          created_at?: string | null
          id?: string
          last_updated?: string | null
          local_market_trend?: string | null
          market_demand_score?: number | null
          market_value?: number | null
          price_per_sqft?: number | null
          property_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "property_market_data_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          status: string
          stripe_subscription_id: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          tier: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          status?: string
          stripe_subscription_id?: string | null
          tier?: Database["public"]["Enums"]["subscription_tier"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"] | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"] | null
          user_id?: string | null
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
      app_role: "admin" | "investor" | "agent" | "basic"
      subscription_tier: "basic" | "pro" | "enterprise"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
