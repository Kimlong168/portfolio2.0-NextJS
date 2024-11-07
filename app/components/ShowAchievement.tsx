import React from "react";
// motion
import { motion } from "framer-motion";
// vartants
import { fadeIn } from "../utils/variants";
import Image, { StaticImageData } from "next/image";
interface ShowAchievementProps {
  image: StaticImageData; // URL or path to the image
  title: string; // Title of the achievement
  description: string; // Description of the achievement
}

const ShowAchievement: React.FC<ShowAchievementProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <motion.div
      variants={fadeIn("right", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      className="flex flex-col gap-6 md:flex-row md:gap-[100px] items-center "
    >
      <div className="flex-1 w-full">
        <h2 className="h3 font-medium text-blue-400 hover:text-pink-600 hover:border-b-4 cursor-pointer border-blue-500 transition-all">
          {title}
        </h2>
        <p>{description}</p>
      </div>
      <div className="flex-1 overflow-hidden max-w-[400px]">
        <Image
          className="rounded-xl w-full h-full hover:scale-110 transition-all cursor-pointer border-pink-600"
          src={image}
          alt="pic"
        />
      </div>
    </motion.div>
  );
};

export default ShowAchievement;
