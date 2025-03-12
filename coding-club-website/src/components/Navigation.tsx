'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Challenges', href: '/challenges' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold">
                Programming Club
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium ${
                    pathname === item.href
                      ? 'border-blue-500 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <a
              href="https://discord.gg/hgQWvpYm"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Join Discord
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
} 