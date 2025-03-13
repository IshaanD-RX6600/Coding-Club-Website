'use client';

import { useState } from 'react';
import { weeks } from '@/data/challenges';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';

export default function WeeklyProblems() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      {weeks.map((week) => (
        <div key={week.number} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setExpandedWeek(expandedWeek === week.number ? null : week.number)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Week {week.number}</h3>
            <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedWeek === week.number ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${expandedWeek === week.number ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
            <div className="px-4 py-3 space-y-4 border-t border-gray-200 dark:border-gray-700">
              {week.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4">{week.description}</p>
              )}
              <div className="space-y-3">
                {week.problems.map((problem, index) => (
                  <div key={problem.code} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Points: {problem.points}</p>
                    </div>
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                    >
                      Solve <FaExternalLinkAlt className="h-4 w-4" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 