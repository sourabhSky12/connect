"use client";

import { useState } from "react";
import Image from "next/image";

const LoginForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", email);
  };

  return (
    <div className="min-h-screen bg-[#008641] flex items-center justify-center relative overflow-hidden ">
      {/* Background Decorative Shapes */}
      <div className="absolute left-10 top-1/4 opacity-10">
        <div className="w-40 h-40 bg-white/10 rounded-full"></div>
      </div>

      <div className="absolute right-[-100px] bottom-[-100px] opacity-10">
        <div className="w-[300px] h-[300px] bg-white/10 rounded-full"></div>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg px-18 py-10 w-full max-w-lg z-10 mx-2"
      >
        {/* Logo Only */}
        <div className="mb-6 flex justify-start">
          <Image src="/Logo.svg" alt="Logo" width={150} height={50} />
        </div>

        {/* Welcome Text */}
        <h2 className="text-[36px] font-bold text-gray-900 mb-6">Welcome back</h2>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-[18px] mb-1" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#008641] focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#008641] hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
