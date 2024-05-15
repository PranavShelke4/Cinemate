"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function UploadPostForm({
  onUpload,
}: {
  onUpload: (data: { title: string; image: File }) => void;
}) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      try {
        const response = await axios.post(
          "http://localhost:8080/upload",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        onUpload(response.data.post);
        window.alert("Post uploaded successfully!");
      } catch (err) {
        console.error(
          "Error uploading post:",
          err.response ? err.response.data : "Unknown error"
        );
        window.alert("Failed to upload post.");
      }
    } else {
      window.alert("Please select an image to upload.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-800 rounded-lg shadow-lg my-4"
    >
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white mb-2" htmlFor="image">
          Image
        </label>
        <input
          type="file"
          id="image"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setImage(e.target.files?.[0] ?? null)
          }
          className="w-full p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
      >
        Upload Post
      </button>
    </form>
  );
}

export default UploadPostForm;
