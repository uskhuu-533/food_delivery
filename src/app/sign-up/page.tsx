"use client";

import SignUP from "@/components/SignUp";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);

  return (
    <div className="w-screen flex h-screen items-center">
      <SignUP />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
