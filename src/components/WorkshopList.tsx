'use client';

import { useState, useEffect } from 'react';
import { PresentationChartBarIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { FaChevronDown } from 'react-icons/fa';
import { Workshop } from '@/types/content';
import { getWorkshops } from '@/lib/content';
import { Spinner } from './Spinner';

export function WorkshopList() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        const data = await getWorkshops();
        // Sort workshops by week number
        const sortedWorkshops = data.sort((a, b) => a.week_number - b.week_number);
        setWorkshops(sortedWorkshops);
      } catch (error) {
        console.error('Failed to load workshops:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkshops();
  }, []);

  // Group workshops by week
  const workshopsByWeek = workshops.reduce<{ [key: number]: Workshop[] }>((acc, workshop) => {
    const weekNumber = workshop.week_number;
    if (!acc[weekNumber]) {
      acc[weekNumber] = [];
    }
    acc[weekNumber].push(workshop);
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
      {Object.entries(workshopsByWeek).map(([weekNumber, weekWorkshops]) => (
        <div
          key={weekNumber}
          className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
        >
          <button
            onClick={() => setExpandedWeek(expandedWeek === Number(weekNumber) ? null : Number(weekNumber))}
            className="flex w-full items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Week {weekNumber}
            </h3>
            <FaChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-300 ${expandedWeek === Number(weekNumber) ? 'rotate-180' : ''}`} />
          </button>
          
          <div className={`overflow-hidden transition-all duration-300 ${expandedWeek === Number(weekNumber) ? 'max-h-[500px] animate-slide-down' : 'max-h-0 animate-slide-up'}`}>
            <div className="border-t border-gray-200 p-4 dark:border-gray-800">
              <div className="space-y-4">
                {weekWorkshops.map((workshop) => (
                  <div
                    key={workshop.id}
                    className="rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-800 transform transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-start space-x-3">
                      {workshop.materials?.some(m => m.type === 'slides') ? (
                        <PresentationChartBarIcon className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                      ) : (
                        <BeakerIcon className="h-6 w-6 text-green-500 dark:text-green-400" />
                      )}
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {workshop.title}
                        </div>
                        {workshop.description && (
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                            {workshop.description}
                          </p>
                        )}
                        {workshop.materials && workshop.materials.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {workshop.materials.map((material) => (
                              <a
                                key={material.id}
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
                              >
                                {material.title}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
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