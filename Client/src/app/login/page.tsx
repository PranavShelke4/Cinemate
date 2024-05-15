"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation"; // Updated import for router

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter(); // Use useRouter hook from next/navigation

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({ email, password });
      const response = await axios.post(
        "http://localhost:8080/signin",
        body,
        config
      );
      console.log("Login Successful:", response.data);

      // Redirect to the dashboard
      router.push("/"); // Redirect to a dashboard or another appropriate page
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data : "Unknown error"
      );
    }
  };

  return (
    <div className="max-h-screen flex min-h-screen flex-col items-center justify-center primary p-4 md:p-0 sm:p-0 bg-gray-900">
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Welcome back to Cinemate
        </h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-200"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-200"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log in
          </button>
        </form>
        <div className="mt-4 flex justify-center text-gray-400">OR</div>
        <div className="flex flex-col sm:flex-row justify-between mt-4">
          <button className="px-6 py-2 border border-gray-600 text-gray-200 rounded-md hover:bg-gray-700 mb-2 sm:mb-0">
            Sign in with Google
          </button>
          <button className="px-6 py-2 border border-gray-600 text-gray-200 rounded-md hover:bg-gray-700">
            Sign in with Apple
          </button>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          <Link
            href="/forgot-password"
            className="text-blue-500 hover:text-blue-400"
          >
            Forgot password?
          </Link>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          New to Cinemate?{" "}
          <Link href="/signup" className="text-blue-500 hover:text-blue-400">
            Sign up now.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
