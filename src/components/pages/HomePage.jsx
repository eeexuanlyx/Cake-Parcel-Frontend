import React, { useState } from "react";
import Featured from "../home/Featured";
import ProductCards from "../home/ProductCards";
import Footer from "../home/Footer";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../api/api";
import Search from "../home/Search";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");

  const {
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", searchTerm, filterType],
    queryFn: () => getProducts({ search: searchTerm, type: filterType }),
  });

  const handleSearch = (e) => setSearchTerm(e.target.value);
  const handleFilterChange = (e) => setFilterType(e.target.value);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Featured />
      <Search
        searchTerm={searchTerm}
        filterType={filterType}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
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
