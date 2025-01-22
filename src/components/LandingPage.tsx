import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Sparkles, BookOpen, Send, ChevronRight, Github, Building2 } from 'lucide-react';

function LandingPage() {
  const sponsors = [
    {
      name: 'TechEd Solutions',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&crop=center&q=80',
      type: 'Platinum'
    },
    {
      name: 'Learning Innovations',
      logo: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=200&h=100&fit=crop&crop=center&q=80',
      type: 'Gold'
    },
    {
      name: 'EduTech Global',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop&crop=center&q=80',
      type: 'Silver'
    },
    {
      name: 'Future Schools',
      logo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop&crop=center&q=80',
      type: 'Silver'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm fixed w-full z-10 border-b border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Sparkles className="h-8 w-8 text-orange-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">EdTech Hub</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/projects" className="text-gray-600 hover:text-gray-900">Explore</Link>
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#community" className="text-gray-600 hover:text-gray-900">Community</a>
              <Link 
                to="/projects"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-8">
              Where Educators
              <span className="text-orange-500"> Innovate </span>
              Together
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 mb-12">
              Join a community of passionate educators sharing and discovering innovative teaching tools, resources, and methodologies.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/projects"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600"
              >
                Browse Projects
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="https://github.com/your-repo"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-orange-100 text-orange-500 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Collaborative Community</h3>
              <p className="text-gray-600">Connect with educators worldwide to share ideas and best practices.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-orange-100 text-orange-500 mb-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
              <p className="text-gray-600">Access a growing collection of teaching resources and tools.</p>
            </div>
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-orange-100 text-orange-500 mb-4">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Your Work</h3>
              <p className="text-gray-600">Contribute your projects and get feedback from the community.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div id="community" className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Growing Community</h2>
            <p className="text-xl text-gray-600">Be part of a network of innovative educators making a difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '1,000+', label: 'Active Members' },
              { number: '500+', label: 'Projects Shared' },
              { number: '50+', label: 'Countries' },
              { number: '10k+', label: 'Resources Downloaded' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sponsors Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-md bg-orange-100 text-orange-500 mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Sponsors</h2>
            <p className="text-xl text-gray-600">Trusted by leading organizations in education</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsors.map((sponsor) => (
              <div key={sponsor.name} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-24 object-contain mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-1">{sponsor.name}</h3>
                <span className="text-sm text-orange-500">{sponsor.type} Sponsor</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Sparkles className="h-6 w-6 text-orange-500" />
              <span className="ml-2 text-lg font-semibold text-gray-900">EdTech Hub</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500">
            © 2024 EdTech Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;