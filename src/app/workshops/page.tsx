import { WorkshopList } from '@/components/WorkshopList';

export default function WorkshopsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Programming Club Workshops
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Access all our workshop materials and presentations organized by week.
        </p>
      </div>
      <div className="mt-16">
        <WorkshopList />
      </div>
    </div>
  );
} 