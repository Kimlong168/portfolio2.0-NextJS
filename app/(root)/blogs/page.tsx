import React from "react";
import BlogWrapper from "../../components/BlogWrapper";
import BlogInBlogPage from "../../components/BlogInBlogPage";
import Head from "next/head"; // Next.js built-in Head component

interface Post {
  id: string;
  title: string;
  content: string;
  img?: string;
  length: number;
  author: {
    name: string;
  };
}

const BlogPage = () => {
  // Replace this with actual logic to fetch posts
  const postList: Post[] = []; // This should ideally come from an API or static props

  // Check if postList is empty and handle it
  if (postList.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <p className="text-xl text-white">No blog posts available.</p>
      </div>
    );
  }

  const darkMode = true;
  const style = darkMode ? "bg-black" : "bg-site";

  return (
    <div
      className={`${style} bg-no-repeat bg-cover min-h-screen overflow-hidden`}
    >
      {/* Head component for managing the document head in Next.js */}
      <Head>
        <title>Kimlong Chann | Blogs</title>
        <meta
          name="description"
          content="Welcome to my blogs website - Kimlong Chann"
        />
      </Head>

      {/* BlogInBlogPage and BlogWrapper components */}
      <BlogInBlogPage postList={postList} />
      <BlogWrapper postList={postList} />
    </div>
  );
};

export default BlogPage;
