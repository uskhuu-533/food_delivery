"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthenticationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>...loading</div>;
  }

  return children;
};
