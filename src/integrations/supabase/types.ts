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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      coach_athletes: {
        Row: {
          athlete_id: string
          coach_id: string
          created_at: string
          id: string
        }
        Insert: {
          athlete_id: string
          coach_id: string
          created_at?: string
          id?: string
        }
        Update: {
          athlete_id?: string
          coach_id?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      coach_invites: {
        Row: {
          accepted_at: string | null
          accepted_by: string | null
          coach_id: string
          created_at: string
          email: string | null
          id: string
          invite_code: string
          status: string
        }
        Insert: {
          accepted_at?: string | null
          accepted_by?: string | null
          coach_id: string
          created_at?: string
          email?: string | null
          id?: string
          invite_code: string
          status?: string
        }
        Update: {
          accepted_at?: string | null
          accepted_by?: string | null
          coach_id?: string
          created_at?: string
          email?: string | null
          id?: string
          invite_code?: string
          status?: string
        }
        Relationships: []
      }
      coach_notes: {
        Row: {
          athlete_id: string
          coach_id: string
          created_at: string
          id: string
          note_type: string
          pinned: boolean
          read: boolean
          text: string
        }
        Insert: {
          athlete_id: string
          coach_id: string
          created_at?: string
          id?: string
          note_type?: string
          pinned?: boolean
          read?: boolean
          text: string
        }
        Update: {
          athlete_id?: string
          coach_id?: string
          created_at?: string
          id?: string
          note_type?: string
          pinned?: boolean
          read?: boolean
          text?: string
        }
        Relationships: []
      }
      daily_checkins: {
        Row: {
          checked: boolean
          checkin_date: string
          created_at: string
          id: string
          item_key: string
          user_id: string
        }
        Insert: {
          checked?: boolean
          checkin_date?: string
          created_at?: string
          id?: string
          item_key: string
          user_id: string
        }
        Update: {
          checked?: boolean
          checkin_date?: string
          created_at?: string
          id?: string
          item_key?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_logs: {
        Row: {
          created_at: string
          hrv_ms: number | null
          id: string
          log_date: string
          muscle_soreness: number | null
          rested_feeling: number | null
          sleep_hours: number | null
          stress_level: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          hrv_ms?: number | null
          id?: string
          log_date?: string
          muscle_soreness?: number | null
          rested_feeling?: number | null
          sleep_hours?: number | null
          stress_level?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          hrv_ms?: number | null
          id?: string
          log_date?: string
          muscle_soreness?: number | null
          rested_feeling?: number | null
          sleep_hours?: number | null
          stress_level?: number | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          created_at: string
          full_name: string | null
          height_cm: number | null
          id: string
          onboarding_completed: boolean
          sport: string | null
          training_goals: string | null
          training_level: string | null
          updated_at: string
          weight_kg: number | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          height_cm?: number | null
          id: string
          onboarding_completed?: boolean
          sport?: string | null
          training_goals?: string | null
          training_level?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          height_cm?: number | null
          id?: string
          onboarding_completed?: boolean
          sport?: string | null
          training_goals?: string | null
          training_level?: string | null
          updated_at?: string
          weight_kg?: number | null
        }
        Relationships: []
      }
      recovery_metrics: {
        Row: {
          body_weight_kg: number | null
          created_at: string
          hrv_ms: number | null
          id: string
          metric_date: string
          resting_hr: number | null
          sleep_hours: number | null
          user_id: string
        }
        Insert: {
          body_weight_kg?: number | null
          created_at?: string
          hrv_ms?: number | null
          id?: string
          metric_date?: string
          resting_hr?: number | null
          sleep_hours?: number | null
          user_id: string
        }
        Update: {
          body_weight_kg?: number | null
          created_at?: string
          hrv_ms?: number | null
          id?: string
          metric_date?: string
          resting_hr?: number | null
          sleep_hours?: number | null
          user_id?: string
        }
        Relationships: []
      }
      recovery_scores: {
        Row: {
          created_at: string
          hrv_norm: number | null
          id: string
          load_norm: number | null
          score: number
          score_date: string
          sleep_norm: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          hrv_norm?: number | null
          id?: string
          load_norm?: number | null
          score: number
          score_date?: string
          sleep_norm?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          hrv_norm?: number | null
          id?: string
          load_norm?: number | null
          score?: number
          score_date?: string
          sleep_norm?: number | null
          user_id?: string
        }
        Relationships: []
      }
      training_plans: {
        Row: {
          athlete_id: string
          coach_id: string
          completed: boolean
          created_at: string
          day_of_week: string
          duration: string
          follow_up: string | null
          goal: string | null
          goal_date: string
          id: string
          intensity: string
          updated_at: string
          workout_type: string
        }
        Insert: {
          athlete_id: string
          coach_id: string
          completed?: boolean
          created_at?: string
          day_of_week: string
          duration?: string
          follow_up?: string | null
          goal?: string | null
          goal_date?: string
          id?: string
          intensity?: string
          updated_at?: string
          workout_type: string
        }
        Update: {
          athlete_id?: string
          coach_id?: string
          completed?: boolean
          created_at?: string
          day_of_week?: string
          duration?: string
          follow_up?: string | null
          goal?: string | null
          goal_date?: string
          id?: string
          intensity?: string
          updated_at?: string
          workout_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workouts: {
        Row: {
          created_at: string
          duration_minutes: number
          id: string
          intensity: number
          training_load: number | null
          user_id: string
          workout_type: string
        }
        Insert: {
          created_at?: string
          duration_minutes: number
          id?: string
          intensity: number
          training_load?: number | null
          user_id: string
          workout_type: string
        }
        Update: {
          created_at?: string
          duration_minutes?: number
          id?: string
          intensity?: number
          training_load?: number | null
          user_id?: string
          workout_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "athlete" | "coach"
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
    Enums: {
      app_role: ["athlete", "coach"],
    },
  },
} as const
