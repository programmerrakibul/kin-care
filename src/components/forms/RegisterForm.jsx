"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Label from "../ui/Label";
import {
  AiOutlineIdcard,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Link from "next/link";
import ErrorMessage from "../ui/ErrorMessage";
import ShowPasswordButton from "../ui/ShowPasswordButton";
import { postUser } from "@/app/actions/server/auth";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await postUser(data);

      if (res?.insertedId) {
        alert("Registration successful! Please log in.");
      } else {
        alert("Registration failed! User may already exist.");
      }
    } catch (err) {
      console.error("Error during registration:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* NID Number */}
        <div>
          <Label htmlFor="nid">
            <span className="flex items-center gap-2">
              <AiOutlineIdcard className="text-primary" />
              NID Number
            </span>
          </Label>

          <Input
            id="nid"
            type="number"
            placeholder="Enter your NID number"
            {...register("nid", {
              required: "NID number is required",
            })}
          />

          <ErrorMessage message={errors.nid?.message} />
        </div>

        {/* Name */}
        <div>
          <Label htmlFor="name">
            <span className="flex items-center gap-2">
              <AiOutlineUser className="text-primary" />
              Full Name
            </span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter your full name"
            {...register("name", {
              required: "Full name is required",
              validate: (value) =>
                !value.trim() ? "Name cannot be empty" : true,
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
              maxLength: {
                value: 50,
                message: "Name must not exceed 50 characters",
              },
            })}
          />

          <ErrorMessage message={errors.name?.message} />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">
            <span className="flex items-center gap-2">
              <AiOutlineMail className="text-primary" />
              Email Address
            </span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email address"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Please enter a valid email address",
              },
            })}
          />

          <ErrorMessage message={errors.email?.message} />
        </div>

        {/* Contact */}
        <div>
          <Label htmlFor="contact">
            <span className="flex items-center gap-2">
              <AiOutlinePhone className="text-primary" />
              Contact Number
            </span>
          </Label>
          <Input
            id="contact"
            type="tel"
            placeholder="Enter your contact number"
            {...register("contact", {
              required: "Contact number is required",
              validate: (value) =>
                !value.trim() ? "Contact number cannot be empty" : true,
            })}
          />

          <ErrorMessage message={errors.contact?.message} />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">
            <span className="flex items-center gap-2">
              <AiOutlineLock className="text-primary" />
              Password
            </span>
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter a strong password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]/,
                  message:
                    "Password must contain uppercase, lowercase, number and special character",
                },
              })}
            />

            <ShowPasswordButton show={showPassword} setShow={setShowPassword} />
          </div>

          <ErrorMessage message={errors.password?.message} />
        </div>

        {/* Submit Button */}
        <Button disabled={loading} className="btn-block">
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </>
  );
};

export default RegisterForm;
