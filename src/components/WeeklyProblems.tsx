'use client';

import { useState } from 'react';
import { weeks } from '@/data/challenges';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';

export default function WeeklyProblems() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);

  return (
    <div className="space-y-4">
      {weeks.map((week) => (
        <div key={week.number} className="bg-gray-800 rounded-lg overflow-hidden">
          <button
            onClick={() => setExpandedWeek(expandedWeek === week.number ? null : week.number)}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-700 transition-colors"
          >
            <h3 className="text-lg font-semibold">Week {week.number}</h3>
            {expandedWeek === week.number ? (
              <FaChevronUp className="h-5 w-5" />
            ) : (
              <FaChevronDown className="h-5 w-5" />
            )}
          </button>
          
          {expandedWeek === week.number && (
            <div className="px-4 py-3 space-y-4">
              {week.description && (
                <p className="text-gray-300 mb-4">{week.description}</p>
              )}
              <div className="space-y-3">
                {week.problems.map((problem, index) => (
                  <div key={problem.code} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">Problem {index + 1}: {problem.title}</h4>
                      <p className="text-sm text-blue-400">Points: {problem.points}</p>
                    </div>
                    <a
                      href={problem.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Solve <FaExternalLinkAlt className="h-4 w-4" />
                    </a>
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