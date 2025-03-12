import { UserIcon } from '@heroicons/react/24/outline';

const executives = [
  { name: 'Russell Morland', grade: 12 },
  { name: 'Raymon Drost', grade: 12 },
  { name: 'Jeevithan Muhunthan', grade: 10 },
  { name: 'Kevin Chang', grade: 10 },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Welcome to Programming Club
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Join us to learn programming, solve challenges, and build amazing projects together.
        </p>
      </div>

      <div className="mt-24">
        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Club Executives
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {executives.map((executive) => (
            <div
              key={executive.name}
              className="flex flex-col items-center rounded-lg bg-white p-6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <UserIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white">
                {executive.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Grade {executive.grade}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
