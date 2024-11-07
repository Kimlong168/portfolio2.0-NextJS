import React from "react";
import img1 from "../assets/portfolio-img3.png";
import BlogBox from "./BlogBox";

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
  postList: Post[]; // An array of Post objects
  tags: string[]; // Tags passed as an array of strings
  id: string | number; // The ID of the current post
  scrollTop: () => void; // A function that scrolls the page to the top
}

const BlogRelated: React.FC<BlogRelatedProps> = ({
  postList,
  tags,
  id,
  scrollTop,
}) => {
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

  // Map through postList to find related posts
  let elements = postList.map((post) => {
    const related = haveCommonText(tags.join(","), post.tags); // Use join to convert tags array to string
    console.log("tostring", tags.join(","));

    if (related && post.id != id.toString()) {
      return (
        <div onClick={scrollTop} key={post.id}>
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

  // Filter out null values from the elements array
  elements = elements.filter((element) => element !== null);

  console.log("elements", elements);

  return (
    <div>
      <div className="container mx-auto mt-20">
        {tags.length > 0 && elements.length > 0 ? (
          <div className="text-gradient flex items-center mb-10 border-b">
            <span className="font-bold">Related Blogs</span>
          </div>
        ) : null}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          {elements}
        </div>
      </div>
    </div>
  );
};

export default BlogRelated;
