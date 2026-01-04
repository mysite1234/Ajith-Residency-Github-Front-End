'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/organisms/Header';
import Sidebar from '@/components/organisms/Sidebar';
import { Toaster } from 'sonner';
import AuthPage from '@/app/login/page';

export default function MainLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const auth =
      localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(auth);
    setIsLoading(false);
  }, []);

  // ⏳ Wait until client is ready
  if (isLoading) {
    return null; // or loader
  }

  // 🔐 Render Login directly
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    avatar:
      'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
        />

        <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="p-4 sm:p-6">
            {children}
          </div>
        </main>
      </div>

      <Toaster
        position="top-right"
        richColors
        closeButton
        expand
        visibleToasts={5}
      />
    </div>
  );
}
