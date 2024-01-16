export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      'highway-position': {
        Row: {
          '2022_aadt': number | null;
          id: number;
          road_type: string | null;
          source: string | null;
          type: string | null;
          XCODE: number | null;
          YCODE: number | null;
          '도/시': string | null;
          도로종류: string | null;
          '시/군': string | null;
          연도: number | null;
          지점번호: string | null;
        };
        Insert: {
          '2022_aadt'?: number | null;
          id?: number;
          road_type?: string | null;
          source?: string | null;
          type?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          '도/시'?: string | null;
          도로종류?: string | null;
          '시/군'?: string | null;
          연도?: number | null;
          지점번호?: string | null;
        };
        Update: {
          '2022_aadt'?: number | null;
          id?: number;
          road_type?: string | null;
          source?: string | null;
          type?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          '도/시'?: string | null;
          도로종류?: string | null;
          '시/군'?: string | null;
          연도?: number | null;
          지점번호?: string | null;
        };
        Relationships: [];
      };
      'incheon-traffic-position': {
        Row: {
          '2022_aadt': number | null;
          source: string | null;
          XCODE: number | null;
          YCODE: number | null;
          지점명: string | null;
          지점번호: string | null;
        };
        Insert: {
          '2022_aadt'?: number | null;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          지점명?: string | null;
          지점번호?: string | null;
        };
        Update: {
          '2022_aadt'?: number | null;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          지점명?: string | null;
          지점번호?: string | null;
        };
        Relationships: [];
      };
      'seoul-traffic-position': {
        Row: {
          '2022_aadt': number | null;
          position: string | null;
          source: string | null;
          XCODE: number | null;
          YCODE: number | null;
          '유입 방향': string | null;
          유출방향: string | null;
          주소: string | null;
        };
        Insert: {
          '2022_aadt'?: number | null;
          position?: string | null;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          '유입 방향'?: string | null;
          유출방향?: string | null;
          주소?: string | null;
        };
        Update: {
          '2022_aadt'?: number | null;
          position?: string | null;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          '유입 방향'?: string | null;
          유출방향?: string | null;
          주소?: string | null;
        };
        Relationships: [];
      };
      'toll-road': {
        Row: {
          '2021_aadt': number | null;
          id: number;
          source: string | null;
          XCODE: number | null;
          YCODE: number | null;
          구분: string | null;
        };
        Insert: {
          '2021_aadt'?: number | null;
          id?: number;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          구분?: string | null;
        };
        Update: {
          '2021_aadt'?: number | null;
          id?: number;
          source?: string | null;
          XCODE?: number | null;
          YCODE?: number | null;
          구분?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database['public']['Tables'] & Database['public']['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database['public']['Tables'] &
        Database['public']['Views'])
    ? (Database['public']['Tables'] &
        Database['public']['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database['public']['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database['public']['Tables']
    ? Database['public']['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database['public']['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof Database['public']['Enums']
    ? Database['public']['Enums'][PublicEnumNameOrOptions]
    : never;
