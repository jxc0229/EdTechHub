import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type ProjectStatus = 'pending' | 'approved' | 'rejected';

// Types for your database
export type Database = {
  public: {
    tables: {
      projects: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          content: string;
          image_url: string;
          author: string;
          topics: string[];
          forms: string[];
          status: ProjectStatus;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          content: string;
          image_url?: string;
          author: string;
          topics: string[];
          forms: string[];
          status?: ProjectStatus;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          content?: string;
          image_url?: string;
          author?: string;
          topics?: string[];
          forms?: string[];
          status?: ProjectStatus;
        };
      };
    };
  };
};