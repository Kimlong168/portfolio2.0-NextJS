import React from "react";
import { FaX } from "react-icons/fa6";

interface CVOptionProps {
  setShowCVOption: React.Dispatch<React.SetStateAction<boolean>>; // Function to update the state
}

const CVOption: React.FC<CVOptionProps> = ({ setShowCVOption }) => {
  const PNG_FILE_URL = "https://kimlongchann.netlify.app/ChannKimlong_CV.png";
  const PDF_FILE_URL = "https://kimlongchann.netlify.app/ChannKimlong_CV.PDF";

  const downloadFileAtURL = (url: string): void => {
    const fileName = url.split("/").pop();
    if (!fileName) {
      console.error("Could not determine the file name from the URL");
      return;
    }

    const aTag = document.createElement("a");
    aTag.href = url;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove();
  };
  return (
    <div className=" bg-red-700 ">
      <div className="fixed inset-0 backdrop-blur-sm z-[1000] grid place-items-center">
        <div
          className="bg-white/20 opacity-80
         text-black w-[300px]  relative p-6 rounded-xl"
        >
          <div className="text-center pb-5 font-bold text-3xl text-green-500 uppercase">
            Download as
          </div>
          <div className=" flex gap-8 items-center justify-center ">
            <div
              onClick={() => downloadFileAtURL(PDF_FILE_URL)}
              className="cursor-pointer border px-8 py-1 rounded-full text-white font-bold bg-red-600 hover:bg-transparent hover:text-red-600 hover:border-red-600"
            >
              PDF
            </div>
            <div
              onClick={() => downloadFileAtURL(PNG_FILE_URL)}
              className="cursor-pointer border px-8 py-1 rounded-full text-white font-bold bg-blue-600 hover:bg-transparent hover:text-blue-600 hover:border-blue-600"
            >
              PNG
            </div>
          </div>
          <span
            onClick={() => setShowCVOption(false)}
            className="w-6 h-6 text-xs cursor-pointer bg-red-600 text-white grid place-items-center rounded-full right-2 top-2 absolute"
          >
            <FaX />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CVOption;
