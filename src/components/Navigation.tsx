'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { useAdmin } from '@/contexts/AdminContext';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Workshops', href: '/workshops' },
  { name: 'Projects', href: '/projects' },
  { name: 'Challenges', href: '/challenges' },
  { name: 'Gallery', href: '/gallery' },
  { name: 'Contact', href: '/contact' },
];

export function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAdmin, loading } = useAdmin();
  const [adminMounted, setAdminMounted] = useState(false);

  // Only show the admin link after client-side hydration to prevent hydration mismatch
  useEffect(() => {
    setAdminMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <Link href="/" className="text-xl font-bold group">
                <span className="bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-500 group-hover:animate-gradient-x transition-colors duration-300">
                  CHCI Coding Club
                </span>
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
            
            {/* Admin Link - only shown to admins */}
            {adminMounted && isAdmin && (
              <Link
                href="/admin"
                className="ml-4 flex items-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 dark:bg-purple-500 dark:hover:bg-purple-600"
              >
                <ShieldCheckIcon className="mr-2 h-4 w-4" />
                Admin
              </Link>
            )}
            
            <a
              href="https://discord.gg/hgQWvpYm"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 hidden rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 sm:block"
            >
              Join Discord
            </a>
            
            {/* Mobile menu button */}
            <button
              type="button"
              className="ml-4 inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 sm:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="space-y-1 bg-white px-4 py-2 shadow-lg dark:bg-gray-900">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Admin Link in Mobile Menu - only shown to admins */}
            {adminMounted && isAdmin && (
              <Link
                href="/admin"
                className="block rounded-md px-3 py-2 text-base font-medium bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
            )}
            
            <a
              href="https://discord.gg/hgQWvpYm"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Join Discord
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 