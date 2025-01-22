import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Types for your database
export type Database = {
  public: {
    tables: {
      projects: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          description: string;
          user_id: string;
          // Add other columns as needed
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          description: string;
          user_id: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          description?: string;
          user_id?: string;
        };
      };
      // Add other tables as needed
    };
  };
};