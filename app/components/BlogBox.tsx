import React from "react";
import Link from "next/link";
// motion
import { motion } from "framer-motion";
// vartants
import { fadeIn } from "../utils/variants";
import Image from "next/image";
interface BlogBoxProps {
  image: string; // Assuming the image is a URL or path as a string
  author: string; // Assuming author is a string
  title: string; // Assuming title is a string
  direction: "left" | "right" | "up" | "down"; // Example: could be a limited set of values like 'left', 'right', or 'center'
  delay: number; // Assuming delay is a number (e.g., in milliseconds)
  amount: number; // Assuming amount is a number
  id: string; // Assuming id is a number
  latest?: boolean; // Optional boolean prop, defaulting to false if not provided
}

const BlogBox: React.FC<BlogBoxProps> = ({
  image,
  author,
  title,
  direction,
  delay,
  amount,
  id,
  latest = false,
}) => {
  const style = !latest ? { height: "250px" } : { height: "320px" };
  return (
    <motion.div
      variants={fadeIn(direction, delay)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: amount }}
      className="flex-1 group overflow-hidden relative border-2 border-white/50 rounded-xl cursor-pointer inline-block w-full max-h-[210px] min-h-[210px]  lg:max-h-[290px] lg:min-h-[290px] "
      style={style}
    >
      <Link href={`/blogs/${id}`}>
        {/* overlay */}
        <div className="bg-transparent w-full h-full z-40 absolute transition-all duration-300 p-r"></div>
        {/* img */}

        <Image
          width={100}
          height={100}
          className="scale-125 group-hover:scale-100 transition-all duration-500 object-cover w-full h-full"
          src={image}
          alt=""
        />

        {/* pretitle */}
        <div className="absolute -bottom-full left-12 group-hover:bottom-12 transition-all duration-500 z-50 w-full">
          <span className="bg-black/50 leading-10 line-clamp-1 w-full px-2 ">
            Author: {author}
          </span>
        </div>
        {/* title */}
        <div className="absolute group-hover:-bottom-full left-12 bottom-12 transition-all duration-500 z-50 w-full">
          <span className="text-xl text-white line-clamp-1 leading-10 bg-black/50 px-2 ">
            {title}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogBox;
