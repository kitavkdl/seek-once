'use client';

import { useRouter } from 'next/navigation';

export default function CourseCoordinatorPage() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/home');
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">Course Coordinator</h1>
          <button
            onClick={handleGoHome}
            className="rounded-md bg-blue-900 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-800 active:scale-95"
          >
            Home
          </button>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-md">
          <p className="text-lg text-gray-600">
            Plan your courses and manage your academic schedule here.
          </p>
        </div>
      </div>
    </main>
  );
}
