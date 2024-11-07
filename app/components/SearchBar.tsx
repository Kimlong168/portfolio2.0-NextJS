"use client";
import React, { useState } from "react";

interface SearchBarProps {
  // setSearchQuery: (query: string) => void; // Function to set the search query
  setShowResult: (show: boolean) => void; // Function to control showing/hiding results
}

const SearchBar: React.FC<SearchBarProps> = ({ setShowResult }) => {
  const [search, setSearch] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // setSearchQuery(search); // Set the search query
    setShowResult(true); // Show search results
  };

  console.log(search);

  return (
    <div>
      <div className="mx-auto ">
        <form action="" className="relative mx-auto" onSubmit={handleSubmit}>
          <input
            onBlur={() => {
              setShowResult(false);
            }}
            onFocus={() => setShowResult(true)}
            type="search"
            name="search"
            onChange={(e) => setSearch(e.target.value)}
            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:border-white focus:pl-16 focus:pr-4 text-white"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent stroke-gray-500 px-3.5 peer-focus:border-white peer-focus:stroke-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
