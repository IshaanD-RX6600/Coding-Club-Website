import React from 'react';
import { clubData } from '../data/clubData';

export default function ChallengesPage() {
  return (
    <div className="space-y-12">
      {/* Prisoner's Dilemma Challenge */}
      <section>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Coding Challenges</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {clubData.challenges.prisonersDilemma.title}
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="language-cpp">{clubData.challenges.prisonersDilemma.description}</code>
              </pre>
              <p className="mt-4 text-gray-600 dark:text-gray-300">
                {clubData.challenges.prisonersDilemma.rules}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Weekly Problems */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Weekly Problems</h2>
        <div className="grid grid-cols-1 gap-6">
          {clubData.challenges.weeklyProblems.map((week, weekIndex) => (
            <div key={weekIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Week {week.week}
                </h3>
                <div className="space-y-4">
                  {week.problems.map((problem, problemIndex) => (
                    <div key={problemIndex} className="flex items-center justify-between">
                      <div>
                        <a
                          href={problem.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium"
                        >
                          {problem.title}
                        </a>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          ({problem.points} points)
                        </span>
                      </div>
                      <a
                        href={problem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                      >
                        Solve &rarr;
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 