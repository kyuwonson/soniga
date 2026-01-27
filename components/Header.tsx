"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout, user } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-ivory border-b border-pink-pale">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            {/* Logo Icon */}
            <div className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-pink-dusty rounded-full">
              <svg
                className="w-6 h-6 md:w-7 md:h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-pink-dusty">
              손이가 웨딩
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                <span className="text-gray-700 text-sm font-medium">
                  {user?.name}님 반가워요!
                </span>
                <Link
                  href="/my-estimates"
                  className="text-gray-700 hover:text-pink-dusty transition-colors"
                >
                  내 견적함
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-pink-dusty transition-colors"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-700 hover:text-pink-dusty transition-colors"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="text-gray-700 hover:text-pink-dusty transition-colors"
                >
                  회원가입
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-pink-dusty"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="메뉴 열기"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-pink-pale">
            <nav className="flex flex-col space-y-3 pt-4">
              {isLoggedIn ? (
                <>
                  <div className="text-gray-700 text-sm font-medium py-2 px-2">
                    {user?.name}님 반가워요!
                  </div>
                  <Link
                    href="/my-estimates"
                    className="text-gray-700 hover:text-pink-dusty transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    내 견적함
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-pink-dusty transition-colors py-2"
                  >
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-gray-700 hover:text-pink-dusty transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    로그인
                  </Link>
                  <Link
                    href="/signup"
                    className="text-gray-700 hover:text-pink-dusty transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    회원가입
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
