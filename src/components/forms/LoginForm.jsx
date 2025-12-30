"use client";

import { signIn } from "next-auth/react";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { FaGoogle } from "react-icons/fa";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Button from "../ui/Button";
import ErrorMessage from "../ui/ErrorMessage";
import ShowPasswordButton from "../ui/ShowPasswordButton";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (res.ok) {
        alert("Login successful!");
      } else {
        alert("Login failed! Please check your credentials.");
      }

      console.log({ res });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="email">
          <span className="flex items-center gap-2">
            <AiOutlineMail className="text-primary" /> Email
          </span>
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="you@company.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Enter a valid email address",
            },
          })}
        />

        <ErrorMessage message={errors.email?.message} />
      </div>

      <div>
        <Label htmlFor="password">
          <span className="flex items-center gap-2">
            <AiOutlineLock className="text-primary" /> Password
          </span>
        </Label>

        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Minimum 8 characters" },
            })}
          />

          <ShowPasswordButton show={showPassword} setShow={setShowPassword} />
        </div>

        <ErrorMessage message={errors.password?.message} />
      </div>

      <div className="flex items-center justify-between">
        <Link href="/register" className="text-sm text-primary hover:underline">
          Create account
        </Link>
      </div>

      <Button disabled={loading} className="w-full">
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm" /> Signing
            in...
          </span>
        ) : (
          "Sign in"
        )}
      </Button>

      <div className="flex items-center gap-3 text-sm text-muted">
        <span className="flex-1 h-px bg-base-200" />
        <span>Or continue with</span>
        <span className="flex-1 h-px bg-base-200" />
      </div>

      <button
        onClick={() => signIn("google")}
        type="button"
        className="flex items-center justify-center gap-2 border rounded-lg px-3 py-2 hover:bg-base-200 w-full cursor-pointer"
        aria-label="Sign in with Google"
      >
        <FaGoogle className="w-5 h-5 text-red-500" />
        <span className="text-sm">Login with Google</span>
      </button>
    </form>
  );
};

export default LoginForm;
