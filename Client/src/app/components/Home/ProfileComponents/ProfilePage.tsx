"use client";

import React, { useState } from "react";
import ProfileHeader from "./ProfileHeader";
import UserPosts from "./UserPosts";
import UploadPostForm from "./UploadPostForm";

const mockUser = {
  name: "John Doe",
  profileImage: "/path/to/profile.jpg",
  bio: "This is my bio",
  posts: 34,
  followers: 1500,
  following: 300,
};

const initialPosts = [
  {
    id: 1,
    username: "John Doe",
    userImage: "/path/to/profile.jpg",
    timeAgo: "3h ago",
    image: "/path/to/post1.jpg",
    likes: 3700,
    comments: 2345,
    shares: 1234,
  },
  {
    id: 2,
    username: "John Doe",
    userImage: "/path/to/profile.jpg",
    timeAgo: "4h ago",
    image: "/path/to/post2.jpg",
    likes: 4500,
    comments: 3456,
    shares: 2345,
  },
];

function ProfilePage() {
  const [posts, setPosts] = useState(initialPosts);

  const handleEditPost = (postId) => {
    // Handle edit post logic
    console.log("Edit post", postId);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const handleUploadPost = (newPost) => {
    setPosts((prevPosts) => [
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
    <div className="mx-auto px-4 sm:px-8 lg:px-28">
      <ProfileHeader user={mockUser} />

      <UploadPostForm onUpload={handleUploadPost} />
      <UserPosts
        posts={posts}
        onEdit={handleEditPost}
        onDelete={handleDeletePost}
      />
    </div>
  );
}

export default ProfilePage;
