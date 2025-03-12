import { ChatBubbleLeftRightIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

const contacts = [
  { name: 'Jeevithan Muhunthan', email: 'muhuj2794@wrdsb.ca', role: 'Co-President' },
  { name: 'Kevin Chang', email: 'chank1816@wrdsb.ca', role: 'Co-President' },
  { name: 'Raymon Drost', email: 'drosr4740@wrdsb.ca', role: 'Co-President' },
  { name: 'Russell Morland', email: 'morlr6015@wrdsb.ca', role: 'Executive' }
];

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Contact Us
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Get in touch with our team or join our Discord community to stay updated.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800">
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

        <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800">
          <div className="p-8">
            <div className="flex items-center justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <EnvelopeIcon className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Email Us
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Have questions or want to join the club? Reach out to our team members directly.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-800">
            <ul className="divide-y divide-gray-200 dark:divide-gray-800">
              {contacts.map((contact) => (
                <li key={contact.email} className="flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{contact.name}</p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">{contact.role}</p>
                  </div>
                  <a
                    href={`mailto:${contact.email}`}
                    className="ml-4 rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:ring-gray-700 dark:hover:bg-gray-700"
                  >
                    Email
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
} 