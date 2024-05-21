"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultProfileImage from "../../../../public/images/users.jpg";
import ProfileStats from "./ProfileStats";
import axios from "axios";
import { useRouter } from "next/navigation";

function ProfileHeader() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePicture: "",
    posts: 0,
    followers: 0,
    following: 0,
  });

  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      };

      const response = await axios.get("http://localhost:8080/profile", config);
      setUserData(response.data);
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response ? error.response.data : "Unknown error"
      );
      if (error.response && error.response.status === 401) {
        router.push("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const profileImageSrc = userData.profilePicture
    ? `http://localhost:8080${userData.profilePicture}`
    : defaultProfileImage;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 px-0 py-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Image
          src={profileImageSrc}
          alt="Profile Image"
          width={80}
          height={80}
          className="rounded-full object-cover w-20 h-20 sm:w-24 sm:h-24"
        />
        <div>
          <h1 className="text-2xl font-bold text-white">{userData.name}</h1>
          <p className="text-gray-400">{userData.email}</p>
        </div>
      </div>
      <ProfileStats
        posts={userData.posts}
        followers={userData.followers}
        following={userData.following}
      />
    </div>
  );
}

export default ProfileHeader;
