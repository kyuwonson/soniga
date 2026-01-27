"use client";

import Header from "@/components/Header";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyEstimatesPage() {
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-sm border border-pink-pale p-8 md:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                내 견적함
              </h1>
              <p className="text-gray-600">
                {user?.name}님의 견적 내역입니다
              </p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 text-sm text-gray-700 hover:text-pink-dusty transition-colors"
            >
              홈으로
            </Link>
          </div>

          <div className="border-t border-pink-pale pt-8">
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-gray-600 mb-4">저장된 견적이 없습니다</p>
              <p className="text-sm text-gray-500 mb-6">
                견적을 조회하고 저장하면 여기에 표시됩니다
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
