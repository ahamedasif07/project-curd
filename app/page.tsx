"use client";
import React, { useEffect } from "react";
import { getPosts } from "@/api/postApi";

const Home = () => {
  const getPostData = async () => {
    const res = await getPosts();
    console.log(res);
  };
  useEffect(() => {
    getPostData();
  }, []);
  console.log(getPosts());
  return <div>Home</div>;
};

export default Home;
