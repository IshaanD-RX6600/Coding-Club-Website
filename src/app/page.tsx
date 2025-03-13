import { UserIcon, PhotoIcon, CodeBracketIcon } from '@heroicons/react/24/outline';
import { Placeholder } from '@/components/Placeholder';
import { GalleryGrid } from '@/components/GalleryGrid';
import { galleryImages } from '@/data/gallery';
import Link from 'next/link';

const executives = [
  { name: 'Russell Morland', grade: 12 },
  { name: 'Raymon Drost', grade: 12 },
  { name: 'Jeevithan Muhunthan', grade: 10 },
  { name: 'Kevin Chang', grade: 10 },
];

const projects = [
  { title: 'Web Development', description: 'Building responsive websites using React and Next.js', image: '/images/web-dev.jpg' },
  { title: 'Game Development', description: 'Creating games with Unity and C#', image: '/images/game-dev.jpg' },
  { title: 'Python Programming', description: 'Learning Python for data science and automation', image: '/images/python.jpg' },
  { title: 'Arduino Projects', description: 'Building hardware projects with Arduino', image: '/images/arduino.jpg' },
];

export default function Home() {
  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center">
              <h1 className="animate-fadeInUp text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Welcome to CHCI Coding Club
              </h1>
              <p className="mt-6 animate-fadeInUp text-lg leading-8 text-gray-600 dark:text-gray-400 [animation-delay:200ms]">
                Join us to learn programming, solve challenges, and build amazing projects together.
              </p>
              <br></br>
              <h1 className="text-2xl font-bold">About the Club</h1>
              <p className="mt-2">Location: Room C137 (Right in front of the Gym)</p>
              <p className="mt-2">Meeting Time: Every Thursday from 2:30 PM to 4:00 PM</p>
              <div className="mt-8 flex gap-4">
                <Link 
                  href="/contact" 
                  className="animate-fadeInUp rounded-lg bg-blue-600 px-4 py-2 text-white transition-transform hover:bg-blue-700 hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600 [animation-delay:400ms]"
                >
                  Join the Club
                </Link>
                <a 
                  href="/projects" 
                  className="animate-fadeInUp rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-transform hover:bg-gray-50 hover:scale-105 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 [animation-delay:600ms]"
                >
                  Featured Projects
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="animate-fadeIn relative h-[300px] w-full overflow-hidden rounded-xl shadow-xl [animation-delay:300ms]">
                <Placeholder text="Coding Club Group Photo" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      {/* <div className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              About Our Club
            </h2>
            <div className="mx-auto mt-8 max-w-3xl">
              <div className="animate-fadeInUp rounded-lg bg-blue-50 p-6 dark:bg-gray-900 [animation-delay:200ms]">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Location</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Room C137 (Right in front of the Gym)
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Meeting Time</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                      Every Thursday from 2:30 PM to 4:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Social Links */}
      <div className="border-y bg-white py-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center transition-transform hover:scale-105 dark:bg-gray-900 [animation-delay:200ms]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Join our Google Classroom</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Class Code: <span className="font-mono text-lg font-bold">ABC123</span></p>
              <a 
                href="https://classroom.google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Open Classroom
              </a>
            </div>
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center transition-transform hover:scale-105 dark:bg-gray-900 [animation-delay:400ms]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Follow us on Instagram</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">@chci.coding.club</p>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-4 py-2 text-white hover:from-purple-600 hover:to-pink-600"
              >
                Follow Us
              </a>
            </div>
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-blue-50 p-6 text-center transition-transform hover:scale-105 dark:bg-gray-900 [animation-delay:600ms]">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Join our Discord</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Connect with other club members</p>
              <a 
                href="https://discord.gg/hgQWvpYm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Join Server
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Club Executives */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="animate-fadeInUp text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Club Executives
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executives.map((executive, index) => (
              <div
                key={executive.name}
                className={`animate-fadeInUp flex flex-col items-center rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105 ring-1 ring-gray-900/5 dark:bg-gray-900 dark:ring-gray-800 [animation-delay:${200 + index * 100}ms]`}
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

      {/* Gallery Section */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Club Memories
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600 dark:text-gray-400">
              Highlights from our workshops, events, and club activities.
            </p>
          </div>
          
          <div className="mt-10">
            <GalleryGrid images={galleryImages.slice(0, 6)} columns={3} />
            
            <div className="mt-8 text-center">
              <Link 
                href="/gallery" 
                className="inline-flex items-center justify-center rounded-lg border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                View Full Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
