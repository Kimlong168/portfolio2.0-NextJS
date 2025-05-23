
import React from "react";
import BlogWrapper from "../../components/BlogWrapper";
import BlogInBlogPage from "../../components/BlogInBlogPage";
import Head from "next/head"; // Next.js built-in Head component
import { db } from "../../lib/firebase";
import { getDocs, collection, query, orderBy } from "firebase/firestore";

interface Post {
  id: string;
  title: string;
  content: string;
  img?: string;
  length: number;
  createdAt: string;
  author: {
    name: string;
  };
}

const BlogPage = async () => {
  // Replace this with actual logic to fetch posts

  // const [postList, setPostList] = useState<Post[]>([]);
  let postList: Post[] = [];
  const postCollectionRef = collection(db, "posts");
  try {
    const data = await getDocs(
      query(postCollectionRef, orderBy("createdAt", "desc"))
    );

    postList = data.docs.map((doc) => {
      const docData = doc.data();

      // Convert Firestore Timestamp to JS Date
      const createdAt = docData.createdAt?.toDate
        ? docData.createdAt.toDate()
        : null;

      return {
        ...docData,
        id: doc.id,
        createdAt,
      } as Post;
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
  }

  // useEffect(() => {
  //   const postCollectionRef = collection(db, "posts");
  //   const getPosts = async () => {
  //     try {
  //       const data = await getDocs(
  //         query(postCollectionRef, orderBy("createdAt", "desc"))
  //       );
  //       setPostList(
  //         data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Post))
  //       );
  //     } catch (error) {
  //       console.error("Error fetching posts:", error);
  //     }
  //   };

  //   getPosts();
  // }, []);

  // Check if postList is empty and handle it
  if (postList.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center ">
        <p className="text-xl text-white">No blog posts available.</p>
      </div>
    );
  }

  return (
    <div className={`bg-no-repeat bg-cover min-h-screen overflow-hidden pb-24`}>
      {/* Head component for managing the document head in Next.js */}
      <Head>
        <title>Kimlong Chann | Blogs</title>
        <meta
          name="description"
          content="Welcome to my blogs website - Kimlong Chann"
        />
      </Head>

      {/* BlogInBlogPage and BlogWrapper components */}
      <BlogInBlogPage postList={postList} />
      <BlogWrapper postList={postList} />
    </div>
  );
};

export default BlogPage;
