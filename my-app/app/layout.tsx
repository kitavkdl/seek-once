'use client';

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [userFirstName, setUserFirstName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        setUserFirstName(parsed.firstName);
        setIsLoggedIn(true);
      } catch (e) {
        console.error('Failed to parse userData:', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserFirstName('');
    router.push('/login');
    console.log('log out successful');
  };

  return (
    <html lang="en">
      <body>
        <div className="flex items-center justify-between bg-gray-900 px-6 py-4">
          <div className="flex gap-4">
            <Link href="/utilities/course-coordinator">
              <button className="rounded-md bg-blue-900 px-4 py-2 text-white transition-all hover:bg-blue-800 active:scale-95">
                CC
              </button>
            </Link>
            <Link href="/utilities/gpa-calculator">
              <button className="rounded-md bg-gray-700 px-4 py-2 text-white transition-all hover:bg-gray-600 active:scale-95">
                GPAC
              </button>
            </Link>
          </div>

          {isLoggedIn && userFirstName && (
            <div className="flex items-center gap-3">
              <span className="text-2xl">👤</span>
              <span className="text-lg font-semibold text-white">{userFirstName}</span>
              <button
                onClick={handleLogout}
                className="rounded-md bg-red-600 px-4 py-2 text-white transition-all hover:bg-red-700 active:scale-95"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
