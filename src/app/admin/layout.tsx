import { AdminProvider } from '@/contexts/AdminContext';
import AdminProtected from '@/components/admin/AdminProtected';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <AdminProtected>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-white dark:bg-gray-800 min-h-screen p-4">
              <h2 className="text-xl font-bold mb-6 text-gray-800 dark:text-white">Admin Dashboard</h2>
              <nav className="space-y-2">
                <a href="/admin" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Dashboard
                </a>
                <a href="/admin/hero" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Hero Section
                </a>
                <a href="/admin/about" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  About Section
                </a>
                <a href="/admin/social" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Social Links
                </a>
                <a href="/admin/executives" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Executives
                </a>
                <a href="/admin/gallery" className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                  Gallery
                </a>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
              {children}
            </div>
          </div>
        </div>
      </AdminProtected>
    </AdminProvider>
  );
} 