import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { EstimatesProvider } from "@/contexts/EstimatesContext";

export const metadata: Metadata = {
  title: "손이가 웨딩 - 웨딩 비교견적 플랫폼",
  description: "손쉬운 결혼준비, 자꾸 손이 가는 웨딩 비교견적 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <AuthProvider>
          <EstimatesProvider>{children}</EstimatesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
