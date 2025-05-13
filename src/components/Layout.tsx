
import React, { memo } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container py-6 animate-fade-in">
        {children}
      </main>
      <Footer />
    </div>
  );
};

// Use memo to prevent unnecessary re-renders
export default memo(Layout);
