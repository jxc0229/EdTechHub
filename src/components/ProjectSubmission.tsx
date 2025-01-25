import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Image as ImageIcon } from 'lucide-react';

function ProjectSubmission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image_url: '',
    author: '',
    topics: [] as string[],
    forms: [] as string[]
  });

  const topics = [
    'AI',
    'VR/AR',
    'Gamification',
    'LMS',
    'E-Learning',
    'Learning Difference',
    'Assistive Technology'
  ];

  const forms = [
    'Mobile',
    'Web APP',
    'Physical'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'image_url') {
      // Reset image error when URL changes
      setImageError(false);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateImageUrl = async (url: string): Promise<boolean> => {
    if (!url) return true; // Empty URL is valid
    
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const contentType = response.headers.get('content-type');
      return contentType?.startsWith('image/') || false;
    } catch (err) {
      console.error('Error validating image URL:', err);
      return false;
    }
  };

  const handleTopicToggle = (topic: string) => {
    setFormData(prev => ({
      ...prev,
      topics: prev.topics.includes(topic)
        ? prev.topics.filter(t => t !== topic)
        : [...prev.topics, topic]
    }));
  };

  const handleFormToggle = (form: string) => {
    setFormData(prev => ({
      ...prev,
      forms: prev.forms.includes(form)
        ? prev.forms.filter(f => f !== form)
        : [...prev.forms, form]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setImageError(false);

    try {
      // Validate image URL if provided
      if (formData.image_url) {
        const isValidImage = await validateImageUrl(formData.image_url);
        if (!isValidImage) {
          setImageError(true);
          throw new Error('Invalid image URL. Please provide a direct link to an image file.');
        }
      }

      // If no image URL provided, use a default placeholder
      const finalFormData = {
        ...formData,
        image_url: formData.image_url || 'https://via.placeholder.com/800x400?text=No+Image+Provided'
      };

      const { error: supabaseError } = await supabase
        .from('projects')
        .insert([finalFormData]);

      if (supabaseError) throw supabaseError;

      navigate('/projects');
    } catch (err) {
      console.error('Error submitting project:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button
        onClick={() => navigate('/projects')}
        className="flex items-center text-gray-600 hover:text-gray-800 mb-8"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back to Projects
      </button>

      <h1 className="text-3xl font-bold mb-8">Submit Your Project</h1>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Project Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Project Description */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Project Description *
          </label>
          <textarea
            id="content"
            name="content"
            required
            value={formData.content}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image_url" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <div className="space-y-2">
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                imageError ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {imageError && (
              <p className="text-red-500 text-sm">
                Invalid image URL. Please provide a direct link to an image file.
              </p>
            )}
            
            {/* Image Preview */}
            {formData.image_url && !imageError && (
              <div className="mt-2 relative">
                <img
                  src={formData.image_url}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
            
            {!formData.image_url && (
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <ImageIcon className="w-12 h-12 mx-auto text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  No image URL provided. A default placeholder will be used.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Author Name *
          </label>
          <input
            type="text"
            id="author"
            name="author"
            required
            value={formData.author}
            onChange={handleInputChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Topics */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics (select all that apply) *
          </label>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <button
                key={topic}
                type="button"
                onClick={() => handleTopicToggle(topic)}
                className={`px-4 py-2 rounded-full ${
                  formData.topics.includes(topic)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* Forms */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forms (select all that apply) *
          </label>
          <div className="flex flex-wrap gap-2">
            {forms.map(form => (
              <button
                key={form}
                type="button"
                onClick={() => handleFormToggle(form)}
                className={`px-4 py-2 rounded-full ${
                  formData.forms.includes(form)
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-colors`}
              >
                {form}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Project'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ProjectSubmission;