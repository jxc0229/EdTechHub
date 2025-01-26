import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Database } from '../lib/supabase';

type Project = Database['public']['tables']['projects']['Row'];

interface ProjectShowcaseProps {
  projects: Project[];
  isPlaying: boolean;
}

function ProjectShowcase({ projects, isPlaying }: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const nextProject = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const previousProject = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Auto-rotation effect
  useEffect(() => {
    if (!isPlaying || isHovered || selectedProject) return;

    const interval = setInterval(nextProject, 5000); // Rotate every 5 seconds
    return () => clearInterval(interval);
  }, [isPlaying, isHovered, selectedProject, nextProject]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div 
      className="flex items-center justify-center gap-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Navigation buttons */}
      <button
        onClick={previousProject}
        className="absolute left-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <button
        onClick={nextProject}
        className="absolute right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow-lg transition-colors"
        aria-label="Next project"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Left project */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={previousProject}
        className="group relative w-[160px] h-[120px] bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden"
      >
        <img
          src={projects[(currentIndex - 1 + projects.length) % projects.length].image_url || 'https://via.placeholder.com/400x300'}
          alt={projects[(currentIndex - 1 + projects.length) % projects.length].name}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
        />
      </motion.div>

      {/* Center project */}
      <motion.div
        layoutId="main-project"
        className="relative w-[600px] h-[400px] bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <div className="h-full">
          <img
            src={projects[currentIndex].image_url || 'https://via.placeholder.com/400x300'}
            alt={projects[currentIndex].name}
            className="w-full h-[65%] object-cover cursor-pointer"
            onClick={() => handleProjectClick(projects[currentIndex])}
          />
          <div className="h-[35%] p-4 flex flex-col justify-between w-full">
            <div>
              <h3 className="text-xl font-bold mb-1.5 line-clamp-1">{projects[currentIndex].name}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2 max-w-[95%]">{projects[currentIndex].content}</p>
            </div>
            
            <Link 
              to={`/projects/${projects[currentIndex].id}`}
              className="inline-flex items-center text-sm text-orange-500 hover:text-orange-600 group self-start"
            >
              See more
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-orange-500' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right project */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={nextProject}
        className="group relative w-[160px] h-[120px] bg-white rounded-lg shadow-lg cursor-pointer overflow-hidden"
      >
        <img
          src={projects[(currentIndex + 1) % projects.length].image_url || 'https://via.placeholder.com/400x300'}
          alt={projects[(currentIndex + 1) % projects.length].name}
          className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
        />
      </motion.div>

      {/* Zoomed view */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={handleClose}
          >
            <div className="bg-white rounded-lg w-[80vw] h-[80vh] overflow-hidden" onClick={e => e.stopPropagation()}>
              <img
                src={selectedProject.image_url || 'https://via.placeholder.com/400x300'}
                alt={selectedProject.name}
                className="w-full h-2/3 object-cover"
              />
              <div className="p-6 flex flex-col w-full">
                <h2 className="text-2xl font-bold mb-3">{selectedProject.name}</h2>
                <p className="text-gray-600 text-base mb-6 max-w-2xl line-clamp-4">{selectedProject.content}</p>
                <div className="flex justify-center">
                  <Link 
                    to={`/projects/${selectedProject.id}`}
                    className="inline-flex items-center px-6 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 group"
                  >
                    View Full Project
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectShowcase;
