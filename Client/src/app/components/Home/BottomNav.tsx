import React from "react";
import Link from "next/link";
import Image from "next/image";

import Search from "../../../../public/icons/home/Search.svg";
import Like from "../../../../public/icons/home/Likes.svg";
import Chat from "../../../../public/icons/home/Chat.svg";
import User from "../../../../public/icons/home/user.svg";
import Home from "../../../../public/icons/home/Home.svg";

function BottomNav() {
  const links = [
    { to: "/", src: Home, alt: "Home" },
    { to: "/search", src: Search, alt: "Search" },
    { to: "/like", src: Like, alt: "Like" },
    { to: "/messages", src: Chat, alt: "Messages" },
    { to: "/profile", src: User, alt: "Profile" },
  ];

  return (
    <div className="fixed inset-x-0 bottom-0 shadow bg-black text-white flex justify-around items-center p-4 flex md:hidden lg:hidden">
      {links.map((link) => (
        <Link href={link.to} key={link.to}>
          <div className="flex flex-col w-16 sm:w-28 items-center">
            <Image src={link.src} alt={link.alt} className="h-6 mb-1" />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BottomNav;
