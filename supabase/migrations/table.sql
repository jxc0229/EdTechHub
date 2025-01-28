-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing tables if they exist
DROP TABLE IF EXISTS project_authors CASCADE;
DROP TABLE IF EXISTS projects CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TYPE IF EXISTS project_status CASCADE;

-- Create enum for project status
CREATE TYPE project_status AS ENUM ('pending', 'approved', 'rejected');

-- Create the projects table
CREATE TABLE projects (
    -- Primary key and timestamps
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Required fields from ProjectSubmission
    name VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    
    -- Arrays for topics and forms with validation
    topics TEXT[] NOT NULL DEFAULT '{}',
    forms TEXT[] NOT NULL DEFAULT '{}',
    audiences TEXT[] NOT NULL DEFAULT '{}',
    
    -- Status management
    status project_status NOT NULL DEFAULT 'pending',
    
    -- User reference (for authentication)
    user_id UUID REFERENCES auth.users(id),
    
    -- Validate topics array contains only allowed values
    CONSTRAINT valid_topics CHECK (
        topics <@ ARRAY[
            'Languages',
            'Coding',
            'STEM',
            'Writing',
            'History',
            'Accessibility'
        ]::TEXT[]
    ),
    
    -- Validate forms array contains only allowed values
    CONSTRAINT valid_forms CHECK (
        forms <@ ARRAY[
            'Web App',
            'Mobile App',
            'Physical Device',
            'API Integration'
        ]::TEXT[]
    ),
    
    -- Validate audiences array contains only allowed values
    CONSTRAINT valid_audiences CHECK (
        audiences <@ ARRAY[
            'K-12 Students',
            'K-12 Educators',
            'College Students',
            'University Professors'
        ]::TEXT[]
    )
);

-- Create project_authors table for many-to-many relationship
CREATE TABLE project_authors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_title VARCHAR(255),
    author_email VARCHAR(255),
    author_institution VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(project_id, author_email)
);

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for updated_at
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_audiences ON projects USING GIN (audiences);
CREATE INDEX idx_project_authors_project_id ON project_authors(project_id);
CREATE INDEX idx_project_authors_email ON project_authors(author_email);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_authors ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects
CREATE POLICY "View approved projects"
    ON projects FOR SELECT
    USING (status = 'approved');

CREATE POLICY "View own projects"
    ON projects FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Create projects"
    ON projects FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Update own projects"
    ON projects FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admin full access"
    ON projects
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid()
        )
    );

-- RLS Policies for project_authors
CREATE POLICY "View project authors"
    ON project_authors FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_authors.project_id
            AND (projects.status = 'approved' OR projects.user_id = auth.uid())
        )
    );

CREATE POLICY "Create project authors"
    ON project_authors FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_authors.project_id
            AND (projects.user_id = auth.uid())
        )
    );

CREATE POLICY "Update project authors"
    ON project_authors FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM projects
            WHERE projects.id = project_authors.project_id
            AND projects.user_id = auth.uid()
        )
    );

CREATE POLICY "Admin full access to authors"
    ON project_authors
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM admin_users
            WHERE user_id = auth.uid()
        )
    );

-- Set up storage for project images (only if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM storage.buckets WHERE id = 'project-images'
    ) THEN
        INSERT INTO storage.buckets (id, name, public) 
        VALUES ('project-images', 'project-images', true);
    END IF;
END
$$;

-- Storage policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Public Access'
    ) THEN
        CREATE POLICY "Public Access"
            ON storage.objects FOR SELECT
            USING (bucket_id = 'project-images');
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Authenticated uploads'
    ) THEN
        CREATE POLICY "Authenticated uploads"
            ON storage.objects FOR INSERT
            WITH CHECK (
                bucket_id = 'project-images' 
                AND auth.role() = 'authenticated'
            );
    END IF;
END
$$;
