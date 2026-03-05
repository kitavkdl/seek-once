'use client';

import { useState } from 'react';
import { apiRequest } from '../lib/api';
import { SCHOOL_ID, MAJOR_ID, MINOR_ID, SEMESTER_ID } from '../lib/maps';

interface SignUpProps {
  onBack: () => void;
}

export default function SignUp({ onBack }: SignUpProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [school, setSchool] = useState('');
  const [major, setMajor] = useState('');
  const [minor, setMinor] = useState('');
  const [semester, setSemester] = useState('');

  const schoolMajors: Record<string, string[]> = {
    'Stonybrook University': [
      'Applied Mathematics and Statistics',
      'Business Management',
      'Computer Science',
      'Electrical Engineering',
      'Mechanical Engineering',
      'Technological Systems Management',
    ],
    'Utah University': [
      'Accounting',
      'Communication',
      'Electrical & Computer Engineering',
      'Film & Media Arts',
      'Games',
      'Information Systems',
      'Psychology',
      'Urban Ecology',
    ],
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (firstName && lastName && email && password && school && major && semester) {
  //     const userData = { firstName, lastName, email, password, school, major, minor, semester };
  //     localStorage.setItem('userData', JSON.stringify(userData));
  //     localStorage.setItem('userId', email);
  //     console.log('Sign up successful:', userData);

  //     // Redirect to home page
  //     window.location.href = '/home';
  //   } else {
  //     alert('Please fill in all required fields');
  //   }
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email,
      password,
      school_id: SCHOOL_ID[school],
      major_id: MAJOR_ID[`${school}|${major}`],
      minor_id: minor ? MINOR_ID[`${school}|${minor}`] : null, // keep null for now
      enrolled_semester: SEMESTER_ID[`${school}|${semester}`],
      first_name: firstName,
      last_name: lastName,
    };

    if (!payload.school_id || !payload.major_id || !payload.enrolled_semester) {
      alert('ID mapping failed. Check your maps.ts (school/major/semester).');
      return;
    }

    try {
      const data = await apiRequest('/api/auth/signup', {
        method: 'POST',
        body: payload,
      });

      console.log('Signup success:', data);
      onBack(); // go back to login
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

  const formatName = (value: string) =>
    value
      .split(' ')
      .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ''))
      .join(' ');

  const isFormValid = Boolean(
    firstName && lastName && email && password && school && major && semester,
  );

  return (
    <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
      <h1 className="mb- text-center text-2xl font-bold">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(formatName(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(formatName(e.target.value))}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            required
          />
        </div>
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
        <div>
          <label htmlFor="school" className="mb-2 block text-sm font-medium">
            School
          </label>
          <select
            id="school"
            value={school}
            onChange={(e) => {
              setSchool(e.target.value);
              setMajor('');
              setMinor('');
            }}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            required
          >
            <option value="">Select a school</option>
            <option value="Stonybrook University">Stonybrook University</option>
            <option value="Utah University">Utah University</option>
          </select>
        </div>
        <div>
          <label htmlFor="major" className="mb-2 block text-sm font-medium">
            Major
          </label>
          {school && schoolMajors[school] ? (
            <select
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              required
            >
              <option value="">Select a major</option>
              {schoolMajors[school].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              id="major"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              placeholder="Enter your major"
              required
            />
          )}
        </div>

        <div>
          <label htmlFor="semester" className="mb-2 block text-sm font-medium">
            Enrolled Semester
          </label>
          <select
            id="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            required
          >
            <option value="">Select semester</option>
            <option value="Spring 2024">Spring 2024</option>
            <option value="Fall 2024">Fall 2024</option>
            <option value="Spring 2025">Spring 2025</option>
            <option value="Fall 2025">Fall 2025</option>
            <option value="Spring 2026">Spring 2026</option>
          </select>
        </div>

        <div>
          <label htmlFor="minor" className="mb-2 block text-sm font-medium">
            Minor (optional)
          </label>
          {school && schoolMajors[school] ? (
            <select
              id="minor"
              value={minor}
              onChange={(e) => setMinor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
            >
              <option value="">No minor / Select optional minor</option>
              {schoolMajors[school]
                .filter((m) => m !== major)
                .map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
            </select>
          ) : (
            <input
              type="text"
              id="minor"
              value={minor}
              onChange={(e) => setMinor(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-800 focus:outline-none"
              placeholder="Enter your minor (optional)"
            />
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full rounded-lg py-2 font-semibold text-white transition ${
            isFormValid ? 'bg-blue-800 hover:bg-blue-700' : 'cursor-not-allowed bg-gray-300'
          }`}
        >
          Sign Up
        </button>
        <button
          type="button"
          onClick={onBack}
          className="w-full rounded-lg bg-gray-400 py-2 font-semibold text-white transition hover:bg-gray-500"
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
