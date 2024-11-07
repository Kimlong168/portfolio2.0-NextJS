"use client";
import React, { useState } from "react";

// icon
import { BsArrowUpRight } from "react-icons/bs";

interface SkillBoxProps {
  name: string; // Name of the skill
  description: string; // Description of the skill
  link: string; // URL link related to the skill (e.g., documentation, tutorial)
}

const SkillBox: React.FC<SkillBoxProps> = ({ name, description, link }) => {
  const [showMore, setShowMore] = useState(false);
  const show = showMore ? "" : "line-clamp-3";
  return (
    <div className="border-b border-white/20 pb-5 mb-[38px] flex gap-3">
      <div className="max-w-[476px]">
        <h4 className="text-[20px] tracking-wider font-primary font-semibold mb-6">
          {name}
        </h4>
        <p className={`font-secondary leading-tight ${show}`}>{description}</p>
      </div>
      <div className="flex flex-col items-end flex-1">
        <a
          href={link}
          className="btn w-9 h-9 grid place-items-center mb-[42px]"
        >
          <BsArrowUpRight className="text-[20px] text-white" />
        </a>
        <button
          className="text-gradient text-sm"
          onClick={() => setShowMore((prevState) => !prevState)}
        >
          {showMore ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default SkillBox;
