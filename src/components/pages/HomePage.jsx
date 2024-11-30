import React from "react";
import Featured from "../home/Featured";
import ProductCards from "../home/ProductCards";
import Footer from "../home/Footer";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/api";

const HomePage = () => {
  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["products"], queryFn: getProducts });

  return (
    <div className="bg-gray-100 min-h-screen">
      <Featured
        products={products}
        isPending={isPending}
        isError={isError}
        error={error}
      />
      <div className="bg-gray-100 min-h-screen py-8">
        <h2 className="text-2xl font-bold text-center mb-4">Our Selections</h2>

        {isError && (
          <div>Error: {error?.message || "Failed to fetch products"}</div>
        )}
        {isPending && <div>Loading...</div>}

        {!isPending && !isError && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCards
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                sizes={product.sizes}
                img={product.img}
                type={product.type}
                flavours={product.flavours}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
