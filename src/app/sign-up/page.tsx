"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegistrationForm from "./_features/RegistrationForm";

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
      <RegistrationForm />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
