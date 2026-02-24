"use client";

import Header from "@/components/Header";
import { HOME_PATH } from "@/lib/paths";
import RequireAuth from "@/components/RequireAuth";

export default function DvdPage() {
  return (
    <RequireAuth>
    <main className="min-h-screen bg-ivory">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
            DVD
          </h1>
          <p className="text-lg text-gray-600 mb-8">준비 중인 페이지입니다</p>
          <a
            href={HOME_PATH}
            className="inline-block px-6 py-3 bg-pink-dusty text-white rounded-lg hover:bg-pink-soft transition-colors"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </main>
    </RequireAuth>
  );
}
