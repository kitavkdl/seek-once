'use client';

import { useRouter } from 'next/navigation';
import SignUp from '@/components/SignUp';
// export default function SignUpPage() {
//   return <SignUp />;
// }
export default function SignUpPage() {
  const router = useRouter();

  return <SignUp onBack={() => router.push('/login')} />;
}
