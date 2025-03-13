'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminProtected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('aefd-gbza-fkew-dsxz') === 'true';

  useEffect(() => {
    // Check if user is admin
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
} 