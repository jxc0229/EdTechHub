import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Mail, Github, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Project = Database['public']['tables']['projects']['Row'];

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .eq('status', 'approved')
          .single();

        if (supabaseError) {
          throw supabaseError;
        }

        if (!data) {
          throw new Error('Project not found or not approved');
        }

        setProject(data);
      } catch (err) {
        console.error('Error fetching project:', err);
        setError('Failed to load project details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Project Not Found'}
          </h1>
          <Link
            to="/projects"
            className="inline-flex items-center text-orange-600 hover:text-orange-800"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 flex items-center justify-between">
            <Link
              to="/projects"
              className="inline-flex items-center text-sm text-orange-600 hover:text-orange-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Projects
            </Link>
            <Link to="/" className="flex items-center text-xl font-bold text-orange-500">
              <Sparkles className="h-6 w-6 mr-2" />
              SHOW'N TELL
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Image */}
        <div className="rounded-lg overflow-hidden shadow-lg mb-8">
          <img
            src={project.image_url || 'https://via.placeholder.com/800x400'}
            alt={project.name}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Project Info */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{project.name}</h1>
            
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Mail className="w-4 h-4 mr-2" />
                <span>{project.contact_email}</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mb-8">
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub Repository
                </a>
              )}
              {project.demo_url && (
                <a
                  href={project.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              )}
              {project.contact_email && (
                <a
                  href={`mailto:${project.contact_email}`}
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Author
                </a>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-orange max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About the Project</h2>
              <div className="whitespace-pre-wrap text-gray-600">
                {project.content}
              </div>
            </div>

            {/* Tags */}
            {(project.topics || project.forms) && (
              <div className="mt-8 space-y-4">
                {project.topics && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.topics.map((topic) => (
                        <span
                          key={topic}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {project.forms && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Forms</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.forms.map((form) => (
                        <span
                          key={form}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          {form}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProjectDetail;