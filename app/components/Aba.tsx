import React from "react";
import Image from "next/image";
import AbaRiel from "../assets/abaRiel.jpg";
import { FaX } from "react-icons/fa6";

const Aba: React.FC = () => {
  return (
    <div className="relative bg-red-700">
      <div className="fixed inset-0  bg-black/60  z-[100]">
        <div className=" mt-14 rounded-md text-black overflow-hidden flex flex-col items-center md:w-[400px] md:h-[600px] mx-4 md:mx-auto">
          <Image src={AbaRiel} alt="" className="w-full h-full" />
        </div>
        <span className="w-8 h-8 cursor-pointer bg-red-600 hover:bg-blue-400 text-white grid place-items-center rounded-full top-4 right-4 md:top-8 md:right-8 absolute">
          <FaX />
        </span>
      </div>
    </div>
  );
};

export default Aba;

// backdrop-brightness-50
