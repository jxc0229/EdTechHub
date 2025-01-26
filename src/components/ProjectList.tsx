import React, { useState, useEffect } from 'react';
import { Search, Send, Sparkles, Layout, User, Calendar } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Project = Database['public']['tables']['projects']['Row'];

function ProjectList() {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<{ category: string; value: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const topics = {
    'Topic': [
      'AI',
      'VR/AR',
      'Gamification',
      'LMS',
      'E-Learning',
      'Learning Difference',
      'Assistive Technology'
    ],
    'Form': [
      'Mobile',
      'Web APP',
      'Physical'
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
        .select('*')
        .eq('status', 'approved');  // Only fetch approved projects

      // Apply filters if any
      if (selectedFilter) {
        const { category, value } = selectedFilter;
        if (category === 'Topic') {
          query = query.contains('topics', [value]);
        } else if (category === 'Form') {
          query = query.contains('forms', [value]);
        }
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
  }, [selectedFilter, searchQuery]);

  const handleSubmitProject = () => {
    navigate('/submit');
  };

  const handleTopicClick = (category: string, value: string) => {
    if (selectedFilter?.category === category && selectedFilter.value === value) {
      setSelectedFilter(null);
    } else {
      setSelectedFilter({ category, value });
    }
  };

  const clearFilters = () => {
    setSelectedFilter(null);
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
          {/* All Projects Category */}
          <div className="mb-8 border-b border-orange-100 pb-4">
            <button
              onClick={clearFilters}
              className={`w-full flex items-center px-4 py-3 text-base font-semibold transition-colors duration-150 rounded-md ${
                !selectedFilter
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <Layout className="w-5 h-5 mr-2" />
              All Projects
            </button>
          </div>

          {/* Other Categories */}
          {Object.entries(topics).map(([category, subtopics]) => (
            <div key={category} className="mb-8">
              <h2 className="px-4 text-base font-bold text-gray-900 uppercase tracking-wider mb-3">
                {category}
              </h2>
              <div className="space-y-1">
                {subtopics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => handleTopicClick(category, topic)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors duration-150 ${
                      selectedFilter?.category === category && selectedFilter.value === topic
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-700 hover:bg-orange-50 hover:text-orange-600'
                    }`}
                  >
                    {topic}
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
            <div className="flex-1 flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">
                {selectedFilter 
                  ? `${selectedFilter.category}: ${selectedFilter.value}`
                  : 'All Projects'
                }
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleSubmitProject}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Project
              </button>
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
        <div className="p-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading projects...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg shadow-sm border border-orange-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => navigate(`/project/${project.id}`)}
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image_url || 'https://via.placeholder.com/400x300'}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">
                    {/* Title and Author */}
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.name}</h3>
                      <div className="flex items-center text-gray-600">
                        <User className="w-4 h-4 mr-2" />
                        <span className="text-sm">{project.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="w-4 h-4 mr-2" />
                        <span className="text-sm">{new Date(project.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.content}
                    </p>

                    {/* Tags */}
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        {project.topics.map((topic) => (
                          <span
                            key={topic}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.forms.map((form) => (
                          <span
                            key={form}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {form}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectList;