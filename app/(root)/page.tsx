"use client";
import React, { useEffect, useState } from "react";
// import Header from "../components/Header";
import Banner from "../components/Banner";
import Nav from "../components/Nav";
import About from "../components/About";
import Services from "../components/Services";
import Work from "../components/Work";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Gallery from "../components/Gallery";
import Achievement from "../components/Achievement";
import BirthdayCard from "../components/BirthdayCard";
import { db } from "../lib/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

// Define a TypeScript interface for Post data
interface Post {
  id: string;
  title: string;
  content: string;
  img?: string;
  author: {
    name: string;
  };
}

const Home: React.FC = () => {
  const darkMode = true;
  const [postList, setPostList] = useState<Post[]>([]);

  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(
          query(postCollectionRef, orderBy("createdAt", "desc"))
        );
        setPostList(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post))
        );
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    getPosts();
  }, [postCollectionRef]);

  return (
    <div className={`overflow-hidden`}>
      <Banner />
      <Nav darkMode={darkMode} />
      <About />
      <Services />
      <Work />
      <Achievement />
      <Blog postList={postList} />
      <Gallery />
      <BirthdayCard />
      <Contact />
    </div>
  );
};

export default Home;
