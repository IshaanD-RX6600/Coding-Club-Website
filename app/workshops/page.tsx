import React from 'react';
import { clubData } from '../data/clubData';

export default function WorkshopsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Workshop Materials</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Access all our workshop presentations and materials. Each week covers different programming concepts and challenges.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubData.workshops.map((workshop, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Week {workshop.week}
              </h2>
              <div className="space-y-3">
                {workshop.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                  >
                    Workshop Material {linkIndex + 1}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 