import React from "react";

function PostLoader() {
  return (
    <div className="bg-gray-800 text-white p-4 mb-4 mx-16 rounded-lg shadow-lg animate-pulse">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 bg-gray-700 rounded-full"></div>
        <div className="ml-4 flex-1 space-y-2">
          <div className="w-1/3 h-4 bg-gray-700 rounded"></div>
          <div className="w-1/4 h-4 bg-gray-700 rounded"></div>
        </div>
      </div>
      <div className="w-full h-48 bg-gray-700 rounded-lg mb-4"></div>
      <div className="flex space-x-4">
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
}

export default PostLoader;
