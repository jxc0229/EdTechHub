import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Database } from '../lib/supabase';

type Project = Database['public']['tables']['projects']['Row'];

interface ProjectShowcaseProps {
  projects: Project[];
}

function ProjectShowcase({ projects }: ProjectShowcaseProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleSideProjectClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleClose = () => {
    setSelectedProject(null);
  };

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-8">
      {/* Left project */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => handleSideProjectClick((currentIndex - 1 + projects.length) % projects.length)}
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
          <div className="h-[35%] p-4 flex flex-col justify-center w-full">
            <h3 className="text-xl font-bold mb-1.5 line-clamp-1">{projects[currentIndex].name}</h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2 max-w-[95%]">{projects[currentIndex].content}</p>
            <Link 
              to={`/project/${projects[currentIndex].id}`}
              className="inline-flex items-center text-sm text-orange-500 hover:text-orange-600 group mt-auto"
            >
              See more
              <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Right project */}
      <motion.div
        whileHover={{ scale: 1.1 }}
        onClick={() => handleSideProjectClick((currentIndex + 1) % projects.length)}
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
                    to={`/project/${selectedProject.id}`}
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
