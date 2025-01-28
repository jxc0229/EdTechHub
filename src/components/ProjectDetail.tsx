import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';
import { ExternalLink } from 'lucide-react';

type Author = {
  author_name: string;
  author_title: string;
  author_email: string;
  author_institution: string;
};

type Project = {
  id: string;
  name: string;
  summary: string;
  content: string;
  image_url: string;
  topics: string[];
  forms: string[];
  audiences: string[];
  status: 'pending' | 'approved' | 'rejected';
  authors?: Author[];
  demo_url?: string;
};

function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    if (!id) return;

    try {
      setLoading(true);
      setError(null);

      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*, project_authors(*)')
        .eq('id', id)
        .single();

      if (projectError) throw projectError;
      if (!projectData) throw new Error('Project not found');

      setProject({
        ...projectData,
        authors: projectData.project_authors
      });
    } catch (err) {
      console.error('Error fetching project:', err);
      setError(err instanceof Error ? err.message : 'Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Projects
        </button>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : project ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {project.image_url && (
              <div className="w-full h-64 md:h-96 relative">
                <img
                  src={project.image_url}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="p-8">
              {/* Project Name */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {project.name}
              </h1>

              {/* One-line Summary */}
              <p className="text-xl text-gray-600 mb-6">
                {project.summary}
              </p>

              {/* Authors */}
              {project.authors && project.authors.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-medium text-gray-700 mb-4">Created by</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.authors.map((author, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row sm:items-center justify-between bg-gray-50 rounded-lg p-4"
                      >
                        <div>
                          <div className="font-medium text-gray-900">
                            {author.author_name}
                            {author.author_title && (
                              <span className="text-gray-600 ml-2">
                                · {author.author_title}
                              </span>
                            )}
                          </div>
                          {author.author_institution && (
                            <div className="text-gray-500 text-sm">
                              {author.author_institution}
                            </div>
                          )}
                        </div>
                        <a
                          href={`mailto:${author.author_email}`}
                          className="text-orange-600 hover:text-orange-700 text-sm mt-2 sm:mt-0"
                        >
                          {author.author_email}
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Detailed Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About the Project</h2>
                <div className="prose prose-orange max-w-none">
                  {project.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Demo Link */}
              {project.demo_url && (
                <div className="mb-8">
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Demo
                  </a>
                </div>
              )}

              {/* Project Categories */}
              <div className="space-y-4">
                {/* Topics */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">Topics</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <span
                        key={topic}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Forms */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">Forms</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.forms.map((form) => (
                      <span
                        key={form}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {form}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Audiences */}
                <div>
                  <h2 className="text-sm font-medium text-gray-500 mb-2">Target Audiences</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.audiences.map((audience) => (
                      <span
                        key={audience}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                      >
                        {audience}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ProjectDetail;