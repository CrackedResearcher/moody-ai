"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { registerUser } from "@/app/server/actions/authActions";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Type-safe handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User Data:", formData);
    const loadingToast = toast.loading("Registering you.. wait");

    if (!formData.email) {
      toast.update(loadingToast, {
        render: "Please enter your email atleast!",
        type: "info",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }

    if (!formData.password) {
      toast.update(loadingToast, {
        render: "You gotta enter the password as well :)",
        type: "info",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }


    const response = await registerUser(formData);
    console.log("calling teh api to register user")

    if (response?.success) {
      toast.update(loadingToast, {
        render: "You have been successfully registered!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      router.push("/dashboard");
      return;
    } else {
      toast.update(loadingToast, {
        render: response?.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans p-8">
      <div className="w-full max-w-sm bg-gray-50 border border-gray-200 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-extrabold text-gray-800 text-center mb-4">
          Register
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Thank you for trying out{" "}
          <span className="font-semibold">MoodyAI</span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="text" className="text-sm text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
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

          {/* Register Button */}
          <button
            type="submit"
            className="rounded-sm border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-9 sm:h-10 px-6 my-3"
          >
            Register
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
