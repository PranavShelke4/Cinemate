"use client"

import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import PostLoader from './PostLoader';

const initialPosts = [
  {
    id: 1,
    username: 'The Power of the Dog',
    userImage: '/path/to/user1.jpg',
    timeAgo: '3h ago',
    image: '/path/to/post1.jpg',
    likes: 3700,
    comments: 2345,
    shares: 1234,
  },
  {
    id: 2,
    username: 'Dune',
    userImage: '/path/to/user2.jpg',
    timeAgo: '4h ago',
    image: '/path/to/post2.jpg',
    likes: 4500,
    comments: 3456,
    shares: 2345,
  },
  {
    id: 3,
    username: 'West Side Story',
    userImage: '/path/to/user3.jpg',
    timeAgo: '5h ago',
    image: '/path/to/post3.jpg',
    likes: 2700,
    comments: 3456,
    shares: 2345,
  },
];

function Posts() {
    const [posts, setPosts] = useState(initialPosts);
    const [hasMore, setHasMore] = useState(true);

    const fetchMorePosts = () => {
        // Simulate fetching data from API
        setTimeout(() => {
            const newPosts: typeof initialPosts = [
                // Add more mock posts here
            ];
            if (newPosts.length === 0) {
                setHasMore(false);
            } else {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
            }
        }, 1500);
    };

    return (
        <InfiniteScroll
            dataLength={posts.length}
            next={fetchMorePosts}
            hasMore={hasMore}
            loader={<PostLoader />}
            endMessage={<p className="text-center text-gray-500">No more posts</p>}
        >
            {posts.map((post) => (
                <Post key={post.id} post={post} />
            ))}
        </InfiniteScroll>
    );
}

export default Posts;
