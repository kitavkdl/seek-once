'use client';
//로그인 후에 welcome 하는애 (실질적 홈페이지)

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (!storedData) {
      router.push('/login');
      return;
    }
    try {
      setUserData(JSON.parse(storedData));
    } catch (e) {
      router.push('/login');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold">Welcome, {userData?.firstName}! 👤</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* User Profile Card */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">User Profile</h2>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Name:</span> {userData?.firstName}{' '}
                {userData?.lastName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userData?.email}
              </p>
              <p>
                <span className="font-semibold">School:</span> {userData?.school}
              </p>
              <p>
                <span className="font-semibold">Major:</span> {userData?.major}
              </p>
              {userData?.minor && (
                <p>
                  <span className="font-semibold">Minor:</span> {userData?.minor}
                </p>
              )}
              <p>
                <span className="font-semibold">Semester:</span> {userData?.semester}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-2xl font-bold">Quick Actions</h2>
            <div className="space-y-3">
              <a
                href="/utilities/course-coordinator"
                className="block w-full rounded-lg bg-blue-900 py-3 text-center font-semibold text-white transition hover:bg-blue-800"
              >
                📚 Course Coordinator
              </a>
              <a
                href="/utilities/gpa-calculator"
                className="block w-full rounded-lg bg-gray-700 py-3 text-center font-semibold text-white transition hover:bg-gray-600"
              >
                📊 GPA Calculator
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
