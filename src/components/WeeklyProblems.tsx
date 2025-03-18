'use client';

import { useState, useEffect } from 'react';
import { FaChevronDown, FaExternalLinkAlt } from 'react-icons/fa';
import { Challenge } from '@/types/content';
import { getChallenges } from '@/lib/content';
import { Spinner } from '@/components/Spinner';

export default function WeeklyProblems() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChallenges = async () => {
      try {
        const data = await getChallenges();
        // Filter only DMOJ challenges and sort by week number
        const dmojChallenges = data
          .filter(c => c.platform === 'dmoj' && c.week_number !== undefined)
          .sort((a, b) => (a.week_number || 0) - (b.week_number || 0));
        setChallenges(dmojChallenges);
      } catch (error) {
        console.error('Failed to load challenges:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChallenges();
  }, []);

  // Group challenges by week
  const challengesByWeek = challenges.reduce<{ [key: number]: Challenge[] }>((acc, challenge) => {
    if (challenge.week_number === undefined) return acc;
    const weekNumber = challenge.week_number;
    if (!acc[weekNumber]) {
      acc[weekNumber] = [];
    }
    acc[weekNumber].push(challenge);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(challengesByWeek).map(([weekNumber, weekChallenges]) => (
        <div key={weekNumber} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setExpandedWeek(expandedWeek === Number(weekNumber) ? null : Number(weekNumber))}
            className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Week {weekNumber}</h3>
            <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedWeek === Number(weekNumber) ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${expandedWeek === Number(weekNumber) ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
            <div className="px-4 py-3 space-y-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3">
                {weekChallenges.map((challenge, index) => (
                  <div key={challenge.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {challenge.title}</h4>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Difficulty: {challenge.difficulty}</p>
                    </div>
                    <a
                      href={challenge.url}
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