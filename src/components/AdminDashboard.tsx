import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/supabase';
import { CheckCircle, XCircle, Clock, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

type Project = Database['public']['tables']['projects']['Row'];

function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

  useEffect(() => {
    fetchProjects();
  }, [filter]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = supabase.from('projects').select('*');
      
      if (filter !== 'all') {
        query = query.eq('status', filter);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;
      setProjects(data || []);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: Project['status']) => {
    try {
      setError(null);
      
      // Perform the update
      const { error: updateError } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', projectId);

      if (updateError) {
        throw new Error(`Failed to update project: ${updateError.message}`);
      }

      // Update local state
      setProjects(prev => 
        prev.map(project => 
          project.id === projectId 
            ? { ...project, status: newStatus }
            : project
        )
      );

      console.log(`Successfully updated project ${projectId} to status: ${newStatus}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update project status';
      console.error('Error updating project status:', err);
      setError(errorMessage);
    }
  };

  const getStatusIcon = (status: Project['status']) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-orange-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Project Approval Dashboard</h1>
          <Link
            to="/projects"
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Projects
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {/* Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium ${
                filter === status
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-orange-100'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Project
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{project.name}</div>
                      <div className="text-sm text-gray-500">{project.content.slice(0, 100)}...</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {project.author}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {getStatusIcon(project.status)}
                      <span className="ml-2 text-sm text-gray-600">
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      {project.status !== 'approved' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'approved')}
                          className="px-3 py-1 bg-green-100 text-green-600 rounded-md hover:bg-green-200"
                        >
                          Approve
                        </button>
                      )}
                      {project.status !== 'rejected' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'rejected')}
                          className="px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200"
                        >
                          Reject
                        </button>
                      )}
                      {project.status !== 'pending' && (
                        <button
                          onClick={() => updateProjectStatus(project.id, 'pending')}
                          className="px-3 py-1 bg-orange-100 text-orange-600 rounded-md hover:bg-orange-200"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
