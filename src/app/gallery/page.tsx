'use client';

import { useState, useEffect } from 'react';
import { GalleryGrid } from '@/components/GalleryGrid';
import { PhotoIcon } from '@heroicons/react/24/outline';
import { getGalleryImages } from '@/lib/content';
import { GalleryImage } from '@/types/content';
import { Spinner } from '@/components/Spinner';

type EventFilter = string | 'all';

export default function GalleryPage() {
  const [filter, setFilter] = useState<EventFilter>('all');
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
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

    loadImages();
  }, []);
  
  // Extract unique event types for filtering
  const eventTypes = ['all', ...Array.from(new Set(images.map(img => img.event_type || 'Other')))];
  
  // Filter images based on selected event type
  const filteredImages = filter === 'all'
    ? images
    : images.filter(img => (img.event_type || 'Other') === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Coding Club Gallery
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Memories and moments from our club activities, workshops, and events.
        </p>
      </div>
      
      <div className="mt-10">
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {eventTypes.map((eventType) => (
            <button
              key={eventType}
              onClick={() => setFilter(eventType)}
              className={`px-4 py-2 rounded-full text-sm ${
                filter === eventType
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
              } transition-colors`}
            >
              {eventType === 'all' ? 'All Events' : eventType}
            </button>
          ))}
        </div>
        
        {filteredImages.length > 0 ? (
          <GalleryGrid images={filteredImages} columns={3} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <PhotoIcon className="h-16 w-16 text-gray-400" />
            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">No images found</h3>
            <p className="mt-1 text-gray-500 dark:text-gray-400">Try selecting a different filter</p>
          </div>
        )}
      </div>
    </div>
  );
} 