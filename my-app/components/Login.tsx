'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import SignUp from './SignUp';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showForm, setShowForm] = useState(false);
  // const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate credentials
    if (email && password) {
      // Create userData object for login
      const userData = {
        email,
        password,
        firstName: 'User', // Default value for login users
        lastName: '',
        school: '',
        major: '',
        minor: '',
        semester: '',
      };

      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userId', email);
      console.log('Login successful:', { email, password });

      // Redirect to home page and reload
      window.location.href = '/home';
    } else {
      console.log('Login failed: Missing credentials');
      alert('Please enter both email and password');
    }
  };

  const handleGoHome = () => {
    router.push('/home');
  };

  if (isLoggedIn) {
    return (
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Already Logged In</h1>
        <p className="mb-6 text-center text-gray-600">You are already logged in!</p>
        <button
          onClick={handleGoHome}
          className="w-full rounded-lg bg-blue-800 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  if (!showForm) {
    return (
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Welcome</h1>
        <p className="mb-6 text-center text-gray-600">Click below to login</p>
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg bg-blue-800 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    );
  }

  // if (isSignUp) {
  //   return <SignUp onBack={() => setIsSignUp(false)} />;
  // }

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-900 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-800 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>
        <p className="text-center text-sm">
          Don't have an account?{' '}
          <button
            type="button"
            // onClick={() => setIsSignUp(true)}
            onClick={() => router.push('/login/signup')}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
        <button
          type="button"
          onClick={() => setShowForm(false)}
          className="w-full rounded-lg bg-gray-400 py-2 font-semibold text-white transition hover:bg-gray-500"
        >
          Back
        </button>
      </form>
    </div>
  );
}
