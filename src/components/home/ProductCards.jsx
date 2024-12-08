import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { addToCart } from "../../api/api";
import { useUserContext } from "../../context/UserContext";

const ProductCards = ({ id, name, description, sizes, img, flavours }) => {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedFlavour, setSelectedFlavour] = useState("");
  const [showSysMsg, setShowSysMsg] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useUserContext();

  const {
    mutate,
    isLoading: isUpdating,
    isError,
    error: addError,
  } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      setShowSysMsg(true);
      setSelectedSize("");
      setSelectedFlavour("");
    },
  });

  const handleAddToCart = () => {
    if (!user) {
      setMessage("Login to add to cart");
      return;
    }
    if (!selectedSize || !selectedFlavour) {
      setMessage("Please select a size and flavour!");
      return;
    }

    const selectedPrice = sizes[selectedSize];
    const cartItem = {
      product_id: id,
      name,
      selected_size: selectedSize,
      selected_flavour: selectedFlavour,
      quantity: 1, // default quantity
      price: selectedPrice,
    };
    setMessage("");
    mutate(cartItem, {
      onError: (addError) => {
        setMessage(`Failed to add to cart: ${addError.message}`);
      },
    });
  };

  return (
    <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row max-w-4xl mx-auto mb-6">
      {/* Image Section */}
      <img
        src={img}
        alt={name}
        className="w-full md:w-1/3 object-cover h-48 md:h-auto rounded-t-lg md:rounded-l-lg lg:min-w-[300px] "
      />

      {/* Content Section */}
      <div className="flex flex-col justify-between p-4 md:w-2/3">
        <div>
          <h2 className="text-2xl font-cookie font-bold mb-2">{name}</h2>
          <p className="text-gray-600 mb-4">{description}</p>

          {/* Size Dropdown */}
          <label htmlFor={`size-${id}`} className="block font-medium mb-1">
            Select Size:
          </label>
          <select
            id={`size-${id}`}
            className="border rounded p-2 w-full mb-3"
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option value="">Choose a size</option>
            {Object.entries(sizes).map(([size, price]) => (
              <option key={size} value={size}>
                {size} (${price})
              </option>
            ))}
          </select>

          {/* Flavour Dropdown */}
          <label htmlFor={`flavour-${id}`} className="block font-medium mb-1">
            Select Flavour:
          </label>
          <select
            id={`flavour-${id}`}
            className="border rounded p-2 w-full mb-3"
            value={selectedFlavour}
            onChange={(e) => setSelectedFlavour(e.target.value)}
          >
            <option value="">Choose a flavour</option>
            {flavours.map((flavour) => (
              <option key={flavour} value={flavour}>
                {flavour}
              </option>
            ))}
          </select>
        </div>
        <div className="h-6">
          {isUpdating && (
            <p className="text-sm text-gray-500">Adding to cart...</p>
          )}
          {isError && <p className="text-sm text-red-500">error</p>}
          {showSysMsg && (
            <p className="text-sm text-green-500">Item added successfully!</p>
          )}
          {message && <p className="text-sm text-red-500">{message}</p>}
        </div>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full mt-4"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
export default ProductCards;
