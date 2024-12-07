import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkoutCart } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import { formatISO } from "date-fns";
import { useState } from "react";

const CheckoutButton = ({ cartItems, setCheckoutSuccess, setInvoiceId }) => {
  const [deliveryDate, setDeliveryDate] = useState(() => {
    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return formatISO(tomorrow, { representation: "date" });
  });

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
      setCheckoutSuccess(true);
      setInvoiceId(data.invoiceId);
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
        selected_size: item.selected_size,
        selected_flavour: item.selected_flavour,
      })),
      deliveryDate,
    };
    console.log(userId);

    console.log("Checkout payload:", checkoutData); // Log the payload
    handleCheckout(checkoutData); // Trigger the mutation
  };

  return (
    <div>
      <label className="block text-gray-700 font-bold mt-4">
        Select Delivery Date:
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          className="border rounded px-2 py-1 mt-2"
          min={formatISO(new Date(), { representation: "date" })}
        />
      </label>
      <div className="grid place-content-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded "
          onClick={handleClick}
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Checkout"}
        </button>
      </div>

      {isError && (
        <div className="text-red-500">
          Error: {error.response?.data?.error || "An error occurred"}
        </div>
      )}
    </div>
  );
};

export default CheckoutButton;
