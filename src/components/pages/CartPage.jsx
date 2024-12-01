import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, removeFromCart } from "../../api/api";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState("");
  const queryClient = useQueryClient();

  const {
    data: cartItems = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const {
    mutate: removeItem,
    isLoading: isLoadingRemove,
    error: removeError,
  } = useMutation({
    mutationFn: removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]); // Refresh cart items
    },
    onError: (error) => {
      console.error("Error removing item:", error.message);
    },
  });

  const handleRemove = (id) => {
    removeItem(id);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCartTotal(total);
    }
  }, [cartItems]);

  if (isLoading) return <div>Loading cart items...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty!</div>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.cart_id}
                className="border-b py-4 flex items-start mx-4"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex flex-col items-start ml-4">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                  <p>
                    {item.selected_size} - {item.selected_flavour}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleRemove(item.cart_id)}
                  disabled={isLoadingRemove}
                >
                  {isLoadingRemove ? "Removing..." : "Remove"}
                  {removeError && (
                    <div className="text-sm text-red-500 mb-4">
                      Failed to remove.
                    </div>
                  )}
                </button>
                <div className="ml-auto text-right font-bold text-lg">
                  ${item.price}
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right mt-4 font-bold text-xl">
            Total: ${cartTotal}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
