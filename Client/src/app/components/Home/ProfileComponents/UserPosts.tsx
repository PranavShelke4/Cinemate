"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

// Skeleton Loader Component
function SkeletonLoader() {
  return (
    <div className="relative max-w-1/3 bg-gray-700 rounded-lg animate-pulse">
      <div className="h-[24rem] bg-gray-600 rounded-lg"></div>
      <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
        <div className="m-2 bg-blue-500 text-white font-bold py-2 px-4 rounded">
          Loading
        </div>
      </div>
    </div>
  );
}

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/user-posts", {
          withCredentials: true,
        });
        setPosts(response.data);
      } catch (err) {
        console.error(
          "Error fetching user posts:",
          err.response ? err.response.data : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-row gap-4 border-t pt-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <SkeletonLoader key={i} />
          ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-white border-t pt-4 flex justify-center items-center">
        No posts available
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 border-t pt-4">
      {posts.map((post) => (
        <div
          key={post._id}
          className="relative max-w-1/3 bg-gray-700 rounded-lg"
        >
          <Image
            className="h-[24rem] object-cover rounded-lg hover:opacity-50"
            src={`http://localhost:8080${post.image}`}
            alt={post.title}
            width={300}
            height={300}
          />
          <div className="absolute inset-0 flex justify-center items-center opacity-0 hover:opacity-100">
            <button className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Edit
            </button>
            <button className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserPosts;
