'use client';

import { useState, useEffect } from 'react';
import WeeklyProblems from '@/components/WeeklyProblems';
import { CalendarIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { FaChevronDown, FaChevronUp, FaExternalLinkAlt } from 'react-icons/fa';
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { Challenge, Hackathon, Competition } from '@/types/content';
import { getChallenges, getHackathons, getCompetitions } from '@/lib/content';
import { Spinner } from '@/components/Spinner';

type Tab = 'problems' | 'hackathons' | 'contests';

export default function ChallengesPage() {
  const [activeTab, setActiveTab] = useState<Tab>('problems');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [openDifficulty, setOpenDifficulty] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [challengesData, hackathonsData, competitionsData] = await Promise.all([
          getChallenges(),
          getHackathons(),
          getCompetitions()
        ]);
        setChallenges(challengesData);
        setHackathons(hackathonsData);
        setCompetitions(competitionsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const leetcodeProblems = challenges
    .filter(c => c.platform === 'leetcode')
    .reduce((acc, challenge) => {
      const difficulty = challenge.difficulty.toLowerCase();
      if (!acc[difficulty]) {
        acc[difficulty] = [];
      }
      acc[difficulty].push({
        title: challenge.title,
        link: challenge.url || '#'
      });
      return acc;
    }, {} as Record<string, { title: string; link: string; }[]>);

  const hackerrankProblems = challenges
    .filter(c => c.platform === 'hackerrank')
    .reduce((acc, challenge) => {
      const difficulty = challenge.difficulty.toLowerCase();
      if (!acc[difficulty]) {
        acc[difficulty] = [];
      }
      acc[difficulty].push({
        title: challenge.title,
        link: challenge.url || '#'
      });
      return acc;
    }, {} as Record<string, { title: string; link: string; }[]>);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Challenges & Competitions</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Put your programming skills to the test with our weekly challenges, hackathons, and coding competitions.
      </p>

      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('problems')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'problems'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Weekly Problems
          </button>
          <button
            onClick={() => setActiveTab('hackathons')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'hackathons'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Hackathons
          </button>
          <button
            onClick={() => setActiveTab('contests')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'contests'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Coding Contests
          </button>
        </nav>
      </div>

      {activeTab === 'problems' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">DMOJ Problems</h2>
              <WeeklyProblems />
            </div>

            <div className="mt-4">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">LeetCode Problems</h2>
              
              <div className="space-y-4">
                {/* Beginner Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'beginner' ? null : 'beginner')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Beginner</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'beginner' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'beginner' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {leetcodeProblems.beginner?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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

                {/* Medium Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'medium' ? null : 'medium')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medium</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'medium' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'medium' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {leetcodeProblems.medium?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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

                {/* Advanced Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'advanced' ? null : 'advanced')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Advanced</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'advanced' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'advanced' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {leetcodeProblems.advanced?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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
            </div>

            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">HackerRank Problems</h2>
              
              <div className="space-y-4">
                {/* Beginner Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'hr-beginner' ? null : 'hr-beginner')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Beginner</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'hr-beginner' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'hr-beginner' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {hackerrankProblems.beginner?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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

                {/* Medium Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'hr-medium' ? null : 'hr-medium')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Medium</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'hr-medium' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'hr-medium' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {hackerrankProblems.medium?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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

                {/* Hard Problems */}
                <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => setExpandedCategory(expandedCategory === 'hr-hard' ? null : 'hr-hard')}
                    className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hard</h3>
                    <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedCategory === 'hr-hard' ? 'rotate-180' : ''}`} />
                  </button>
                
                  <div className={`overflow-hidden transition-all duration-300 ${expandedCategory === 'hr-hard' ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
                    <div className="px-4 py-3 space-y-3 border-t border-gray-200 dark:border-gray-700">
                      {hackerrankProblems.advanced?.map((problem, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">Problem {index + 1}: {problem.title}</h4>
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
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Tournaments</h2>
            {challenges
              .filter(c => c.platform === 'tournament')
              .map((tournament, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="bg-blue-500 p-2 rounded-lg text-white">
                      🏆
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{tournament.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {tournament.description}
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
                    <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Sample Code:</h4>
                    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto border border-gray-200 dark:border-gray-600">
                      <code className="text-sm text-gray-800 dark:text-gray-200">
                        {`// Sample function signature for Iterated Prisoner's Dilemma
bool makeMove(vector<bool>& myHistory, vector<bool>& opponentHistory) {
    // true represents cooperate, false represents defect
    // Implement your strategy here
    return true;
}`}
                      </code>
                    </pre>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {activeTab === 'hackathons' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Upcoming Hackathons</h2>
          
          {hackathons.map((hackathon, index) => (
            <div key={hackathon.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className={`bg-${index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'green' : 'orange'}-100 dark:bg-${index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'green' : 'orange'}-900 p-3 rounded-lg`}>
                  <SparklesIcon className={`h-6 w-6 text-${index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'green' : 'orange'}-600 dark:text-${index % 3 === 0 ? 'purple' : index % 3 === 1 ? 'green' : 'orange'}-400`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {hackathon.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {new Date(hackathon.start_date).toLocaleDateString()} - {new Date(hackathon.end_date).toLocaleDateString()} • {hackathon.location}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {hackathon.description}
                  </p>
                  <a 
                    href={hackathon.url}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Learn more →
                  </a>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-8 text-center">
            <a
              href="https://mlh.io/seasons/2023/events"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Explore More Hackathons
            </a>
          </div>
        </div>
      )}

      {activeTab === 'contests' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Coding Competitions</h2>
          
          {competitions.map((competition, index) => (
            <div key={competition.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <TrophyIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {competition.title}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                    {new Date(competition.date).toLocaleDateString()} • {competition.platform}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {competition.description}
                  </p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <a 
                      href={competition.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                      Official Website
                    </a>
                    <a 
                      href="https://dmoj.ca/problems/?category=4" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Practice Problems
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 