"use client";

import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import PostLoader from "./PostLoader";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMorePosts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/posts?page=${page}&limit=5`
      );
      const newPosts = response.data.posts;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => {
          const postIds = prevPosts.map((post) => post._id);
          const filteredNewPosts = newPosts.filter(
            (post) => !postIds.includes(post._id)
          );
          return [...prevPosts, ...filteredNewPosts];
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error(
        "Error fetching posts:",
        error.response ? error.response.data : "Unknown error"
      );
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchMorePosts();
  }, []);

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMorePosts}
      hasMore={hasMore}
      loader={<PostLoader />}
      endMessage={<p className="text-center text-gray-500">No more posts</p>}
    >
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
}

export default Posts;
