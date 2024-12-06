import React from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
      <h2 className="text-indigo-900 text-2xl font-bold mb-6">About Us</h2>
      <p className="text-gray-700 font-corinthia text-3xl">Cake Parcel</p>
      <p className="px-2.5 pt-2">
        Welcome to Cake Parcel, your one-stop destination for delightful and
        customizable treats! We specialize in crafting beautiful and delicious
        cakes, cupcakes, and bento cakes tailored to your unique preferences.
        Whether you're celebrating a birthday, wedding, anniversary, or simply
        treating yourself, we’re here to bring your sweetest visions to life. At
        Cake Parcel, customization is at the heart of what we do. From flavors
        and designs to personalized messages, we work closely with you to ensure
        every order is as unique and special as the occasion it celebrates. Our
        talented bakers and decorators are dedicated to using high-quality
        ingredients and creating designs that are as stunning as they are
        delicious. We’re passionate about making your celebrations memorable,
        one bite at a time.{" "}
      </p>
      <p className="px-2.5 pt-4">
        Browse from{" "}
        <Link to="/" className="text-blue-500 underline">
          our selections
        </Link>{" "}
        or place your{" "}
        <Link to="/request" className="text-blue-500 underline">
          customization order
        </Link>{" "}
        today and let us create something truly special for you!
      </p>
    </div>
  );
};

export default AboutPage;
