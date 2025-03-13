import { AdminProvider } from '@/contexts/AdminContext';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <ThemeProvider>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          {children}
        </div>
      </ThemeProvider>
    </AdminProvider>
  );
} 