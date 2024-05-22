import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { FaHeart, FaRegHeart, FaComment, FaShare } from "react-icons/fa";

function Post({ post }: { post: any }) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(
    post.likes ? post.likes.length : 0
  );

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/posts/${post._id}`,
          { withCredentials: true }
        );
        setLiked(response.data.liked);
        setLikesCount(response.data.post.likes.length);
      } catch (err) {
        console.error(
          "Error fetching post data:",
          err.response ? err.response.data : "Unknown error"
        );
      }
    };

    fetchPostData();
  }, [post._id]);

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/posts/${post._id}/${liked ? "unlike" : "like"}`,
        {},
        { withCredentials: true }
      );
      setLiked(!liked);
      setLikesCount(response.data.post.likes.length);
    } catch (err) {
      console.error(
        "Error liking/unliking post:",
        err.response ? err.response.data : "Unknown error"
      );
    }
  };

  return (
    <div className="bg-gray-800 mb-8 sm:mb-0 text-white mx-4 sm:mx-16 mb-4 rounded-lg shadow-lg">
      <div className="flex items-center mb-4 bg-gray-900 p-4">
        <div className="relative w-12 h-12">
          <Image
            src={`http://localhost:8080${post.userImage}`}
            alt={post.username}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-semibold">{post.username}</h2>
          <p className="text-gray-400 text-sm">{post.timeAgo}</p>
        </div>
      </div>
      <div className="mb-4 flex justify-center items-center">
        <Image
          src={`http://localhost:8080${post.image}`}
          alt={post.title}
          width={300}
          height={100}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start bg-gray-900 p-4">
        <div className="flex space-x-8 text-gray-400">
          <span className="flex gap-2 items-center">
            <button onClick={handleLike}>
              {liked ? (
                <FaHeart className="text-red-500" size={20} />
              ) : (
                <FaRegHeart size={20} />
              )}
            </button>
            {likesCount}
          </span>
          <span className="flex gap-2 items-center">
            <FaComment size={20} /> {post.comments.length}
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
