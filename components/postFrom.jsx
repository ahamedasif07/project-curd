"use client";

import { postData } from "@/api/postApi";
import { useEffect, useState } from "react";

const PostForm = ({ data, setData, handleEditPost, setHandleEditPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !body) {
      alert("Please fill all fields");
      return;
    }

    const newPost = {
      title,
      body,
      userId: 1,
    };

    try {
      setLoading(true);

      // Send to API
      const res = await postData(newPost);

      // JSONPlaceholder returns created object
      const savedPost = res.data || {
        id: Date.now(),
        ...newPost,
      };

      // Update local state
      setData((prev) => [savedPost, ...prev]);

      // Clear form
      setTitle("");
      setBody("");
    } catch (err) {
      console.error("Post Error:", err);
      alert("Failed to add post");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleEditPost && setTitle(handleEditPost.title);
    handleEditPost && setBody(handleEditPost.body);
  }, [handleEditPost]);
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 mb-10 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Add New Post
      </h2>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-600 mb-1 font-semibold">Title</label>

        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className="block text-gray-600 mb-1 font-semibold">
          Description
        </label>

        <textarea
          rows="4"
          placeholder="Enter description"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-lg text-white font-bold transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
        }`}
      >
        {loading ? "Adding..." : "Add Post"}
      </button>
    </form>
  );
};

export default PostForm;
