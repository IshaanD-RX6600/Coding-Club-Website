'use client';

import { useState } from 'react';
import { weeks } from '@/data/workshops';
import { PresentationChartBarIcon, BeakerIcon } from '@heroicons/react/24/outline';

export function WorkshopList() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {weeks.map((week) => (
        <div
          key={week.number}
          className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <button
            onClick={() => setExpandedWeek(expandedWeek === week.number ? null : week.number)}
            className="flex w-full items-center justify-between p-4 text-left"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Week {week.number}
            </h3>
            <svg
              className={`h-5 w-5 transform text-gray-500 transition-transform dark:text-gray-400 ${
                expandedWeek === week.number ? 'rotate-180' : ''
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {expandedWeek === week.number && (
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="space-y-4">
                {week.workshops.map((workshop, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800"
                  >
                    <div className="flex items-start space-x-3">
                      {workshop.type === 'presentation' ? (
                        <PresentationChartBarIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                      ) : (
                        <BeakerIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
                      )}
                      <div className="flex-1">
                        <a
                          href={workshop.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          {workshop.title}
                        </a>
                        {workshop.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {workshop.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 