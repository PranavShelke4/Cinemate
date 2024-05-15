"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

import Search from "../../../../public/icons/home/Search.svg";
import Like from "../../../../public/icons/home/Likes.svg";
import Chat from "../../../../public/icons/home/Chat.svg";
import Profile from "../../../../public/images/users.jpg";

function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });
      router.push("/login");
    } catch (error) {
      console.error(
        "Error logging out:",
        error.response ? error.response.data : "Unknown error"
      );
    }
  };

  return (
    <div className="hidden bg-gray-900 sm:flex fixed top-0 z-50 border-b-2 w-full text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">
        <Link href="/">Cinemate</Link>
      </div>
      <div className="flex space-x-8 relative">
        <Link href="/search" className="bg-[#292938] flex justify-center items-center  p-2 rounded-xl">
          <Image src={Search} alt="Search" className="h-6 hover:opacity-75" />
        </Link>
        <Link href="/favorites" className="bg-[#292938] flex justify-center items-center p-2 rounded-xl">
          <Image src={Like} alt="Favorites" className="h-6 hover:opacity-75" />
        </Link>
        <Link href="/notifications" className="bg-[#292938] flex justify-center items-center p-2 rounded-xl">
          <Image
            src={Chat}
            alt="Notifications"
            className="h-6 hover:opacity-75"
          />
        </Link>
        <div className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none">
            <Image
              src={Profile}
              alt="Profile"
              className="h-10 w-10 rounded-full hover:opacity-75"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
              <Link href="/profile">
                <div
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  onClick={closeDropdown}
                >
                  Profile
                </div>
              </Link>
              <div
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  closeDropdown();
                  handleLogout();
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;
