"use client";

import Login from "@/components/Login";
import SignUP from "@/components/SignUp";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen flex h-screen items-center">
        <Login />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}