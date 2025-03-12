import React from 'react';
import { clubData } from '../data/clubData';

export default function ProblemsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Weekly Problems</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Practice your problem-solving skills with our weekly programming challenges from DMOJ.
        </p>
      </div>

      <div className="space-y-6">
        {clubData.challenges.weeklyProblems.map((week, weekIndex) => (
          <div key={weekIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Week {week.week} Problems
              </h2>
              <div className="space-y-6">
                {week.problems.map((problem, problemIndex) => (
                  <div
                    key={problemIndex}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="space-y-2 md:space-y-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center rounded-md bg-green-50 dark:bg-green-900/30 px-2 py-1 text-xs font-medium text-green-700 dark:text-green-400">
                          {problem.points} points
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Solve Problem
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Submit</h2>
        <div className="prose dark:prose-invert max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-300">
            <li>Create a DMOJ account if you haven't already</li>
            <li>Solve the problems and submit your solutions on DMOJ</li>
            <li>Share your DMOJ profile link with us to verify your solutions</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 