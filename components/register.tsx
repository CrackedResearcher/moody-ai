"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { registerUser, authResponse } from "@/app/server/actions/authActions";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    console.log("User Data:", formData);
  
    // Validate form data
    if (!formData.email) {
      toast.error('Please enter your email at least!');
      setLoading(false);
      return;
    }
  
    if (!formData.password) {
      toast.error('You gotta enter the password as well :)');
      setLoading(false);
      return;
    }
  
    const registerPromise: Promise<authResponse> = registerUser(formData);
  
    toast.promise(
      registerPromise,
      {
        loading: 'Registering you.. wait',
        success: (data: authResponse) => {
          router.push('/dashboard');
          return "Welcome! You've been registered successfully.";
        },
        error: (err: Error) => {
          console.error('Registration failed:', err);
          return 'Failed to register. Please try again later.'; 
        },
      }, 
      {
        success: {
          duration: 7000,
          icon: '🔥',
        },
      }
    );
  
    setLoading(false);
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center bg-background font-sans p-8">
      <div className="w-full max-w-sm bg-card border border-gray-300 dark:border-gray-600 shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-extrabold text-primary-foreground dark:text-white text-center mb-4">
          Register
        </h1>
        <p className="text-sm text-primary-foreground dark:text-white text-center mb-6">
          Thank you for trying out{" "}
          <span className="font-semibold">MoodyAI</span>
        </p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm text-primary-foreground dark:text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="px-4 py-2 border bg-white dark:bg-card border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm text-primary-foreground dark:text-white">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="px-4 py-2 border bg-white dark:bg-card border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm text-primary-foreground dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className="px-4 py-2 border bg-white dark:bg-card border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
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
            className={`rounded-sm border border-solid border-transparent transition-colors flex items-center justify-center bg-white text-primary-foreground gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-9 sm:h-10 px-6 my-3 ${
              loading ? "opacity-90 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 200 200"
                className="h-5 w-5 text-primary-foreground"
              >
                <circle
                  fill="#000000"
                  stroke="#000000"
                  strokeWidth="15"
                  r="15"
                  cx="40"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  ></animate>
                </circle>
                <circle
                  fill="#793BFF"
                  stroke="#793BFF"
                  strokeWidth="15"
                  r="15"
                  cx="100"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  ></animate>
                </circle>
                <circle
                  fill="#793BFF"
                  stroke="#793BFF"
                  strokeWidth="15"
                  r="15"
                  cx="160"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  ></animate>
                </circle>
              </svg>
            ) : (
              "Register"
            )}
          </button>
        </form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
