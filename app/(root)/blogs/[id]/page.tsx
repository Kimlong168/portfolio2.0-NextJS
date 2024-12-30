"use client";
import { useEffect, useState, use } from "react";
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../../../lib/firebase"; // Import your Firebase configuration

import Markdown from "markdown-to-jsx";
import SharingButton from "../../../components/SharingButton";
import { Helmet } from "react-helmet";
import Author from "../../../components/Author";
import BlogRelated from "../../../components/BlogRelated";
import Link from "next/link";
import Image from "next/image";
import GoToTop from "@/app/components/GoToTop";
// import Loading from "@/app/components/Loading";

interface Post {
  id: string;
  title: string;
  content: string;
  tags: string;
  img?: string;
  date: string;
  author: {
    name: string;
  };
}

const BlogDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [tags, setTags] = useState<string[]>([]);
  const [postDetails, setPostDetails] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const docRef = doc(db, "posts", id); // Reference to the post document
        const docSnap = await getDoc(docRef); // Fetch the document

        if (docSnap.exists()) {
          const post = docSnap.data() as Post;
          setPostDetails(post);
          setTags(post.tags ? post.tags.split(",") : []);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const colors = [
    "bg-red-600",
    "bg-blue-500",
    "bg-green-400",
    "bg-yellow-300",
    "bg-indigo-600",
    "bg-gray-200",
    "bg-pink-400",
  ];

  const toCapitalCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  if (!postDetails) return <div className="bg-black min-h-screen"></div>;

  const { title: postTitle, content, date, img, author } = postDetails;

  return (
    // <Suspense fallback={<Loading />}>
    <div>
      <Helmet>
        <title>Blog | {postTitle}</title>
        <meta name="description" content={`${postTitle}`} />
      </Helmet>

      <div id="detail" className="container mx-auto">
        <div className="mb-5">
          <Link href="/blogs">
            <span>◀️ Back</span>
          </Link>
        </div>

        <div>
          <div className="text-center text-blue-400 mb-4 text-xl">
            {date ? (
              <div>Published {date}</div>
            ) : (
              <div>Published October 10, 2023</div>
            )}
          </div>

          <h1 className="text-3xl lg:text-5xl font-bold uppercase mb-5 text-center text-white">
            {postTitle}
          </h1>

          <div className="flex justify-center items-center gap-3 lg:gap-5 w-full mb-5">
            {tags.map((tag, index) => (
              <span
                key={tag}
                title={`tag-${tag.trim()}`}
                className={`${
                  colors[index] ? colors[index] : "bg-red-400"
                } text-white text-sm font-semibold py-1.5 px-3 rounded-full min-w-[50px] text-center`}
              >
                {toCapitalCase(tag).trim()}
              </span>
            ))}
          </div>

          {img && (
            <div className="mb-12">
              <Image
                width={100}
                height={100}
                title="Cover image"
                src={img}
                alt="Cover"
                className="w-full lg:w-[90%] mx-auto block max-h-[480px] rounded"
              />
              <div className="text-sm text-center mt-3 text-blue-400 underline">
                (<a href={img}>View cover image</a>)
              </div>
            </div>
          )}

          <div id="markdown" className="text-white/90">
            <Markdown>{content}</Markdown>
          </div>

          <div className="text-2xl text-pink-500 font-semibold my-10">
            Written By <div className="text-blue-400">{author.name}</div>
          </div>
        </div>
      </div>

      <SharingButton url={window.location.href} title={postTitle} />

      {author.name.toLowerCase() === "chann kimlong" && (
        <div className="container mx-auto">
          <Author />
        </div>
      )}
      <GoToTop />

      <div className="pb-12">
        <BlogRelated tags={tags} id={`${id}`} />
      </div>
    </div>
    // </Suspense>
  );
};

export default BlogDetailPage;
