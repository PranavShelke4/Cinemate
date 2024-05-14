"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Story from "../../../../public/images/story.jpeg";

const storiesData = [
  { id: 1, image: Story, title: "Story 1", seen: false },
  { id: 2, image: Story, title: "Story 2", seen: false },
  { id: 3, image: Story, title: "Story 3", seen: false },
  { id: 4, image: Story, title: "Story 4", seen: false },
];

function Stories() {
  const [selectedStory, setSelectedStory] = useState<{
    id: number;
    image: string;
    title: string;
  } | null>(null);
  const [stories, setStories] = useState(storiesData);

  const handleStoryClick = (story: {
    id: number;
    image: string;
    title: string;
  }) => {
    setSelectedStory(story);
    setStories((prevStories: any) =>
      prevStories.map((s: any) =>
        s.id === story.id ? { ...s, seen: true } : s
      )
    );
  };

  return (
    <div className="w-full flex flex-col mt-0 sm:mt-20 overflow-x-auto snap-x snap-mandatory space-x-4 p-4 scrollbar-hide">
      <div className="w-full flex space-x-4">
        <Link href="/add-story">
          <div className="snap-center shrink-0 w-16 sm:w-20 h-16 sm:h-20 relative border-2 border-white rounded-full overflow-hidden cursor-pointer shadow-lg m-2">
            <div className="relative w-full h-full bg-gray-700 flex items-center justify-center text-white text-2xl font-bold">
              +
            </div>
          </div>
        </Link>
        {stories
          .sort((a: any, b: any) => Number(a.seen) - Number(b.seen))
          .map((story: any) => (
            <div
              key={story.id}
              className={`snap-center shrink-0 w-16 sm:w-20 h-16 sm:h-20 relative border-2 border-white rounded-full overflow-hidden cursor-pointer shadow-lg m-2 ${
                story.seen ? "opacity-50" : "opacity-100"
              }`}
              onClick={() => handleStoryClick(story)}
            >
              <Image
                src={story.image}
                alt={story.title}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
              <span className="absolute bottom-0 left-0 right-0 text-center text-sm text-white mt-2">
                {story.title}
              </span>
            </div>
          ))}
      </div>
      {selectedStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={() => setSelectedStory(null)}
        >
          <div className="relative w-full h-full max-w-3xl max-h-full flex flex-col items-center justify-center p-4">
            {/* <h2 className="text-2xl text-white mb-4">{selectedStory.title}</h2> */}
            <Image
              src={selectedStory.image}
              alt={selectedStory.title}
              layout="responsive"
              width={500}
              height={500}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Stories;
