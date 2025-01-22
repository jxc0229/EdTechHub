/*
  # Create projects table with moderation support

  1. New Tables
    - `projects`
      - `id` (uuid, primary key)
      - `title` (text, project name)
      - `author_names` (text, list of authors)
      - `author_emails` (text, list of emails)
      - `github_url` (text, optional)
      - `demo_url` (text, optional)
      - `short_description` (text)
      - `long_description` (text)
      - `specific_help` (text)
      - `image_url` (text)
      - `topics` (text[], array of topic tags)
      - `forms` (text[], array of form tags)
      - `created_at` (timestamptz)
      - `moderation_status` (text, for moderation workflow)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `projects` table
    - Add policies for:
      - Anyone can read approved projects
      - Authenticated users can create projects
      - Users can update their own projects
*/

-- Create an enum for moderation status
DO $$ BEGIN
  CREATE TYPE moderation_status AS ENUM ('pending', 'approved', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

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
  moderation_status moderation_status NOT NULL DEFAULT 'pending',
  user_id uuid REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy for reading approved projects
CREATE POLICY "Anyone can read approved projects"
  ON projects
  FOR SELECT
  USING (moderation_status = 'approved');

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