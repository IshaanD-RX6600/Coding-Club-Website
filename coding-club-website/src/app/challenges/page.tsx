import { supabase } from '@/lib/supabase';
import { CodeBracketIcon, TrophyIcon } from '@heroicons/react/24/outline';

async function getChallenges() {
  const { data, error } = await supabase
    .from('club_content')
    .select('content')
    .eq('page', 'challenges')
    .single();

  if (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }

  return data?.content?.challenges || [];
}

const prisonersDilemmaCode = `// Sample function signature for Iterated Prisoner's Dilemma
bool makeMove(vector<bool>& myHistory, vector<bool>& opponentHistory) {
    // true represents cooperate, false represents defect
    // Implement your strategy here
    return true;
}`;

export default async function ChallengesPage() {
  const challenges = await getChallenges();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Weekly Challenges
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Test your programming skills with our weekly challenges and tournaments.
        </p>
      </div>

      <div className="mt-16 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            DMOJ Problems
          </h2>
          <div className="mt-6 space-y-4">
            {challenges.map((challenge: any, index: number) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800"
              >
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                    <CodeBracketIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Week {challenge.week}
                  </h3>
                </div>
                <div className="mt-4 space-y-2">
                  {challenge.problems.map((problem: string, problemIndex: number) => (
                    <a
                      key={problemIndex}
                      href={problem}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-lg bg-gray-50 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                    >
                      Problem {problemIndex + 1}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Tournaments
          </h2>
          <div className="mt-6">
            <div className="overflow-hidden rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <TrophyIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Iterated Prisoner's Dilemma
                </h3>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                Implement a strategy for the Iterated Prisoner's Dilemma game. Your goal is to maximize your score
                through cooperation or defection against other players' strategies.
              </p>
              <div className="mt-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Sample Code:</h4>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-gray-50 p-4 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                  {prisonersDilemmaCode}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 