import React, { useState, useEffect } from 'react';
import { Search, Send, Sparkles, Layout, User, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Author = {
  id: string;
  author_name: string;
  author_title: string;
  author_email: string;
  author_institution: string;
  created_at: string;
};

type Project = {
  id: string;
  name: string;
  summary: string;
  content: string;
  image_url: string;
  demo_url?: string;
  topics: string[];
  forms: string[];
  audiences: string[];
  status: 'pending' | 'approved' | 'rejected';
  authors?: Author[];
};

function ProjectList() {
  const navigate = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState<{
    Audience: string[];
    Topics: string[];
    Form: string[];
  }>({
    Audience: [],
    Topics: [],
    Form: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topics = {
    'Audience': [
      'K-12 Students',
      'K-12 Educators',
      'College Students',
      'University Professors'
    ],
    'Topics': [
      'Languages',
      'Coding',
      'STEM',
      'Writing',
      'History',
      'Accessibility'
    ],
    'Form': [
      'Web App',
      'Mobile App',
      'Physical Device',
      'API Integration'
    ]
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('projects')
        .select(`
          *,
          authors:project_authors(
            id,
            author_name,
            author_title,
            author_email,
            author_institution,
            created_at
          )
        `)
        .eq('status', 'approved');  // Only fetch approved projects

      // Apply filters if any are selected
      if (selectedFilters.Topics.length > 0) {
        query = query.contains('topics', selectedFilters.Topics);
      }
      if (selectedFilters.Form.length > 0) {
        query = query.contains('forms', selectedFilters.Form);
      }
      if (selectedFilters.Audience.length > 0) {
        query = query.contains('audiences', selectedFilters.Audience);
      }

      // Apply search if any
      if (searchQuery) {
        query = query.or(`name.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Refetch when filters or search change
  useEffect(() => {
    fetchProjects();
  }, [selectedFilters, searchQuery]);

  const handleSubmitProject = () => {
    navigate('/submit');
  };

  const handleTagClick = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => {
      const currentTags = prev[category];
      const newTags = currentTags.includes(value)
        ? currentTags.filter(tag => tag !== value)
        : [...currentTags, value];
      
      return {
        ...prev,
        [category]: newTags
      };
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      Audience: [],
      Topics: [],
      Form: []
    });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-orange-100 overflow-y-auto">
        <div className="p-4">
          <Link to="/" className="flex items-center text-xl font-bold text-orange-500">
            <Sparkles className="h-6 w-6 mr-2" />
            SHOW'N TELL
          </Link>
        </div>

        <nav className="mt-4">
          {/* Clear Filters Button */}
          <div className="mb-8 border-b border-orange-100 pb-4">
            <button
              onClick={clearFilters}
              className={`w-full flex items-center px-4 py-3 text-base font-semibold transition-colors duration-150 rounded-md ${
                Object.values(selectedFilters).every(arr => arr.length === 0)
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <Layout className="w-5 h-5 mr-2" />
              Clear All Filters
            </button>
          </div>

          {/* Filter Categories */}
          {Object.entries(topics).map(([category, values]) => (
            <div key={category} className="mb-8">
              <h2 className="px-4 text-base font-bold text-gray-900 uppercase tracking-wider mb-3">
                {category}
              </h2>
              <div className="space-y-1">
                {values.map((value) => (
                  <button
                    key={value}
                    onClick={() => handleTagClick(category as keyof typeof selectedFilters, value)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      selectedFilters[category as keyof typeof selectedFilters].includes(value)
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-orange-100">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                Projects
                {Object.entries(selectedFilters).map(([category, values]) => (
                  values.length > 0 && (
                    <div key={category} className="mt-2 text-sm font-normal">
                      <span className="text-gray-600">{category}: </span>
                      {values.join(', ')}
                    </div>
                  )
                ))}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Project
              </Link>
            </div>
          </div>
          <div className="px-6 py-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Project Grid */}
        <main className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/${project.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                >
                  {project.image_url && (
                    <div className="aspect-w-16 aspect-h-9">
                      <img
                        src={project.image_url}
                        alt={project.name}
                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors duration-200">
                      {project.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {project.summary}
                    </p>

                    {/* Authors */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500">
                        By: {project.authors?.map(author => author.author_name).join(', ')}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
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
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default ProjectList;