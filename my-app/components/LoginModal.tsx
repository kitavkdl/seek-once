'use client';
import { apiRequest } from '../lib/api';
import { useState } from 'react';

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

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (email && password) {
  //     localStorage.setItem('userId', email);
  //     console.log('Login successful:', { email, password });
  //     window.location.href = '/';
  //   } else {
  //     alert('Please enter both email and password');
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = await apiRequest<LoginResponse>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      });

      localStorage.setItem('userId', String(data.user.id));
      localStorage.setItem('userData', JSON.stringify(data.user));

      window.location.href = '/';
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('Login failed');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
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
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
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
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-400 py-2 font-semibold text-white transition hover:bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
