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
      "Country Data": {
        Row: {
          Country: string | null
          "Current Exports - 2022 (USD)": number | null
          "External Actor Contribution": string | null
          "External Factors - One Bullet Summary": string | null
          "External Market Factors": string | null
          "Global Share 1995 - %": number | null
          "Global Share 2022 - %": number | null
          "Initial Exports - 1995 (USD)": number | null
          Outcome: string | null
          "Primary key": number
          "Private Sector - One Bullet Summary": string | null
          "Private Sector Industry Growth": string | null
          "Private Sector Pioneering Firm": string | null
          "Public Sector - One Bullet Summary": string | null
          "Public Sector Actor": string | null
          "Public Sector Policy": string | null
          "Rank (1995)": number | null
          "Rank (2022)": number | null
          "Ranks Change (absolute)": number | null
          Sector: string | null
          Sources: string | null
          "Successful product": string | null
        }
        Insert: {
          Country?: string | null
          "Current Exports - 2022 (USD)"?: number | null
          "External Actor Contribution"?: string | null
          "External Factors - One Bullet Summary"?: string | null
          "External Market Factors"?: string | null
          "Global Share 1995 - %"?: number | null
          "Global Share 2022 - %"?: number | null
          "Initial Exports - 1995 (USD)"?: number | null
          Outcome?: string | null
          "Primary key"?: number
          "Private Sector - One Bullet Summary"?: string | null
          "Private Sector Industry Growth"?: string | null
          "Private Sector Pioneering Firm"?: string | null
          "Public Sector - One Bullet Summary"?: string | null
          "Public Sector Actor"?: string | null
          "Public Sector Policy"?: string | null
          "Rank (1995)"?: number | null
          "Rank (2022)"?: number | null
          "Ranks Change (absolute)"?: number | null
          Sector?: string | null
          Sources?: string | null
          "Successful product"?: string | null
        }
        Update: {
          Country?: string | null
          "Current Exports - 2022 (USD)"?: number | null
          "External Actor Contribution"?: string | null
          "External Factors - One Bullet Summary"?: string | null
          "External Market Factors"?: string | null
          "Global Share 1995 - %"?: number | null
          "Global Share 2022 - %"?: number | null
          "Initial Exports - 1995 (USD)"?: number | null
          Outcome?: string | null
          "Primary key"?: number
          "Private Sector - One Bullet Summary"?: string | null
          "Private Sector Industry Growth"?: string | null
          "Private Sector Pioneering Firm"?: string | null
          "Public Sector - One Bullet Summary"?: string | null
          "Public Sector Actor"?: string | null
          "Public Sector Policy"?: string | null
          "Rank (1995)"?: number | null
          "Rank (2022)"?: number | null
          "Ranks Change (absolute)"?: number | null
          Sector?: string | null
          Sources?: string | null
          "Successful product"?: string | null
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
