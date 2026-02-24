"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface RequireAuthProps {
  children: ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      const redirectUrl = encodeURIComponent(pathname);
      router.replace(`/login?redirect=${redirectUrl}`);
    }
  }, [isLoggedIn, router, pathname]);

  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
