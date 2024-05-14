import React from "react";
import Image from "next/image";
import Post from "../../../../../public/images/story.jpeg";

function UserPosts() {
  return (
    <div className="flex flex-row gap-4 border-t pt-4">
      {Array(3).fill(0).map((_, i) => (
        <div key={i} className="relative max-w-1/3 bg-gray-700 rounded-lg ">
          <Image
            className="h-[24rem] object-cover rounded-lg hover:opacity-50"
            src={Post}
            alt="Post"
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