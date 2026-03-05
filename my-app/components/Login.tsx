'use client';
import { apiRequest } from '../lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUp from './SignUp';

type LoginResponse = {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    school_id: number;
    major_id: number;
    minor_id: number | null;
    enrolled_semester: number;
  };
  session?: {
    access_token: string;
  };
};

type UserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  school_id: number;
  major_id: number;
  minor_id: number | null;
  enrolled_semester: number;
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('userData');
    }
    return false;
  });
  const [showForm, setShowForm] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //   // Check if user is already logged in
  //   const storedUserId = localStorage.getItem('userId');
  //   if (storedUserId) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Validate credentials
  //   if (email && password) {
  //     // Create userData object for login
  //     const userData = {
  //       email,
  //       password,
  //       firstName: 'User', // Default value for login users
  //       lastName: '',
  //       school: '',
  //       major: '',
  //       minor: '',
  //       semester: '',
  //     };

  //     // Store user data in localStorage
  //     localStorage.setItem('userData', JSON.stringify(userData));
  //     localStorage.setItem('userId', email);
  //     console.log('Login successful:', { email, password });

  //     // Redirect to home page and reload
  //     window.location.href = '/home';
  //   } else {
  //     console.log('Login failed: Missing credentials');
  //     alert('Please enter both email and password');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // const data = await apiRequest<LoginResponse>('/api/auth/login', {
      //   method: 'POST',
      //   body: { email, password },
      // });

      // setIsLoggedIn(true);

      // localStorage.setItem('userId', String(data.user.id));
      // localStorage.setItem('userData', JSON.stringify(data.user));

      // router.push('/home');
      const loginData = await apiRequest<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      const token = loginData.session?.access_token;

      if (!token) {
        throw new Error('No token returned');
      }

      /* store token FIRST */
      localStorage.setItem('token', token);

      /* THEN fetch profile */
      const profile = await apiRequest<UserProfile>('/api/users/me');

      localStorage.setItem('userData', JSON.stringify(profile));
      localStorage.setItem('userId', profile.id);

      // router.push('/home');
      window.location.href = '/home';
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Login failed');
      }
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

  if (isSignUp) {
    return <SignUp onBack={() => setIsSignUp(false)} />;
  }

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
          Don&apos;t have an account?{' '}
          <button
            type="button"
            onClick={() => setIsSignUp(true)}
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
