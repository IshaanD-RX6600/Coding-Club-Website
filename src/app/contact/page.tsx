import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Join our Discord community to stay updated and get in touch with us.
        </p>
      </div>

      <div className="mt-16">
        <div className="mx-auto max-w-xl overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800">
          <div className="p-8">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Join Our Discord Server
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Connect with other members, get help with challenges, and stay updated with club announcements.
              </p>
              <div className="mt-6">
                <a
                  href="https://discord.gg/hgQWvpYm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                  Join Discord Server
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 