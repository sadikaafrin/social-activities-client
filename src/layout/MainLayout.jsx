import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
  
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow max-w-7xl w-full mx-auto mt-4 px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
