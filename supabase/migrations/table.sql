-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for project status if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_status') THEN
        CREATE TYPE project_status AS ENUM ('pending', 'approved', 'rejected');
    END IF;
END $$;

-- Drop existing tables and recreate them
DROP TABLE IF EXISTS project_authors CASCADE;
DROP TABLE IF EXISTS projects CASCADE;

-- Create the projects table
CREATE TABLE projects (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Project details
    name VARCHAR(255) NOT NULL,
    summary VARCHAR(500) NOT NULL,  -- One sentence description
    content TEXT NOT NULL,          -- Detailed description
    image_url TEXT,
    demo_url TEXT,                  -- Optional demo link
    
    -- Categories (stored as arrays)
    topics TEXT[] NOT NULL DEFAULT '{}',
    forms TEXT[] NOT NULL DEFAULT '{}',
    audiences TEXT[] NOT NULL DEFAULT '{}',
    
    -- Status and user reference
    status project_status NOT NULL DEFAULT 'pending',
    user_id UUID REFERENCES auth.users(id),
    
    -- Validation constraints for categories
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
    CONSTRAINT valid_forms CHECK (
        forms <@ ARRAY[
            'Web App',
            'Mobile App',
            'Physical Device',
            'API Integration'
        ]::TEXT[]
    ),
    CONSTRAINT valid_audiences CHECK (
        audiences <@ ARRAY[
            'K-12 Students',
            'K-12 Educators',
            'College Students',
            'University Professors'
        ]::TEXT[]
    )
);

-- Create project_authors table
CREATE TABLE project_authors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    author_name VARCHAR(255) NOT NULL,
    author_title VARCHAR(255),
    author_email VARCHAR(255) NOT NULL,
    author_institution VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(project_id, author_email)
);

-- Drop existing function if it exists
DROP FUNCTION IF EXISTS update_updated_at_column CASCADE;

-- Create function to update updated_at timestamp
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_project_authors_updated_at
    BEFORE UPDATE ON project_authors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Drop existing indexes
DROP INDEX IF EXISTS idx_projects_status;
DROP INDEX IF EXISTS idx_projects_user_id;
DROP INDEX IF EXISTS idx_projects_created_at;
DROP INDEX IF EXISTS idx_projects_topics;
DROP INDEX IF EXISTS idx_projects_forms;
DROP INDEX IF EXISTS idx_projects_audiences;
DROP INDEX IF EXISTS idx_project_authors_project_id;
DROP INDEX IF EXISTS idx_project_authors_email;

-- Create indexes for better query performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_created_at ON projects(created_at);
CREATE INDEX idx_projects_topics ON projects USING GIN (topics);
CREATE INDEX idx_projects_forms ON projects USING GIN (forms);
CREATE INDEX idx_projects_audiences ON projects USING GIN (audiences);
CREATE INDEX idx_project_authors_project_id ON project_authors(project_id);
CREATE INDEX idx_project_authors_email ON project_authors(author_email);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_authors ENABLE ROW LEVEL SECURITY;

-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON projects;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON projects;
DROP POLICY IF EXISTS "Enable update for project owners" ON projects;
DROP POLICY IF EXISTS "Enable delete for project owners" ON projects;
DROP POLICY IF EXISTS "Enable read access for all users" ON project_authors;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON project_authors;
DROP POLICY IF EXISTS "Enable update for project owners" ON project_authors;

-- Create policies for projects table
CREATE POLICY "Enable read access for all users" ON projects
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON projects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for project owners" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Enable delete for project owners" ON projects
    FOR DELETE USING (auth.uid() = user_id);

-- Create policies for project_authors table
CREATE POLICY "Enable read access for all users" ON project_authors
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON project_authors
    FOR INSERT WITH CHECK (EXISTS (
        SELECT 1 FROM projects
        WHERE id = project_id AND auth.uid() = user_id
    ));

CREATE POLICY "Enable update for project owners" ON project_authors
    FOR UPDATE USING (EXISTS (
        SELECT 1 FROM projects
        WHERE id = project_id AND auth.uid() = user_id
    ));
