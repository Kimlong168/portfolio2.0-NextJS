import React from "react";
import SearchBar from "./SearchBar";
import img1 from "../assets/portfolio-img3.png";
import BlogBox from "./BlogBox";
interface Post {
  id: string;
  title: string;
  content: string;
  img?: string;
  author: {
    name: string;
  };
}
// Define the props for the BlogWrapper component
interface BlogWrapperProps {
  postList: Post[]; // An array of Post objects
}

const BlogWrapper: React.FC<BlogWrapperProps> = ({ postList }) => {
  const [showResult, setShowResult] = React.useState(false);
  return (
    <div>
      <div className="container mx-auto mt-20">
        <div className="text-gradient flex items-center mb-10 border-b rounded-r-full">
          <div className="flex justify-between items-center w-full py-2 pr-2 gap-3">
            <div className="font-bold whitespace-nowrap">
              {!showResult ? "All Blogs" : "Search"}
            </div>
            <div className="flex-2">
              <SearchBar setShowResult={setShowResult} />
            </div>
          </div>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto">
          {postList.map((post) => (
            // <Link to={`/blog?${post.id}`}>
            <BlogBox
              key={post.id}
              id={post.id}
              direction="right"
              delay={0.2}
              amount={0.3}
              author={post.author.name}
              image={post.img ? post.img : `${img1}`}
              title={post.title}
              latest={false}
            />
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogWrapper;
