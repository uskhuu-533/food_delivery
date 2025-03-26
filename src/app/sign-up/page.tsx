"use client";

import Image from "next/image";
import RegistrationForm from "./_features/RegistrationForm";

export default function Home() {
  return (
    <div className="w-screen flex h-screen items-center">
      <RegistrationForm />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
