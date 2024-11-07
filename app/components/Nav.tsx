import React from "react";
// import icons
import { BiHomeAlt, BiUser } from "react-icons/bi";
import { BsClipboardData, BsBriefcase, BsChatSquare } from "react-icons/bs";
import { FaBlog } from "react-icons/fa";
// link
import { Link } from "react-scroll";
import { useTheme } from "../context/ThemeContext";

const Nav: React.FC = () => {
  const { isDarkMode } = useTheme();
  const border = isDarkMode ? "border-white/20 border" : "";
  return (
    <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
      <div className="container mx-auto">
        <div
          className={`w-full  h-[96px] backdrop-blur-2x1
        rounded-full max-w-[460px] mx-auto px-5 flex justify-between items-center text-2x1
        text-white/50 ${border}`}
        >
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            offset={-230}
            to="home"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <BiHomeAlt />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="about"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <BiUser />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="service"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <BsClipboardData />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="work"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <BsBriefcase />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="blog"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <FaBlog />
          </Link>
          <Link
            activeClass="active"
            smooth={true}
            spy={true}
            to="contact"
            className="cursor-pointer w-[55px] h-[55px] md:w-[60px] md:h-[60px] flex items-center rounded-full
justify-center"
          >
            <BsChatSquare />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
