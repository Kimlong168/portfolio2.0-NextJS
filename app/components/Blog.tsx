import React from "react";
import BlogBox from "./BlogBox";
import Link from "next/link";
import img1 from "../assets/portfolio-img1.png";
import { scrollToTop } from "../utils/scrollToTop";

// type
interface Post {
  id: string;
  title: string;
  content: string;
  img?: string;
  author: {
    name: string;
  };
}
interface BlogProps {
  postList: Post[];
}

const Blog: React.FC<BlogProps> = ({ postList }) => {
  if (postList.length < 3) return null;
  return (
    <div className="py-20 my-20 lg:mb-0" id="blog">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-x-10 lg:mb-10">
          <div className="flex-1 flex flex-col lg:flex-row gap-y-12 gap-10 mb-10 lg:mb-0">
            {/* text */}
            <div className="flex-1 lg:text-right lg:order-last">
              <h2 className="h2 leading-tight text-accent font-bold">
                My Blog.
              </h2>
              <p className="max-w-sm mb-16 lg:text-right lg:mr-0 lg:ml-auto">
                These are my personal blogs, I will share my knowledge and
                experience in web development, digital marketing, UX/UI design
                and also my life experience.
              </p>
              <Link href="/blogs" onClick={scrollToTop}>
                <button className="btn btn-sm">View all blogs</button>
              </Link>
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
        <div className="flex flex-col lg:flex-row gap-10">
          <BlogBox
            id={postList[1].id}
            direction="right"
            delay={0.2}
            amount={0.3}
            author={postList[1].author.name}
            image={postList[1].img ? postList[1].img : `${img1}`}
            title={postList[1].title}
            latest={true}
          />
          <BlogBox
            id={postList[2].id}
            direction="right"
            delay={0.2}
            amount={0.3}
            author={postList[2].author.name}
            image={postList[2].img ? postList[2].img : `${img1}`}
            title={postList[2].title}
            latest={true}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
