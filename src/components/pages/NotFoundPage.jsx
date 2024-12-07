import React from "react";

const NotFoundPage = () => {
  return (
    <>
      <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
        <h2 className="text-indigo-900 text-2xl font-bold mb-6">
          404 - Page Not Found
        </h2>
        <p>The page you are looking for does not exist.</p>
        <a
          href="/"
          className="mt-4 inline-block rounded-lg bg-blue-500 hover:bg-blue-700 px-3 py-2 text-white "
        >
          Back to homepage
        </a>
      </div>
    </>
  );
};

export default NotFoundPage;
