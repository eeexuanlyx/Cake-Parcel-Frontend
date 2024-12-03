import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, removeFromCart, updateCartItem } from "../../api/api";
import CheckoutButton from "../home/CheckoutButton";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
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

  const {
    mutate: updateItem,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["cartItems"]); // Refresh cart items
    },
  });

  const handleUpdate = (id, field, value) => {
    const updatePayload = { [field]: value }; // Dynamically create payload
    updateItem({ id, ...updatePayload });
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setCartTotal(total);
    } else {
      setCartTotal(0);
    }
  }, [cartItems]);

  if (isLoading || isUpdating) return <div>Loading cart items...</div>;
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
                  <label>
                    {item.name}, {item.selected_size}
                  </label>
                  <label>
                    Flavor:
                    <select
                      className="border rounded w-22 text-center ml-1 px-1"
                      value={item.selected_flavour}
                      onChange={(e) =>
                        handleUpdate(
                          item.cart_id,
                          "selected_flavour",
                          e.target.value
                        )
                      }
                    >
                      <option value="Vanilla">Vanilla</option>
                      <option value="Chocolate">Chocolate</option>
                      <option value="Strawberry">Strawberry</option>
                    </select>
                  </label>
                  <label className="flex items-center">
                    Quantity:
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        handleUpdate(
                          item.cart_id,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                      className=" ml-1 border rounded w-14 text-center"
                    />
                  </label>
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
            Total: ${parseInt(cartTotal).toFixed(2)}
          </div>
          <CheckoutButton cartItems={cartItems} />
        </>
      )}
    </div>
  );
};

export default Cart;
