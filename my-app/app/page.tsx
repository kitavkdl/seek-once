//to redirect users based on login status.
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Chaewon() {
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return null;
}
