import React from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface PlaceholderProps {
  text?: string;
  className?: string;
}

export function Placeholder({ text = 'Placeholder Image', className = '' }: PlaceholderProps) {
  return (
    <div className={`flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200 p-4 dark:bg-gray-800 ${className}`}>
      <PhotoIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
} 