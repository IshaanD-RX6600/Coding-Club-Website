'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/types/content';
import { Placeholder } from './Placeholder';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface GalleryGridProps {
  images: GalleryImage[];
  columns?: number;
}

export function GalleryGrid({ images, columns = 3 }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  return (
    <div>
      <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
        {images.map((image) => (
          <div
            key={image.id}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            {image.image_url ? (
              <Image
                src={image.image_url}
                alt={image.title}
                fill
                className="object-cover"
              />
            ) : (
              <Placeholder text={image.title} />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity flex items-end p-4">
              <div className="text-white opacity-0 hover:opacity-100 transition-opacity">
                <h3 className="text-lg font-semibold">{image.title}</h3>
                <p className="text-sm">{image.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full aspect-video">
            {selectedImage.image_url ? (
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            ) : (
              <Placeholder text={selectedImage.title} />
            )}
          </div>
          <div className="absolute bottom-8 left-0 right-0 text-center text-white">
            <h3 className="text-xl font-semibold">{selectedImage.title}</h3>
            <p className="text-lg mt-2">{selectedImage.description}</p>
            <p className="text-sm mt-1 text-gray-300">{selectedImage.date}</p>
          </div>
        </div>
      )}
    </div>
  );
} 