"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import RegistrationForm from "./_features/RegistrationForm";
import { getUserEmail } from "@/utils/authRequest";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const getEmail = async () => {
      try {
        const response = await getUserEmail()
        if (response?.status === 200) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getEmail();
  }, [router]);

  return (
    <div className="w-screen flex h-screen items-center">
      <RegistrationForm />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
