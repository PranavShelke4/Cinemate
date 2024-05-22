"use client";

import React, { useEffect, useState, Fragment } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { Menu, Transition } from "@headlessui/react";
import { FaHeart, FaComment } from "react-icons/fa";
import BottomBar from "../../components/Home/BottomNav";

// Skeleton Loader Component
const SkeletonLoader: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
          <div className="ml-4 w-32 h-4 bg-gray-700 rounded"></div>
        </div>
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
      </div>
      <div className="w-full h-[32rem] bg-gray-700 rounded-lg mb-4"></div>
      <div className="w-1/2 h-6 bg-gray-700 rounded mb-4"></div>
      <div className="w-full h-4 bg-gray-700 rounded mb-4"></div>
      <div className="flex justify-between items-center mb-4">
        <div className="w-16 h-6 bg-gray-700 rounded"></div>
        <div className="w-16 h-6 bg-gray-700 rounded"></div>
      </div>
      <div className="w-full h-4 bg-gray-700 rounded mb-4"></div>
      <div className="w-full h-4 bg-gray-700 rounded mb-4"></div>
    </div>
  );
};

interface Comment {
  _id: string;
  username: string;
  content: string;
}

interface Post {
  _id: string;
  title: string;
  image: string;
  content: string;
  likes: string[]; 
  comments: Comment[];
  userImage: string;
  username: string;
  userId: string;
}

interface User {
  _id: string;
  name: string;
  profilePicture: string;
}

const PostPage: React.FC = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [likedUsers, setLikedUsers] = useState<User[]>([]);
  const [showLikesPopup, setShowLikesPopup] = useState(false);
  const { postId } = useParams();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<{
          post: Post;
          userId: string;
          likesCount: number;
        }>(`http://localhost:8080/posts/${postId}`, { withCredentials: true });
        setPost(response.data.post);
        setCurrentUserId(response.data.userId);
      } catch (err: any) {
        console.error(
          "Error fetching post:",
          err.response ? err.response.data : "Unknown error"
        );
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleEdit = () => {
    // Handle edit post logic
    console.log("Edit post");
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/posts/${postId}`, {
        withCredentials: true,
      });
      router.push("/profile"); 
    } catch (err: any) {
      console.error(
        "Error deleting post:",
        err.response ? err.response.data : "Unknown error"
      );
    }
  };

  const fetchLikedUsers = async () => {
    if (!post) return;
    setShowLikesPopup(true);
    try {
      const response = await axios.post("http://localhost:8080/users/details", {
        userIds: post.likes,
      });
      setLikedUsers(response.data);
    } catch (err) {
      console.error(
        "Error fetching liked users:",
        err.response ? err.response.data : "Unknown error"
      );
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!post) {
    return (
      <div className="text-white border-t pt-4 flex justify-center items-center">
        Post not found
      </div>
    );
  }

  const isPostOwner = currentUserId === post.userId;
  console.log(isPostOwner);
  console.log(currentUserId);
  console.log(post.userId);

  return (
    <>
      <div className="max-w-3xl mx-auto p-4 bg-gray-900 text-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex justify-center items-center">
            <Image
              src={`http://localhost:8080${post.userImage}`}
              alt={post.username}
              width={40}
              height={40}
              objectFit="cover"
              className="rounded-full w-12 h-12"
            />
            <span className="ml-4 font-bold">{post.username}</span>
          </div>
          {isPostOwner && (
            <Menu as="div" className="relative top-2">
              <div>
                <Menu.Button className="inline-flex justify-center w-full text-sm font-medium text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 110-4 2 2 0 010 4zm0-3a1 1 0 100 2 1 1 0 000-2zm8 3a2 2 0 110-4 2 2 0 010 4zm0-3a1 1 0 100 2 1 1 0 000-2zm-4 3a2 2 0 110-4 2 2 0 010 4zm0-3a1 1 0 100 2 1 1 0 000-2z" />
                  </svg>
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute z-10 right-0 w-32 mt-0 origin-top-right bg-gray-800 divide-y divide-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleEdit}
                          className={`${
                            active ? "bg-gray-700" : ""
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleDelete}
                          className={`${
                            active ? "bg-gray-700" : ""
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm text-white`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>
        <div className="bg-gray-700 relative w-full h-[32rem] mb-4">
          <Image
            src={`http://localhost:8080${post.image}`}
            alt={post.title}
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
        <h1 className="text-x font-medium mb-4">{post.title}</h1>
        <p className="mb-4">{post.content}</p>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <FaHeart className="text-red-500" size={24} />
            <button onClick={fetchLikedUsers}>
              {Array.isArray(post.likes) ? post.likes.length : 0}
            </button>
          </div>
          <div className="flex items-center">
            <FaComment className="w-6 h-6 text-blue-500 mr-2" />
            <span>
              {post.comments.length > 1 ? post.comments.length : "No comments"}
            </span>
          </div>
        </div>
        <hr className="mb-4 border-gray-700" />
        <div>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment._id} className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-gray-700 flex justify-center items-center">
                    <span className="text-white">
                      {comment.username ? comment.username[0] : "U"}
                    </span>
                  </div>
                  <span className="ml-2 font-bold">
                    {comment.username || "Unknown User"}
                  </span>
                </div>
                <p className="ml-10">{comment.content}</p>
              </div>
            ))
          ) : (
            <div className="text-white">No comments yet</div>
          )}
        </div>
      </div>
      <BottomBar />

      {showLikesPopup && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 cursor-pointer"
          onClick={() => setShowLikesPopup(false)}
        >
          <div
            className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full md:w-full overflow-y-auto h-full md:h-[80vh] cursor-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-300 sm:hidden" // Added sm:hidden to hide the button on screens larger than sm
              onClick={() => setShowLikesPopup(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="text-xl font-bold mb-4">Liked by</h2>
            {likedUsers.length > 0 ? (
              likedUsers.map((user) => (
                <div key={user._id} className="flex items-center mb-4">
                  <Image
                    src={`http://localhost:8080${user.profilePicture}`}
                    alt={user.name}
                    width={40}
                    height={40}
                    objectFit="cover"
                    className="rounded-full"
                  />
                  <span className="ml-4">{user.name}</span>
                </div>
              ))
            ) : (
              <p>No users liked this post</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostPage;
