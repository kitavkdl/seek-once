'use client';

import './globals.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthProvider, useAuth } from '@/lib/AuthContext';

function LayoutContent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <>
      <div className="flex items-center justify-between bg-gray-900 px-6 py-4">
        <div className="flex gap-4">
          <Link href="/utilities/course-coordinator">
            <button className="rounded-md bg-blue-900 px-4 py-2 text-white hover:bg-blue-800">
              CC
            </button>
          </Link>

          <Link href="/utilities/gpa-calculator">
            <button className="rounded-md bg-gray-700 px-4 py-2 text-white hover:bg-gray-600">
              GPAC
            </button>
          </Link>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <span className="text-2xl">👤</span>
            <span className="text-lg font-semibold text-white">{user.firstName}</span>
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {children}
    </>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LayoutContent>{children}</LayoutContent>
        </AuthProvider>
      </body>
    </html>
  );
}
