import { UserIcon, PhotoIcon, CodeBracketIcon, ClockIcon, MapPinIcon } from '@heroicons/react/24/outline';
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
      {/* Hero Section with Animated Background */}
      <div className="relative flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-white dark:bg-gray-950">
        {/* Floating Bubbles */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large bubbles */}
          <div className="absolute bottom-[80vh] left-[10%] w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float-slow animate-color-cycle"></div>
          <div className="absolute bottom-[85vh] left-[20%] w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float animate-color-cycle delay-1000"></div>
          <div className="absolute bottom-[75vh] left-[40%] w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float-fast animate-color-cycle delay-[2000ms]"></div>
          <div className="absolute bottom-[90vh] left-[60%] w-28 h-28 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float animate-color-cycle delay-[3000ms]"></div>
          <div className="absolute bottom-[70vh] left-[80%] w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float-slow animate-color-cycle delay-[4000ms]"></div>
          
          {/* Small bubbles */}
          <div className="absolute bottom-[95vh] left-[5%] w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float-fast animate-color-cycle delay-[500ms]"></div>
          <div className="absolute bottom-[65vh] left-[25%] w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float animate-color-cycle delay-[1500ms]"></div>
          <div className="absolute bottom-[88vh] left-[45%] w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float-slow animate-color-cycle delay-[2500ms]"></div>
          <div className="absolute bottom-[72vh] left-[65%] w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float-fast animate-color-cycle delay-[3500ms]"></div>
          <div className="absolute bottom-[92vh] left-[85%] w-14 h-14 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float animate-color-cycle delay-[4500ms]"></div>
          
          {/* Continuous flow bubbles */}
          <div className="absolute bottom-[40vh] left-[15%] w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float-slow animate-color-cycle delay-[5000ms]"></div>
          <div className="absolute bottom-[35vh] left-[35%] w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float animate-color-cycle delay-[5500ms]"></div>
          <div className="absolute bottom-[45vh] left-[55%] w-24 h-24 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float-fast animate-color-cycle delay-[6000ms]"></div>
          <div className="absolute bottom-[30vh] left-[75%] w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float animate-color-cycle delay-[6500ms]"></div>
          
          {/* Bottom bubbles */}
          <div className="absolute bottom-0 left-[10%] w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float-fast animate-color-cycle delay-[7000ms]"></div>
          <div className="absolute bottom-0 left-[30%] w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-500 dark:from-indigo-400 dark:to-blue-400 rounded-full animate-float animate-color-cycle delay-[7500ms]"></div>
          <div className="absolute bottom-0 left-[50%] w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 dark:from-purple-400 dark:to-indigo-400 rounded-full animate-float-slow animate-color-cycle delay-[8000ms]"></div>
          <div className="absolute bottom-0 left-[70%] w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-blue-400 dark:to-purple-400 rounded-full animate-float-fast animate-color-cycle delay-[8500ms]"></div>
        </div>
        
        {/* Hero Content */}
        <div className="min-h-[80vh] flex flex-col items-center justify-center">
          <div className="relative z-10 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to CHCI Coding Club
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-8">
              Join us to learn programming, solve challenges, and build amazing projects together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://discord.gg/hgQWvpYm"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Join the Club
              </a>
              <a
                href="/projects"
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors duration-300"
              >
                Featured Projects
              </a>
            </div>

            {/* Club Photo */}
            <div className="mt-12 relative w-full max-w-3xl mx-auto h-[400px] rounded-xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-black/10 backdrop-blur-sm rounded-xl"></div>
              <Placeholder text="Coding Club Group Photo" className="rounded-xl" />
            </div>
          </div>
        </div>

        {/* About Content */}
        <div className="relative z-10 w-full py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                About Our Club
              </h2>
              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                A community of passionate coders learning and building together
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
              <div className="animate-fadeInUp flex flex-col items-center rounded-xl bg-blue-50 p-8 text-center transition-transform hover:shadow-md dark:bg-gray-900 [animation-delay:200ms]">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900">
                  <MapPinIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Where We Meet</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Room C137 (Right in front of the Gym)
                </p>
              </div>
              
              <div className="animate-fadeInUp flex flex-col items-center rounded-xl bg-blue-50 p-8 text-center transition-transform hover:shadow-md dark:bg-gray-900 [animation-delay:400ms]">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 dark:bg-blue-900">
                  <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">When We Meet</h3>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Every Thursday from 2:30 PM to 4:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Connect With Us
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Stay updated with club announcements and connect with other members
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-white p-6 text-center transition-transform hover:scale-105 shadow-sm dark:bg-gray-800 [animation-delay:200ms]">
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
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-white p-6 text-center transition-transform hover:scale-105 shadow-sm dark:bg-gray-800 [animation-delay:400ms]">
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
            <div className="animate-fadeInUp flex flex-col items-center rounded-lg bg-white p-6 text-center transition-transform hover:scale-105 shadow-sm dark:bg-gray-800 [animation-delay:600ms]">
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
      <div className="bg-white py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Meet Our Team
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The dedicated students behind CHCI Coding Club
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="text-center mb-10">
            <h2 className="animate-fadeInUp text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Club Memories
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Highlights from our workshops, events, and club activities
            </p>
          </div>
          
          <div className="mt-10">
            <GalleryGrid images={galleryImages.slice(0, 6)} columns={3} />
            
            <div className="mt-10 text-center">
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
