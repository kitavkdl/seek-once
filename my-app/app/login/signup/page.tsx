'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);

  function validate() {
    if (!name.trim()) return 'Name is required.';
    if (!email.includes('@')) return 'Please enter a valid email.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    if (password !== confirm) return 'Passwords do not match.';
    return null;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setError(null);
    // Placeholder: replace with real signup call
    console.log('Signup data:', { name, email });
    // Redirect to login or home after signup
    router.push('/login');
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <label style={{ display: 'block', marginBottom: 8 }}>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        <label style={{ display: 'block', marginBottom: 8 }}>
          Confirm Password
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            style={{ display: 'block', width: '100%', padding: 8, marginTop: 4 }}
          />
        </label>

        {error && <div style={{ color: '#b00020', marginBottom: 8 }}>{error}</div>}

        <button type="submit" style={{ padding: '8px 12px' }}>
          Create account
        </button>
      </form>
    </div>
  );
}
