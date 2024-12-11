import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCartItems, removeFromCart, updateCartItem } from "../../api/api";
import CheckoutButton from "../home/CheckoutButton";

const Cart = () => {
  const [cartTotal, setCartTotal] = useState(0);
  const queryClient = useQueryClient();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [invoiceId, setInvoiceId] = useState(null);

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
      setCheckoutSuccess(false);
      setInvoiceId(null);
    } else {
      setCartTotal(0);
    }
  }, [cartItems]);

  if (isLoading || isUpdating) return <div>Loading cart items...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 sm:px-6 py-8 min-h-screen">
      <h2 className="text-indigo-900 text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Your Cart
      </h2>
      <p>Update your address before checking out.</p>
      {checkoutSuccess && invoiceId && (
        <div className="text-green-500 mt-4">
          Checkout Successful! Your Invoice ID is: <strong>{invoiceId}</strong>
        </div>
      )}

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500 text-base sm:text-lg">
          Your cart is empty!
        </div>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item.cart_id}
                className="border-b py-4 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0"
              >
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-20 h-20 md:w-16 md:h-16 object-cover rounded"
                />

                <div className="flex flex-col items-start ml-0 md:ml-4 w-full">
                  <label className="text-base sm:text-lg font-medium text-gray-700">
                    {item.name}, {item.selected_size}
                  </label>
                  <label className="flex items-center mt-2 text-sm sm:text-base w-full">
                    <span className="w-20">Flavor:</span>
                    <select
                      className="border rounded w-28 text-left px-1 text-gray-700"
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
                  <label className="flex items-center mt-2 text-sm sm:text-base w-full">
                    <span className="w-20">Quantity:</span>
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
                      className="border rounded w-16 text-left px-1"
                    />
                  </label>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0 ml-auto md:ml-0">
                  <button
                    className="text-red-500 text-sm sm:text-base"
                    onClick={() => handleRemove(item.cart_id)}
                    disabled={isLoadingRemove}
                  >
                    {isLoadingRemove ? "Removing..." : "Remove"}
                  </button>
                  {removeError && (
                    <div className="text-xs text-red-500 mt-1">
                      Failed to remove.
                    </div>
                  )}
                  {updateError && (
                    <div className="text-xs text-red-500 mt-1">
                      Failed to update.
                    </div>
                  )}
                  <div className="font-bold text-base sm:text-base">
                    ${item.price}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="text-right mt-6 font-bold text-base sm:text-base">
            Total: ${parseInt(cartTotal).toFixed(2)}
          </div>
          <div className="flex justify-center sm:justify-end mt-4">
            <CheckoutButton
              cartItems={cartItems}
              setCheckoutSuccess={setCheckoutSuccess}
              setInvoiceId={setInvoiceId}
            />
          </div>
          {checkoutSuccess && (
            <div className="text-green-500 mt-4 text-center">
              Checkout Successful!
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Cart;
