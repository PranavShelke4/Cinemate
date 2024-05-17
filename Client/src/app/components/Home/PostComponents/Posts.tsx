import React, { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import PostLoader from "./PostLoader";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchMorePosts = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/posts?page=${page}&limit=5`
      );
      const newPosts = response.data.posts;
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts: any[]) => {
          const postIds = prevPosts.map((post) => post._id);
          const filteredNewPosts = newPosts.filter(
            (post: any) =>
              !postIds.includes(post._id) &&
              Date.now() - new Date(post.createdAt).getTime() < 24 * 60 * 60 * 1000 // Filter posts within 24 hours
          );
          return [...filteredNewPosts, ...prevPosts]; // Ensure latest posts are at the top
        });
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error: any) {
      console.error(
        "Error fetching posts:",
        error.response ? error.response.data : "Unknown error"
      );
      setHasMore(false);
    }
  }, [page]);

  useEffect(() => {
    fetchMorePosts();
  }, [fetchMorePosts]);

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
