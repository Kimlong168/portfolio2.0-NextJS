import React from "react";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main>
      Dashboard navbar
      {children}
    </main>
  );
};

export default Layout;
