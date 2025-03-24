import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { RegistrationEmailInput } from "../_components/Registration-Email-Input";
import { RegistrationPasswordInput } from "../_components/Registration-Password-Input";
import { getUserEmail, signUp } from "@/utils/authRequest";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "email is required" })
      .email({ message: "Invalid email. Use a format like example@email.com" }),
    password: z
      .string()
      .min(8, { message: "password min lenght 8" })
      .min(1, { message: "password is required" }),
    confirm: z
      .string()
      .min(1, { message: "Password confirmation is required" }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });
const RegistrationForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver :zodResolver(formSchema),
    defaultValues : {
      email : "",
      password : "",
      confirm : ""
    }
  })
  const [step, setStep] = useState<number>(1);
  const goLoginPage = () => {
    router.push("/login");
  };
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const data = await signUp({email:values.email, password:values.password});
    if (data?.status === 200) {
      router.push("/login");
    }
  };
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
    <div className="w-[40%] flex items-center justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
          {step === 1 ? (
          <RegistrationEmailInput
            setStep={setStep}
            form={form}
          />
        ) : (
          <RegistrationPasswordInput
            setStep={setStep}
            form={form}
          />
        )}
          </form>
        </FormProvider>
        <div className="flex w-full justify-center gap-4">
          <p>Already have an account?</p>
          <p onClick={goLoginPage} className="text-[#2563EB]">
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
export default RegistrationForm;
