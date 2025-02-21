"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
type props = {
  setStep: (_step: number) => void;
  postUser: Function;
  setUser: (_user: User) => void;
  user: User;
};
type User = {
  email: string;
  password: string;
};
const Password = ({ setStep, postUser, setUser, user }: props) => {
  const router = useRouter();

  const [confirm, setConfirm] = useState<string>("");
  const [isPasswordError, SetErrorPassword] = useState<string | undefined>();
  const [showPass, setShow] = useState(false);
  const goLoginPage = () => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;
    if (user.password.length !== 0) {
      if (user.password === confirm) {
        postUser();
      } else {
        SetErrorPassword("!match");
      }
    } else {
      SetErrorPassword("weak");
    }
  };

  return (
    <>
      {" "}
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
      <form className="flex flex-col gap-4">
        <input
          type={showPass == true ? "text" : "password"}
          className="h-9 pl-4 w-full border rounded-md"
          placeholder="new-password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          style={{
            borderColor: isPasswordError === "weak" ? "red" : "#71717A",
          }}
        />
        <div className="flex flex-col">
          <input
            type={showPass == true ? "text" : "password"}
            placeholder="confirm-password"
            className="h-9 pl-4 w-full border rounded-md"
            onChange={(e) => setConfirm(e.target.value.toString())}
            value={confirm}
            style={{
              borderColor: isPasswordError === "!match" ? "red" : "#71717A",
            }}
          />
          {isPasswordError && (
            <label className="text-red-600 text-sm mt-2">
              {isPasswordError == "weak" &&
                "Weak password. Use numbers and symbols"}
              {isPasswordError == "!match" &&
                "Those password did’t match, Try again"}
            </label>
          )}
        </div>
        <div className="flex gap-2">
          <input type="checkbox" onClick={() => setShow((prev) => !prev)} />
          <p>Show password</p>
        </div>
      </form>
      <button
        onClick={goLoginPage}
        className="py-[4px] w-full border rounded-md"
      >
        let's go
      </button>
    </>
  );
};
export default Password;
