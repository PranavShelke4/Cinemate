import React from "react";
import Link from "next/link";
import Image from "next/image";

import Search from "../../../../public/icons/home/Search.svg";
import Like from "../../../../public/icons/home/Likes.svg";
import Chat from "../../../../public/icons/home/Chat.svg";
import Profile from "../../../../public/icons/home/Profile.svg";

function NavBar() {
  return (
    <div className="hidden bg-gray-900 sm:flex fixed top-0 z-50 border-b-2 w-full text-white flex justify-between items-center p-4">
      <div className="text-xl font-bold">
        <Link href="/">Cinemate</Link>
      </div>
      <div className="flex space-x-8">
        <Link href="/search" className="bg-[#292938] p-2 rounded-xl">
          <Image src={Search} alt="Search" className="h-6 hover:opacity-75" />
        </Link>
        <Link href="/favorites" className="bg-[#292938] p-2 rounded-xl">
          <Image src={Like} alt="Favorites" className="h-6 hover:opacity-75" />
        </Link>
        <Link href="/notifications" className="bg-[#292938] p-2 rounded-xl">
          <Image
            src={Chat}
            alt="Notifications"
            className="h-6 hover:opacity-75"
          />
        </Link>
        <Link href="/profile">
          <Image
            src={Profile}
            alt="Profile"
            className="h-10 w-10 rounded-full hover:opacity-75"
          />
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
