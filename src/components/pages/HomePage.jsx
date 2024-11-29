import React from "react";
import Featured from "../home/Featured";
import CategoriesCards from "../home/CategoriesCards";
import Footer from "../home/Footer";

const HomePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Featured />
      <CategoriesCards />
      <Footer />
    </div>
  );
};

export default HomePage;
