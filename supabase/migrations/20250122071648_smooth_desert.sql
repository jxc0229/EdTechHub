/*
  # Create projects table and setup security

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author_names` (text)
      - `author_emails` (text)
      - `github_url` (text, optional)
      - `demo_url` (text, optional)
      - `short_description` (text)
      - `long_description` (text, optional)
      - `specific_help` (text, optional)
      - `image_url` (text)
      - `topics` (text array)
      - `forms` (text array)
      - `created_at` (timestamp)
      - `is_approved` (boolean)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on projects table
    - Policies for:
      - Public reading of approved projects
      - Authenticated users creating projects
      - Users updating their own projects
*/

-- Create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author_names text NOT NULL,
  author_emails text NOT NULL,
  github_url text,
  demo_url text,
  short_description text NOT NULL,
  long_description text,
  specific_help text,
  image_url text NOT NULL,
  topics text[] NOT NULL DEFAULT '{}',
  forms text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  is_approved boolean NOT NULL DEFAULT false,
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for reading approved projects
CREATE POLICY "Anyone can read approved projects"
  ON projects
  FOR SELECT
  USING (is_approved = true);

-- Policy for creating projects
CREATE POLICY "Authenticated users can create projects"
  ON projects
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for updating own projects
CREATE POLICY "Users can update own projects"
  ON projects
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);