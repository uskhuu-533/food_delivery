"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/utils/authRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "email is required" })
    .email({ message: "Invalid email. Use a format like example@email.com" }),
  password: z
    .string()
    .min(8, { message: "password min lenght 8" })
    .min(1, { message: "password is required" }),
});
const Login = () => {
  const router = useRouter();

  const [showPass, setShow] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const checkPassword = async (values: z.infer<typeof formSchema>) => {
    const data = await login(values);
    if (data?.status === 200) {
      localStorage.setItem("token", data.data);
      router.push("/");
    }
  };

  return (
    <div className="w-[40%] flex items-center justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        <button className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
          <ChevronLeft />
        </button>
        <div>
          <p className="font-bold text-2xl">Log in</p>
          <p className="text-[#71717A]">
            Log in to enjoy your favorite dishes.
          </p>
        </div>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(checkPassword)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input
                      type={showPass ? "text" : "password"}
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <input type="checkbox" onClick={() => setShow((prev) => !prev)} />
              <p>Show password</p>
            </div>
            <Button type="submit" className="py-[4px] w-full border rounded-md">
              let&apos;s go
            </Button>
          </form>
        </FormProvider>

        <div className="flex w-full justify-center gap-4">
          <p>Don’t have an account?</p>
          <p onClick={() => router.push("/sign-up")} className="text-[#2563EB]">
            Sign up
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
