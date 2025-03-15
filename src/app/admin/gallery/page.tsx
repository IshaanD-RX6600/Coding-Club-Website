'use client';

import { useEffect, useState } from 'react';
import ContentForm from '@/components/admin/ContentForm';
import { GalleryImage } from '@/types/content';
import { getGalleryImages, updateGalleryImage, createGalleryImage, deleteGalleryImage } from '@/lib/content';
import { PlusIcon, TrashIcon, PencilIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

export default function GalleryAdmin() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const data = await getGalleryImages();
      setImages(data);
    } catch (error) {
      console.error('Error loading gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditSubmit = async (data: Record<string, any>) => {
    if (!editingImage?.id) return;
    
    try {
      await updateGalleryImage({ 
        ...data, 
        id: editingImage.id,
      });
      setEditingImage(null);
      await loadImages();
    } catch (error) {
      console.error('Error updating gallery image:', error);
      throw error;
    }
  };

  const handleCreateSubmit = async (data: Record<string, any>) => {
    try {
      await createGalleryImage({
        title: data.title,
        description: data.description,
        image_url: data.image_url,
        event_type: data.event_type,
        date: data.date,
        order_position: images.length + 1,
      });
      setIsCreating(false);
      await loadImages();
    } catch (error) {
      console.error('Error creating gallery image:', error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this gallery image?')) {
      try {
        await deleteGalleryImage(id);
        await loadImages();
      } catch (error) {
        console.error('Error deleting gallery image:', error);
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
      name: 'image_url',
      label: 'Image URL',
      type: 'url' as const,
      required: true,
      placeholder: 'https://example.com/image.jpg',
    },
    {
      name: 'event_type',
      label: 'Event Type',
      type: 'text' as const,
      required: true,
    },
    {
      name: 'date',
      label: 'Date',
      type: 'text' as const,
      required: true,
      placeholder: 'YYYY-MM-DD',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Manage Gallery Images
          </h2>
        </div>
        <div className="mt-4 flex md:ml-4 md:mt-0">
          <button
            type="button"
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add New Image
          </button>
        </div>
      </div>

      {isCreating && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Add New Gallery Image</h3>
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

      {editingImage && (
        <div className="bg-white dark:bg-gray-800 shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Edit Gallery Image</h3>
            <div className="mt-5">
              <ContentForm
                fields={formFields}
                initialData={editingImage}
                onSubmit={handleEditSubmit}
                submitLabel="Update"
              />
              <button
                onClick={() => setEditingImage(null)}
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
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">Current Gallery Images</h3>
          
          {images.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No gallery images have been added yet.</p>
          ) : (
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {images.map((image) => (
                <div key={image.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <div className="relative h-48 w-full">
                    {image.image_url ? (
                      <Image
                        src={image.image_url}
                        alt={image.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{image.title}</h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{image.description}</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Event:</span> {image.event_type}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      <span className="font-medium">Date:</span> {image.date}
                    </p>
                    
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => setEditingImage(image)}
                        className="inline-flex items-center p-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
                      >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(image.id)}
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