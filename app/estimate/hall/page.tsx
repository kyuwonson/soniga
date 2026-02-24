"use client";

import Header from "@/components/Header";
import Link from "next/link";
import RequireAuth from "@/components/RequireAuth";

export default function HallPage() {
  return (
    <RequireAuth>
    <main className="min-h-screen bg-ivory">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            홀
          </h1>
          <p className="text-lg text-gray-600 mb-8">준비 중인 페이지입니다</p>
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-pink-dusty text-white rounded-lg hover:bg-pink-soft transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </main>
    </RequireAuth>
  );
}
