"use client";

import LoaderAuth from "@/components/LoaderAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const path = usePathname();
  useEffect(() => {
    const token = localStorage.getItem("token");    
    if (!token) {
      if (path === "/sign-up") {
        setLoading(false);
        return;
      }
      router.push("/login");
      
    }

    setLoading(false);
  }, [router, path]);

  if (loading) {
    return <LoaderAuth />;
  }

  return children;
};
