"use client";

import React, { useState } from "react";
import TopBar from "../components/Home/TopBar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import UserPosts from "../components/Profile/UserPosts";
import UploadPostForm from "../components/Profile/UploadPostForm";
import BottomNav from "../components/Home/BottomNav";

function ProfilePage() {
  const [posts, setPosts] = useState<any[]>([]);

  const handleUploadPost = (newPost: any) => {
    setPosts((prevPosts: any[]) => [
      {
        id: prevPosts.length + 1,
        username: "John Doe",
        userImage: "/path/to/profile.jpg",
        timeAgo: "Just now",
        ...newPost,
      },
      ...prevPosts,
    ]);
  };

  return (
    <>
      <TopBar />
      <div className="mx-auto mt-0 sm:mt-14 px-4 sm:px-8 lg:px-28">
        <ProfileHeader />
        <UploadPostForm onUpload={handleUploadPost} />
        <UserPosts />
      </div>
      <BottomNav />
    </>
  );
}

export default ProfilePage;
