"use client";

import Login from "@/app/login/_features/Login";
import { getUserEmail } from "@/utils/authRequest";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
  }, []);

  return (
    <div className="w-screen flex h-screen items-center">
      <Login />
      <Image src="/home.webp" width={856} height={904} alt="home" />
    </div>
  );
}
