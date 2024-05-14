import React, { useState } from "react";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";

import profile from "../../../../public/icons/home/Profile.svg";
import Postt from "../../../../public/images/story.jpeg";

function Post({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-gray-800 mb-8 sm:mb-0 text-white mx-4 sm:mx-16 mb-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4 bg-gray-900 p-4">
        <Image
          src={profile}
          alt={post.username}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post.username}</h2>
          <p className="text-gray-400 text-sm">{post.timeAgo}</p>
        </div>
      </div>
      <div className="mb-4 flex justify-center items-center">
        <Image
          src={Postt}
          alt={post.title}
          width={300}
          height={100}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start bg-gray-900 p-4">
        <div className="flex space-x-8 text-gray-400">
          <span className="flex gap-2 items-center">
            <button onClick={() => setLiked(!liked)}>
              {liked ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
            {post.likes}
          </span>
          <span className="flex gap-2 items-center">
            <FaComment size={20} /> {post.comments}
          </span>
          <span className="flex gap-2 items-center">
            <FaShare size={20} /> {post.shares}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Post;
