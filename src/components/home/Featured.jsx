import React from "react";

const Featured = () => {
  return (
    <div>
      <section className="bg-cover bg-center bg-no-repeat h-96 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold">Sweeten Your Moments</h1>
          <p className="text-lg mt-4">Delicious cakes for every occasion</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Order Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Featured;
