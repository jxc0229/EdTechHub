import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Send, User, Pause, Play } from 'lucide-react';
import ProjectShowcase from './ProjectShowcase';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';

type Project = Database['public']['tables']['projects']['Row'];

function LandingPage() {
  const [showcaseProjects, setShowcaseProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const fetchShowcaseProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('status', 'approved')  // Only fetch approved projects
          .limit(3);

        if (error) {
          throw error;
        }

        if (data) {
          setShowcaseProjects(data);
        }
      } catch (err) {
        console.error('Error fetching showcase projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseProjects();
  }, []);

  return (
    <div className="h-screen relative overflow-hidden flex flex-col">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-orange-500/30 via-yellow-500/30 to-red-500/30 animate-gradient"
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradient 15s ease infinite',
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">SHOW'N TELL</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <Link
                to="/projects"
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Browse Projects
              </Link>
              <Link
                to="/submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <Send className="w-4 h-4 mr-2" />
                Submit Project
              </Link>
              <Link
                to="/admin/login"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                <User className="w-4 h-4 mr-2" />
                Admin Portal
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            SHOW'N TELL
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            A platform for educators to showcase their innovative teaching projects
          </p>
        </div>

        {/* Project Showcase */}
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm transition-colors hover:bg-white gap-2"
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">Play</span>
                </>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : showcaseProjects.length > 0 ? (
            <ProjectShowcase projects={showcaseProjects} isPlaying={isPlaying} />
          ) : (
            <div className="text-center text-white">
              <p>No projects available to showcase</p>
            </div>
          )}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8">
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
          >
            See all projects
          </Link>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;