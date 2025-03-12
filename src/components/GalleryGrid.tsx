'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/data/gallery';
import { Placeholder } from '@/components/Placeholder';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GalleryGridProps {
  images: GalleryImage[];
  limit?: number;
  columns?: 2 | 3 | 4;
}

export function GalleryGrid({ images, limit, columns = 3 }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  
  const displayImages = limit ? images.slice(0, limit) : images;
  
  const columnClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  }[columns];

  return (
    <>
      <div className={`grid ${columnClass} gap-4`}>
        {displayImages.map((image) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-lg bg-gray-100 shadow-sm dark:bg-gray-800 cursor-pointer relative transition-transform hover:scale-[1.02]"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-w-16 aspect-h-9 relative h-48 sm:h-64 w-full overflow-hidden">
              {/* Use Placeholder component if real images aren't available yet */}
              <Placeholder text={image.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-0 left-0 w-full p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
                <div className="text-sm font-medium">{image.date}</div>
                <h3 className="text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
          <div className="relative max-h-[90vh] max-w-4xl w-full rounded-lg bg-white dark:bg-gray-900 overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[50vh] md:h-[70vh] w-full bg-gray-200 dark:bg-gray-800">
              <Placeholder text={selectedImage.title} className="h-full" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{selectedImage.title}</h3>
                <button
                  className="rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  onClick={() => setSelectedImage(null)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{selectedImage.date} {selectedImage.event && `- ${selectedImage.event}`}</p>
              {selectedImage.description && (
                <p className="text-gray-700 dark:text-gray-300">{selectedImage.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
} 