"use client";

import Login from "@/app/login/_features/Login";
import Image from "next/image";

export default function Home() {

  return (
    <div className="w-screen flex h-screen items-center">
      <Login />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
