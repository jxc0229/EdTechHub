import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Image as ImageIcon, Plus, X } from 'lucide-react';

type Author = {
  author_name: string;
  author_title: string;
  author_email: string;
  author_institution: string;
};

function ProjectSubmission() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image_url: '',
    topics: [] as string[],
    forms: [] as string[],
    audiences: [] as string[],
    status: 'pending' as const
  });

  const [authors, setAuthors] = useState<Author[]>([
    {
      author_name: '',
      author_title: '',
      author_email: '',
      author_institution: ''
    }
  ]);

  const categories = {
    topics: [
      'Languages',
      'Coding',
      'STEM',
      'Writing',
      'History',
      'Accessibility'
    ],
    forms: [
      'Web App',
      'Mobile App',
      'Physical Device',
      'API Integration'
    ],
    audiences: [
      'K-12 Students',
      'K-12 Educators',
      'College Students',
      'University Professors'
    ]
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthorChange = (index: number, field: keyof Author, value: string) => {
    setAuthors(prev => {
      const newAuthors = [...prev];
      newAuthors[index] = {
        ...newAuthors[index],
        [field]: value
      };
      return newAuthors;
    });
  };

  const addAuthor = () => {
    setAuthors(prev => [
      ...prev,
      {
        author_name: '',
        author_title: '',
        author_email: '',
        author_institution: ''
      }
    ]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleTagToggle = (category: 'topics' | 'forms' | 'audiences', value: string) => {
    setFormData(prev => ({
      ...prev,
      [category]: prev[category].includes(value)
        ? prev[category].filter(item => item !== value)
        : [...prev[category], value]
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setImageError(true);
      setError('Please select a valid image file.');
      return;
    }

    setSelectedFile(file);
    setImageError(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);

      if (!formData.name || !formData.content || authors.some(author => !author.author_name || !author.author_email)) {
        throw new Error('Please fill in all required fields');
      }

      if (formData.topics.length === 0 || formData.forms.length === 0 || formData.audiences.length === 0) {
        throw new Error('Please select at least one topic, form, and audience');
      }

      let finalImageUrl = formData.image_url;
      if (selectedFile) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(`project-images/${Date.now()}-${selectedFile.name}`, selectedFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-images')
          .getPublicUrl(uploadData.path);

        finalImageUrl = publicUrl;
      }

      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .insert([
          {
            ...formData,
            image_url: finalImageUrl
          }
        ])
        .select()
        .single();

      if (projectError) throw projectError;

      const { error: authorsError } = await supabase
        .from('project_authors')
        .insert(
          authors.map(author => ({
            project_id: projectData.id,
            ...author
          }))
        );

      if (authorsError) throw authorsError;

      navigate('/projects');
    } catch (err) {
      console.error('Error submitting project:', err);
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the project');
    } finally {
      setLoading(false);
    }
  };

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

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit Project</h1>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Details */}
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                  Project Description *
                </label>
                <textarea
                  id="content"
                  name="content"
                  rows={4}
                  value={formData.content}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                  required
                />
              </div>
            </div>

            {/* Authors Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Authors *</h2>
                <button
                  type="button"
                  onClick={addAuthor}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Author
                </button>
              </div>

              {authors.map((author, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-sm font-medium text-gray-900">Author {index + 1}</h3>
                    {authors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAuthor(index)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={author.author_name}
                        onChange={(e) => handleAuthorChange(index, 'author_name', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        type="text"
                        value={author.author_title}
                        onChange={(e) => handleAuthorChange(index, 'author_title', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={author.author_email}
                        onChange={(e) => handleAuthorChange(index, 'author_email', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Institution
                      </label>
                      <input
                        type="text"
                        value={author.author_institution}
                        onChange={(e) => handleAuthorChange(index, 'author_institution', e.target.value)}
                        className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm px-3 py-2"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Categories Section */}
            <div className="space-y-6">
              {Object.entries(categories).map(([category, values]) => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">
                    {category.charAt(0).toUpperCase() + category.slice(1)} *
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {values.map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => handleTagToggle(
                          category as 'topics' | 'forms' | 'audiences',
                          value
                        )}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${
                          formData[category as keyof typeof formData].includes(value)
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Image
              </label>
              <div className="mt-1 flex items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  <ImageIcon className="w-5 h-5 mr-2" />
                  Choose Image
                </label>
                {selectedFile && (
                  <span className="ml-4 text-sm text-gray-600">
                    {selectedFile.name}
                  </span>
                )}
              </div>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="mt-2">
                  <div className="bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-orange-600 h-2.5 rounded-full"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProjectSubmission;