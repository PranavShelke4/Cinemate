import React from "react";
import Image from "next/image";
import profileImage from "../../../../../public/icons/home/Profile.svg";
import ProfileStats from "./ProfileStats";

function ProfileHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-0 py-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Image
          src={profileImage}
          alt={profileImage}
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">sdfs</h1>
          <p className="text-gray-400">sdfs</p>
        </div>
      </div>
      <ProfileStats posts={34} followers={1500} following={300} />
    </div>
  );
}

export default ProfileHeader;