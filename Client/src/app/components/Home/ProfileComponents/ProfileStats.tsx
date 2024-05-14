import React from 'react';

function ProfileStats({ posts, followers, following }: { posts: any, followers: any, following: any }) {
  return (
    <div className="flex gap-6 my-4">
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{posts}</h2>
        <p className="text-gray-400">Posts</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{followers}</h2>
        <p className="text-gray-400">Followers</p>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-bold text-white">{following}</h2>
        <p className="text-gray-400">Following</p>
      </div>
    </div>
  );
}

export default ProfileStats;
