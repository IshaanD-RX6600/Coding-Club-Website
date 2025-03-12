import React from 'react';
import { clubData } from './data/clubData';

export default function Home() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Welcome to Programming Club
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
          A place to learn, build, and collaborate with fellow programmers!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href={clubData.discordLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Join our Discord
          </a>
        </div>
      </section>

      {/* Club Executives */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Club Executives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {clubData.clubExecs.map((exec) => (
            <div key={exec.name} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{exec.name}</h3>
              <p className="text-gray-600 dark:text-gray-300">Grade {exec.grade}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meeting Schedule */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Meeting Schedule</h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            We meet <span className="font-semibold">{clubData.meetingSchedule}</span>
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Links</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/workshops"
            className="block bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Workshops</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Access our workshop materials and presentations</p>
          </a>
          <a
            href="/challenges"
            className="block bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <h3 className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">Challenges</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">Take part in our coding challenges and competitions</p>
          </a>
        </div>
      </section>
    </div>
  );
} 