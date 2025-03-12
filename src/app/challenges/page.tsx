'use client';

import WeeklyProblems from '@/components/WeeklyProblems';

export default function ChallengesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Weekly Challenges</h1>
      <p className="text-gray-300 mb-8">
        Test your programming skills with our weekly challenges and tournaments.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">DMOJ Problems</h2>
          <WeeklyProblems />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Tournaments</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-500 p-2 rounded-lg">
                🏆
              </div>
              <h3 className="text-xl font-semibold">Iterated Prisoner's Dilemma</h3>
            </div>
            <p className="text-gray-300 mb-4">
              Implement a strategy for the Iterated Prisoner's Dilemma game. Your
              goal is to maximize your score through cooperation or defection against
              other players' strategies.
            </p>
            <div className="bg-gray-700 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Sample Code:</h4>
              <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                <code className="text-sm">
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
        </div>
      </div>
    </div>
  );
} 