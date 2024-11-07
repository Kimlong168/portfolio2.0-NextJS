"use client";

import React from "react";
import Link from "next/link";
import GradientBtn from "./GradientBtn";
import { FaSun, FaMoon } from "react-icons/fa";
// Images
import Logo from "../assets/logo.png";
import Image from "next/image";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <header className="py-8" id="top">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* logo */}
          <Link href="/">
            <Image src={Logo} alt="Logo" />
          </Link>
          {/* button */}
          <div className="flex gap-8 items-center">
            <button
              type="button"
              onClick={toggleTheme} // Toggle dark mode
              className="bg-white/10 grid place-items-center cursor-pointer w-10 h-10 rounded-full hover:bg-white/30 transition-all"
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>
            <GradientBtn
              content="Work with me"
              link="https://t.me/kimlong_chann"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
