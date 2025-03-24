"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

import { UseFormReturn } from "react-hook-form";
type props = {
  setStep: (_step: number) => void;
  form : UseFormReturn<{
    email: string;
    password: string;
    confirm: string;
}, undefined>
};



export const RegistrationEmailInput = ({ setStep, form}: props) => {


  const jumpToPassword = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(form.watch('email'))) {
      setStep(2);
    } 
  };


  return (
    <div className="flex flex-col gap-6">
      <button className="w-9 h-9 border border-[#E4E4E7] rounded-md flex items-center justify-center">
        <ChevronLeft />
      </button>
      <div>
        <p className="font-bold text-2xl">Create your account</p>
        <p className="text-[#71717A]">
          Sign up to explore your favorite dishes
        </p>
      </div>
      <FormField 
      control={form.control}
      name="email"
      render={({field})=>(
        <FormItem>
          <FormLabel></FormLabel>
          <FormControl>
            <Input 
            type="email"
            placeholder="Enter your email address"
            {...field}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
      />
      <Button
        onClick={jumpToPassword}
        className="py-[4px] w-full border rounded-md"
      >
        let&apos;s go
      </Button>
    </div>
  );
};
