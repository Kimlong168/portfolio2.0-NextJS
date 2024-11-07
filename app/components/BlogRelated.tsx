import React, { ReactNode, useEffect, useState } from "react";
import img1 from "../assets/portfolio-img3.png";
import BlogBox from "./BlogBox";
import { db } from "../lib/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { scrollToTop } from "../utils/scrollToTop";
// Define the Post interface to specify the structure of each post
interface Post {
  id: string;
  title: string;
  content: string;
  tags: string;
  img?: string;
  author: {
    name: string;
  };
}

// Define the props for the BlogRelated component
interface BlogRelatedProps {
  tags: string[]; // Tags passed as an array of strings
  id: string | number; // The ID of the current post
}

const BlogRelated: React.FC<BlogRelatedProps> = ({ tags, id }) => {
  const [postList, setPostList] = useState<Post[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<ReactNode[]>([]);

  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(
          query(postCollectionRef, orderBy("createdAt", "desc"))
        );
        setPostList(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post))
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, []);

  // Function to check if two strings have any common words
  function haveCommonText(string1: string, string2: string): boolean {
    const words1 = string1.split(",");
    const words2 = string2.split(",");

    for (const word1 of words1) {
      for (const word2 of words2) {
        if (word1.trim().toLowerCase() === word2.trim().toLowerCase()) {
          return true; // Found a common word
        }
      }
    }
    return false; // No common words found
  }

  useEffect(() => {
    // Map through postList to find related posts
    const elements = postList.map((post) => {
      const related = haveCommonText(tags.join(","), post.tags); // Use join to convert tags array to string
      console.log("tostring", tags.join(","));

      if (related && post.id != id.toString()) {
        return (
          <div onClick={scrollToTop} key={post.id}>
            <BlogBox
              id={post.id}
              direction="right"
              delay={0.2}
              amount={0.3}
              author={post.author.name}
              image={post.img ? post.img : `${img1}`}
              title={post.title}
              latest={false}
            />
          </div>
        );
      }
      return null;
    });

    const filteredElements = elements.filter((element) => element !== null); // Remove null elements

    setRelatedPosts(filteredElements);
  }, [postList, tags, id]);

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <div className="container mx-auto mt-20">
        <div className="text-gradient flex items-center mb-10 border-b">
          <span className="font-bold">Related Blogs</span>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          {relatedPosts}
        </div>
      </div>
    </div>
  );
};

export default BlogRelated;
