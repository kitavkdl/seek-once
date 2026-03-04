'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LoginModal from './LoginModal';

export default function UserProfile() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUserId = localStorage.getItem('userId');
    const storedUserData = localStorage.getItem('userData');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      if (storedUserData) {
        try {
          const parsed = JSON.parse(storedUserData);
          if (parsed && parsed.firstName) setFirstName(parsed.firstName);
        } catch (e) {
          // ignore parse errors
        }
      }
    }
  }, []);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    // Update state
    setIsLoggedIn(false);
    setUserId('');
    setFirstName('');
    setIsDropdownOpen(false); // Close dropdown after logout
    // Redirect to login page
    router.push('/login');
  };

  return (
    <>
      <div className="flex items-center gap-3 rounded-lg bg-gray-200 px-4 py-2">
        {/* User Avatar/Image */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 font-bold text-white">
          👤
        </div>

        {/* User Name or Login Text */}
        {isLoggedIn ? (
          <div className="group relative">
            <span
              className="cursor-pointer text-sm font-medium text-gray-800"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {firstName || userId}
            </span>
            {/* Dropdown Menu */}
            <div
              className={`ring-opacity-5 absolute top-full right-0 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ${isDropdownOpen || 'hidden'} group-hover:block`}
            >
              <Link
                href="/mypage"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsDropdownOpen(false)} // Close dropdown on click
              >
                마이페이지
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                }}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                로그아웃
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLoginModal(true)}
            className="cursor-pointer text-sm font-medium text-blue-900 transition hover:text-blue-900"
          >
            Login
          </button>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
