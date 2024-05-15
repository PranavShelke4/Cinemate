"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    gender: "Male",
    dob: "",
    password: "",
    cpassword: "",
  });

  const { name, email, number, gender, dob, password, cpassword } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== cpassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify({
        name,
        email,
        number,
        gender,
        dob,
        password,
        cpassword,
      });
      const res = await axios.post(
        "http://localhost:8080/signup",
        body,
        config
      );

      console.log("User registered successfully:", res.data);
      // Redirect or update UI here
    } catch (error) {
      console.error(
        "Error registering the user:",
        (error.response ? error.response.data : "Unknown error") as any
      );
    }
  };

  return (
    <div className="h-screen my-28 lg:my-0 md:my-0 flex flex-col justify-center items-center bg-gray-900 p-4 md:p-0">
      <div className="w-full max-w-xl px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-white">
          Sign up for Cinemate
        </h1>
        <form onSubmit={onSubmit}>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-200"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Full Name"
              />
            </div>
            <div className="mb-4 w-full">
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
              />
            </div>
          </div>
          <div className="mb-4 w-full">
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-gray-200"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="number"
              value={number}
              onChange={onChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              placeholder="Mobile Number"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="mb-4 w-full">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-200"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-200"
              >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={gender}
                onChange={onChange}
                className="h-[2.75rem] mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="mb-4 w-full">
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
              />
            </div>
            <div className="mb-4 w-full">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-200"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="cpassword"
                value={cpassword}
                onChange={onChange}
                className="mt-1 block w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Confirm Password"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:text-blue-400">
            Log in.
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
