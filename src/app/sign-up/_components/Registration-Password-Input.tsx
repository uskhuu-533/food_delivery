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
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type props = {
  setStep: (_step: number) => void;
  form: UseFormReturn<
    {
      email: string;
      password: string;
      confirm: string;
    },
    undefined
  >;
};

export const RegistrationPasswordInput = ({ setStep, form }: props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="gap-6 flex flex-col">
      <button
        onClick={() => setStep(1)}
        className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center"
      >
        <ChevronLeft />
      </button>
      <div>
        <p className="font-bold text-2xl">Create a strong password</p>
        <p className="text-[#71717A]">
          Create a strong password with letters, numbers.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  type={show ? "text" : "password"}
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
          name="confirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel></FormLabel>
              <FormControl>
                <Input
                  type={show ? "text" : "password"}
                  placeholder="Enter your email address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex gap-2">
        <input type="checkbox" onClick={() => setShow((prev) => !prev)} />
        <p>Show password</p>
      </div>
      <Button type="submit" className="w-full">
        let&apps;s go
      </Button>
    </div>
  );
};
