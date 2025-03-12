import { supabase } from '@/lib/supabase';
import { PresentationChartBarIcon } from '@heroicons/react/24/outline';

async function getWorkshops() {
  const { data, error } = await supabase
    .from('club_content')
    .select('content')
    .eq('page', 'workshops')
    .single();

  if (error) {
    console.error('Error fetching workshops:', error);
    return [];
  }

  return data?.content?.workshops || [];
}

export default async function WorkshopsPage() {
  const workshops = await getWorkshops();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Weekly Workshops
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Join our weekly workshops to learn new programming concepts and techniques.
        </p>
      </div>

      <div className="mt-16 grid gap-8">
        {workshops.map((workshop: any, index: number) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
                  <PresentationChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="ml-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Week {workshop.week}
                </h3>
              </div>
              <div className="mt-4 space-y-2">
                {workshop.links.map((link: string, linkIndex: number) => (
                  <a
                    key={linkIndex}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg bg-gray-50 px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
                  >
                    Presentation {linkIndex + 1}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 