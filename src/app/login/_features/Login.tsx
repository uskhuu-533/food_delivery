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
import { toast } from "sonner";
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
    const response = await login(values);
    console.log(response);

    if (response?.data === "Wrong password or email") {
      console.log("wrong password");
      form.setError("password", { message: response.data });
    } else if (response?.data.role !== "ADMIN") {
      console.log("role error");

      toast(
        <div className="flex gap-2 w-full h-full items-center">
          <p>
            {" "}
            Access denied. You do not have the necessary permissions to access
            this page. Please use the client portal instead.
          </p>
          <a href="https://food-delivery-user-lemon.vercel.app/">
            <Button className="rounded-full">Client page</Button>
          </a>{" "}
        </div>,
        {
          description: "",
          position: "top-center",
        }
      );
    } else if (response?.status === 200 && response.data.role === "ADMIN") {
      localStorage.setItem("token", response.data.token);
      router.push("/");
    }
  };

  return (
    <div className="w-[40%] flex items-center justify-center gap-4">
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
          <form
            onSubmit={form.handleSubmit(checkPassword)}
            className="flex flex-col gap-4"
          >
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
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <label className="flex gap-2 cursor-pointer">
              <input type="checkbox" className="cursor-pointer" onClick={() => setShow((prev) => !prev)} />
              <p>Show password</p>
            </label>
            <Button type="submit" className="py-[4px] w-full border rounded-md">
              let&apos;s go
            </Button>
          </form>
        </FormProvider>

        <div className="flex w-full justify-center gap-4">
          <p>Don’t have an account?</p>
          <button
            onClick={() => router.push("/sign-up")}
            className="text-[#2563EB] cursor-pointer"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
