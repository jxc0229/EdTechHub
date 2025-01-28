import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

type Author = {
  author_name: string;
  author_title: string;
  author_email: string;
  author_institution: string;
};

type Project = {
  id: string;
  name: string;
  content: string;
  image_url: string;
  topics: string[];
  forms: string[];
  audiences: string[];
  status: 'pending' | 'approved' | 'rejected';
  authors?: Author[];
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

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-red-600">{error || 'Project not found'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {project.image_url && (
            <div className="w-full h-64 md:h-96">
              <img
                src={project.image_url}
                alt={project.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {project.name}
            </h1>

            {/* Project Description */}
            <div className="mb-8">
              <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-wrap">
                {project.content}
              </p>
            </div>

            {/* Project Categories */}
            <div className="mb-8 space-y-4">
              {/* Topics */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Topics</h3>
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

              {/* Forms */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Forms</h3>
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

              {/* Audiences */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">Target Audiences</h3>
                <div className="flex flex-wrap gap-2">
                  {project.audiences.map((audience) => (
                    <span
                      key={audience}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Authors */}
            {project.authors && project.authors.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Authors</h2>
                <div className="grid grid-cols-1 gap-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectDetail;