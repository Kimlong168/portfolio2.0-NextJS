"use client";
import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { scrollToTop } from "../utils/scrollToTop";
const GoToTop = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    });
  }, []);

  return (
    <div>
      {showScroll && (
        <div
          onClick={scrollToTop}
          className="z-[200] fixed animate-bounce right-5 bottom-5 rounded-full bg-white/20 hover:bg-violet-500 w-[40px] h-[40px] grid place-items-center cursor-pointer"
        >
          <FaArrowUp />
        </div>
      )}
    </div>
  );
};

export default GoToTop;
