import { ProjectList } from '@/components/ProjectList';

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
          Club Projects
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Explore projects created by CHCI Coding Club members across different technologies.
        </p>
      </div>
      <div className="mt-16">
        <ProjectList />
      </div>
    </div>
  );
} 