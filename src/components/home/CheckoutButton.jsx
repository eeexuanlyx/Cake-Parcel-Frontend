import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutCart } from "../../api/api";
import { useUserContext } from "../../context/UserContext";

const CheckoutButton = ({ cartItems }) => {
  const queryClient = useQueryClient();
  const { userId } = useUserContext();
  const {
    mutate: handleCheckout,
    isLoading,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: checkoutCart,
    onSuccess: (data) => {
      console.log("Checkout successful:", data);
      // invalidate cart query to refresh cart items
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (error) => {
      console.error("Checkout failed:", error.response?.data || error.message);
    },
  });

  const handleClick = () => {
    const checkoutData = {
      userId,
      cartItems: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: parseFloat(item.price),
      })),
    };
    console.log(userId);

    console.log("Checkout payload:", checkoutData); // Log the payload
    handleCheckout(checkoutData); // Trigger the mutation
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleClick}
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Checkout"}
      </button>
      {isError && (
        <div className="text-red-500">
          Error: {error.response?.data?.error || "An error occurred"}
        </div>
      )}
      {data && (
        <div className="text-green-500">
          Checkout successful! Invoice ID: {data.invoiceId}
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
