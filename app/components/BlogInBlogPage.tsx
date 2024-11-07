import React from "react";
import BlogBox from "./BlogBox";
import Link from "next/link";
import img1 from "../assets/portfolio-img1.png";

// Define the type for a single post
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
// Define the type for the props the Blog component will accept
interface BlogProps {
  postList: Post[]; // An array of Post objects
}

const Blog: React.FC<BlogProps> = ({ postList }) => {
  if (postList.length === 0) return null;
  return (
    <div className="my-10 lg:mb-0" id="blog">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-x-10 lg:mb-10">
          <div className="flex-1 flex flex-col lg:flex-row gap-y-12 gap-10 mb-10 lg:mb-0">
            {/* text */}
            <div className="flex-1 ">
              <h2 className="h2 leading-tight text-accent font-bold">
                Recent Blog.
              </h2>
              <p className="max-w-sm mb-16 ">
                These are my personal blogs, I will share my knowledge and
                experience in web development, digital marketing, UX/UI design
                and also my life experience.
              </p>
              <div>
                <Link href="/">
                  <button className="btn btn-sm">Go to My portfolio</button>
                </Link>
              </div>
            </div>
            {/* image */}

            <BlogBox
              id={postList[0].id}
              direction="right"
              delay={0.2}
              amount={0.3}
              author={postList[0].author.name}
              image={postList[0].img ? postList[0].img : `${img1}`}
              title={postList[0].title}
              latest={true}
            />
          </div>
        </div>

        {/* 2 images */}
        {/* <div className="flex flex-col lg:flex-row gap-10">
          <BlogBox
            direction="right"
            delay={0.2}
            amount={0.3}
            author={postList[1].author.name}
            image={img2}
            title={postList[1].title}
            latest={true}
          />
          <BlogBox
            direction="right"
            delay={0.2}
            amount={0.3}
            author={postList[2].author.name}
            image={img3}
            title={postList[2].title}
            latest={true}
          />
        </div> */}
      </div>
    </div>
  );
};

export default Blog;
