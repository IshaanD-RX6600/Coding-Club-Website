'use client';

import { useEffect, useState } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import { SocialLink } from '@/types/content';
import { getSocialLinks, updateSocialLink, createSocialLink, deleteSocialLink } from '@/lib/content';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

export default function SocialLinksAdmin() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadLinks();
  }, []);

  const loadLinks = async () => {
    try {
      const data = await getSocialLinks();
      setLinks(data);
    } catch (error) {
      console.error('Error loading social links:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (data: Record<string, any>) => {
    if (!editingLink?.id) return;
    
    try {
      await updateSocialLink({ ...data, id: editingLink.id });
      setEditingLink(null);
      await loadLinks();
    } catch (error) {
      console.error('Error updating social link:', error);
      throw error;
    }
  };

  const handleCreateSubmit = async (data: Record<string, any>) => {
    try {
      await createSocialLink({
        title: data.title,
        description: data.description,
        link: data.link,
        button_text: data.button_text,
        button_style: data.button_style as 'default' | 'instagram' | 'discord',
        order_position: links.length + 1,
      });
      setIsCreating(false);
      await loadLinks();
    } catch (error) {
      console.error('Error creating social link:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      try {
        await deleteSocialLink(id);
        await loadLinks();
      } catch (error) {
        console.error('Error deleting social link:', error);
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
      label: 'Title',
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
      name: 'link',
      label: 'Link URL',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'button_text',
      label: 'Button Text',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'button_style',
      label: 'Button Style',
      type: 'text' as const,
      required: true,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Manage Social Links
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Social Link
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Add New Social Link</h3>
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

      {editingLink && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Edit Social Link</h3>
            <div className="mt-5">
              <ContentForm
                fields={formFields}
                initialData={editingLink}
                onSubmit={handleEditSubmit}
                submitLabel="Update"
              />
              <button
                onClick={() => setEditingLink(null)}
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
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Current Social Links</h3>
          
          {links.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No social links have been added yet.</p>
          ) : (
            <div className="mt-5 divide-y divide-gray-200 dark:divide-gray-700">
              {links.map((link) => (
                <div key={link.id} className="py-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{link.title}</h4>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{link.description}</p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Link:</span> {link.link}
                      </p>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Button:</span> {link.button_text} ({link.button_style})
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingLink(link)}
                        className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-gray-700 dark:text-red-400 dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
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