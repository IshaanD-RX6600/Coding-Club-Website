'use client';

import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { CodeBracketIcon, RocketLaunchIcon, CpuChipIcon, BeakerIcon } from '@heroicons/react/24/outline';

type Category = 'all' | 'web' | 'game' | 'ai' | 'hardware';

export function ProjectList() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <CodeBracketIcon className="h-5 w-5" />;
      case 'game':
        return <RocketLaunchIcon className="h-5 w-5" />;
      case 'ai':
        return <BeakerIcon className="h-5 w-5" />;
      case 'hardware':
        return <CpuChipIcon className="h-5 w-5" />;
      default:
        return <CodeBracketIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          All Projects
        </button>
        <button
          onClick={() => setSelectedCategory('web')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'web'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Web
        </button>
        <button
          onClick={() => setSelectedCategory('game')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'game'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Games
        </button>
        <button
          onClick={() => setSelectedCategory('ai')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'ai'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          AI
        </button>
        <button
          onClick={() => setSelectedCategory('hardware')}
          className={`px-4 py-2 rounded-full ${
            selectedCategory === 'hardware'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          Hardware
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.title}
            className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="relative flex-shrink-0 h-48 bg-gray-100 dark:bg-gray-800">
              <div className="flex h-full items-center justify-center p-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  {getCategoryIcon(project.category)}
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              <p className="mb-4 flex-1 text-gray-600 dark:text-gray-400">{project.description}</p>
              <div className="mb-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/40 dark:text-blue-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="inline-flex rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                    +{project.technologies.length - 3} more
                  </span>
                )}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 