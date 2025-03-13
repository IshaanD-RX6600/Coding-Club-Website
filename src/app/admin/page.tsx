'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  AdjustmentsHorizontalIcon, 
  UserGroupIcon, 
  PhotoIcon,
  LinkIcon,
  HomeIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const [lastEdited, setLastEdited] = useState<string | null>(null);
  const router = useRouter();

  // Check admin status
  useEffect(() => {
    const isAdmin = localStorage.getItem('aefd-gbza-fkew-dsxz') === 'true';
    if (!isAdmin) {
      router.push('/login');
    }
    
    // You could fetch last edited info from localStorage
    const lastEdit = localStorage.getItem('lastEditedSection');
    if (lastEdit) {
      setLastEdited(lastEdit);
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('aefd-gbza-fkew-dsxz');
    router.push('/');
  };

  const adminSections = [
    {
      title: 'Hero Section',
      description: 'Edit the main hero section on the homepage',
      icon: HomeIcon,
      href: '/admin/hero',
      color: 'bg-blue-500',
    },
    {
      title: 'About Section',
      description: 'Update the about section with meeting details',
      icon: AdjustmentsHorizontalIcon,
      href: '/admin/about',
      color: 'bg-purple-500',
    },
    {
      title: 'Social Links',
      description: 'Manage social media and external links',
      icon: LinkIcon,
      href: '/admin/social',
      color: 'bg-pink-500',
    },
    {
      title: 'Club Executives',
      description: 'Update the team members and roles',
      icon: UserGroupIcon,
      href: '/admin/executives',
      color: 'bg-green-500',
    },
    {
      title: 'Gallery',
      description: 'Manage images in the club gallery',
      icon: PhotoIcon,
      href: '/admin/gallery',
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 pt-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your club website content here.
          </p>
          {lastEdited && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-500">
              Last edited section: {lastEdited}
            </p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {adminSections.map((section) => (
          <Link
            key={section.title}
            href={section.href}
            className="block transform transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-md text-white" style={{ backgroundColor: section.color.slice(3) }}>
                <section.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {section.title}
              </h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {section.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Quick Tips
        </h2>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-2">
          <li>All changes you make are immediately live on the website</li>
          <li>For images, use direct links to images hosted online</li>
          <li>You can use Google Drive, Imgur, or any image hosting service</li>
          <li>Make sure your image links end with an extension like .jpg, .png</li>
          <li>Always check the website after making changes to ensure everything looks correct</li>
        </ul>
      </div>
    </div>
  );
} 