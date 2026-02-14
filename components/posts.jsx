"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/api/postApi";

const Posts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const res = await getPosts();
        setData(res);
      } catch (err) {
        console.error("API Error:", err);
      }
    };
    getPostData();
  }, []);

  const handleEdit = (post) => {
    alert(`Edit post ID: ${post.id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      setData(data.filter((post) => post.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
        All Posts
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between transform transition hover:scale-105 hover:shadow-2xl duration-300"
          >
            {/* Header with gradient */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500">
                ID: {post.id}
              </span>
              <span className="text-gray-400 text-sm">User: {post.userId}</span>
            </div>

            {/* Title and Body */}
            <h2 className="text-xl font-bold text-gray-800 mb-2 hover:text-indigo-600 transition">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {post.body}
            </p>

            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(post)}
                className="px-4 py-1 rounded-lg font-semibold text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
                className="px-4 py-1 rounded-lg font-semibold text-white bg-gradient-to-r from-red-400 to-rose-500 hover:from-red-500 hover:to-rose-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
