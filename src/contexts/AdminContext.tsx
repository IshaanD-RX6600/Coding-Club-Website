'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  signIn: (password: string) => Promise<void>;
  signOut: () => void;
}

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  loading: true,
  signIn: async () => {},
  signOut: () => {},
});

export const useAdmin = () => useContext(AdminContext);

// In a real app, this would be an environment variable
const ADMIN_PASSWORD = 'codingclub2024';

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const isLoggedIn = localStorage.getItem('aefd-gbza-fkew-dsxz') === 'true';
    setIsAdmin(isLoggedIn);
    setLoading(false);
  }, []);

  const signIn = async (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('aefd-gbza-fkew-dsxz', 'true');
    } else {
      throw new Error('Invalid password');
    }
  };

  const signOut = () => {
    setIsAdmin(false);
    localStorage.removeItem('aefd-gbza-fkew-dsxz');
  };

  return (
    <AdminContext.Provider value={{ isAdmin, loading, signIn, signOut }}>
      {children}
    </AdminContext.Provider>
  );
} 