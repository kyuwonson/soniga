"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 간단한 유효성 검사
    if (!username || !password) {
      setError("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    // 실제로는 서버 API 호출이 필요하지만, 현재는 로컬에서 처리
    try {
      login(username, password);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-sm border border-pink-pale p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            로그인
          </h1>
          <p className="text-gray-600 text-center mb-8">
            손이가 웨딩에 오신 것을 환영합니다
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                아이디
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-pink-pale rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-pink-pale rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-dusty text-white py-3 rounded-lg font-medium hover:bg-pink-soft transition-colors"
            >
              로그인
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="text-pink-dusty hover:text-pink-soft font-medium"
              >
                회원가입
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
