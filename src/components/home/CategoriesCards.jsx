import React from "react";

const CategoriesCards = () => {
  return (
    <div>
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Our Cake Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.7jhK7Hsj-NCOQfBsfg6GRQHaEo&pid=Api&P=0&h=180"
              alt="Product Image"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold">Product Name</h2>
              <p className="text-gray-500">Product Description</p>
              <p className="text-lg font-bold">$99.99</p>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CategoriesCards;
