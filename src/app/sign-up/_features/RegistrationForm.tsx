import { useState } from "react";

import { useRouter } from "next/navigation";
import { RegistrationEmailInput } from "../_components/Registration-Email-Input";
import { RegistrationPasswordInput } from "../_components/Registration-Password-Input";

type User = {
  email: string;
  password: string;
};
const RegistrationForm = () => {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [user, setUser] = useState<User>({ email: "", password: "" });
  const goLoginPage = () => {
    router.push("/login");
  };

  const postUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const text = await response.text();
      console.log("Response status:", response.status);
      console.log("Response text:", text);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error posting user:", err);
    } finally {
      router.push(`/login`);
    }
  };

  return (
    <div className="w-[40%] flex items-center justify-center">
      <div className="w-[80%] flex flex-col h-fit gap-6">
        {step === 1 ? (
          <RegistrationEmailInput
            user={user}
            setUser={setUser}
            setStep={setStep}
          />
        ) : (
          <RegistrationPasswordInput
            user={user}
            setUser={setUser}
            setStep={setStep}
            postUser={postUser}
          />
        )}
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
