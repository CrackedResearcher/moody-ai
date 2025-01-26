"use client";
import { loginUser } from "@/app/server/actions/authActions";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);
    const loadingToast = toast.loading("Logging you in.. wait");
    const response = await loginUser(formData);
    if(response.success){
      toast.update(loadingToast, {
        render: response.message,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      console.log("---taking you to thte dashboard----")
      router.push("/dashboard");
      console.log("---wlcm to the dashboard----")
    } else {
      toast.update(loadingToast, {
        render: response.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans p-8">
        <div className="w-full max-w-sm bg-gray-50 border border-gray-200 shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
            Login
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
            <button
              type="submit"
              className="rounded-sm border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-9 sm:h-10 px-6 my-3"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    );
  }