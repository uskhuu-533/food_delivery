"use client";

import Image from "next/image";
import RegistrationForm from "./_features/RegistrationForm";
import { UserProvider } from "@/provider/User-Provider";

export default function Home() {
  return (
    <UserProvider>
    <div className="w-screen flex h-screen items-center">
      <RegistrationForm />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
    </UserProvider>
  );
}
