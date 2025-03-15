'use client';

import { useEffect, useState } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import { FeaturedProject } from '@/types/content';
import { getFeaturedProjects, updateFeaturedProject, createFeaturedProject, deleteFeaturedProject } from '@/lib/content';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<FeaturedProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<FeaturedProject | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getFeaturedProjects();
      setProjects(data);
    } catch (error) {
      console.error('Error loading featured projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (data: Record<string, any>) => {
    if (!editingProject?.id) return;
    
    try {
      // Process tags if they're provided as a comma-separated string
      let tags = data.tags;
      if (typeof data.tags === 'string') {
        tags = data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
      }

      await updateFeaturedProject({ 
        ...data, 
        id: editingProject.id,
        tags,
      });
      setEditingProject(null);
      await loadProjects();
    } catch (error) {
      console.error('Error updating featured project:', error);
      throw error;
    }
  };

  const handleCreateSubmit = async (data: Record<string, any>) => {
    try {
      // Process tags if they're provided as a comma-separated string
      let tags: string[] = [];
      if (typeof data.tags === 'string') {
        tags = data.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean);
      }

      await createFeaturedProject({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        project_url: data.project_url,
        github_url: data.github_url || '',
        tags,
        order_position: projects.length + 1,
      });
      setIsCreating(false);
      await loadProjects();
    } catch (error) {
      console.error('Error creating featured project:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this featured project?')) {
      try {
        await deleteFeaturedProject(id);
        await loadProjects();
      } catch (error) {
        console.error('Error deleting featured project:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formFields = [
    {
      name: 'title',
      label: 'Project Title',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea' as const,
      required: true,
    },
    {
      name: 'image_url',
      label: 'Image URL',
      type: 'text' as const,
      required: true,
      placeholder: 'https://example.com/image.jpg',
    },
    {
      name: 'project_url',
      label: 'Project URL',
      type: 'text' as const,
      required: true,
      placeholder: 'https://example.com/project',
    },
    {
      name: 'github_url',
      label: 'GitHub URL (Optional)',
      type: 'text' as const,
      required: false,
      placeholder: 'https://github.com/username/repo',
    },
    {
      name: 'tags',
      label: 'Tags (comma separated)',
      type: 'text' as const,
      required: true,
      placeholder: 'web, javascript, react',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Manage Featured Projects
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Project
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Add New Project</h3>
            <div className="mt-5">
              <ContentForm
                fields={formFields}
                initialData={{}}
                onSubmit={handleCreateSubmit}
                submitLabel="Create"
              />
              <button
                onClick={() => setIsCreating(false)}
                className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {editingProject && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Edit Project</h3>
            <div className="mt-5">
              <ContentForm
                fields={formFields}
                initialData={{
                  ...editingProject,
                  // Convert tags array to comma-separated string for editing
                  tags: Array.isArray(editingProject.tags) ? editingProject.tags.join(', ') : editingProject.tags
                }}
                onSubmit={handleEditSubmit}
                submitLabel="Update"
              />
              <button
                onClick={() => setEditingProject(null)}
                className="mt-3 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Current Featured Projects</h3>
          
          {projects.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No featured projects have been added yet.</p>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0">
                      {project.image_url ? (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover sm:object-center"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-gray-500 dark:text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex flex-col h-full flex-grow">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                      
                      <div className="mt-2 flex flex-wrap gap-1">
                        {project.tags && project.tags.map((tag, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto pt-4">
                        <div className="flex flex-wrap gap-2">
                          <a
                            href={project.project_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            View Project
                          </a>
                          {project.github_url && (
                            <a
                              href={project.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                        
                        <div className="mt-4 flex justify-end space-x-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                          >
                            <PencilIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => handleDelete(project.id)}
                            className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-700 dark:text-red-400 dark:border-gray-600 dark:hover:bg-gray-600"
                          >
                            <TrashIcon className="h-4 w-4" aria-hidden="true" />
                          </button>
                        </div>
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