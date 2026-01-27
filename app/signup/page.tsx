"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { signup } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // 유효성 검사
    if (!email || !username || !password || !confirmPassword || !name) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (password.length < 6) {
      setError("비밀번호는 최소 6자 이상이어야 합니다.");
      return;
    }

    if (username.length < 3) {
      setError("아이디는 최소 3자 이상이어야 합니다.");
      return;
    }

    // 실제로는 서버 API 호출이 필요하지만, 현재는 로컬에서 처리
    try {
      // 회원가입 후 자동 로그인
      signup(username, password, name, email);
      router.push("/");
    } catch (err: any) {
      setError(err.message || "회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <main className="min-h-screen bg-ivory">
      <Header />
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-white rounded-lg shadow-sm border border-pink-pale p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 text-center">
            회원가입
          </h1>
          <p className="text-gray-600 text-center mb-8">
            손이가 웨딩과 함께 시작하세요
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                이름
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-pink-pale rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                placeholder="이름을 입력하세요"
                required
              />
            </div>

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
                placeholder="아이디를 입력하세요 (최소 3자)"
                required
                minLength={3}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-pink-pale rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                placeholder="이메일을 입력하세요"
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
                placeholder="비밀번호를 입력하세요 (최소 6자)"
                required
                minLength={6}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                비밀번호 확인
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-pink-pale rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-dusty focus:border-transparent"
                placeholder="비밀번호를 다시 입력하세요"
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-pink-dusty text-white py-3 rounded-lg font-medium hover:bg-pink-soft transition-colors"
            >
              회원가입
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              이미 계정이 있으신가요?{" "}
              <Link
                href="/login"
                className="text-pink-dusty hover:text-pink-soft font-medium"
              >
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
