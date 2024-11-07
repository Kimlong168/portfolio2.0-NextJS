"use client";
import React from "react";
import Header from "../components/Header";
import GoToTop from "../components/GoToTop";
import { useTheme } from "../context/ThemeContext";
const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isDarkMode } = useTheme();
  const style = isDarkMode ? "bg-black" : "bg-site bg-cover bg-no-repeat";
  return (
    <main className={style}>
      <Header />
      {children}
      <GoToTop />
    </main>
  );
};

export default Layout;
