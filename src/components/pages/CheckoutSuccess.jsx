import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { checkoutCart, getCartItems } from "../../api/api";

const CheckoutSuccess = () => {
  const queryClient = useQueryClient();
  const [invoiceId, setInvoiceId] = useState(null);

  const {
    data: cartItems = [],
    isLoadingCart,
    isErrorCart,
    errorCart,
  } = useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartItems,
  });

  const {
    mutate: handleCheckout,
    isLoading,
    isError,
    data,
    error,
  } = useMutation({
    mutationFn: checkoutCart,
    onSuccess: (data) => {
      setInvoiceId(data.invoiceId);
      // invalidate cart query to refresh cart items
      queryClient.invalidateQueries(["cartItems"]);
    },
    onError: (error) => {
      console.error("Checkout failed:", error.response?.data || error.message);
    },
  });

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionId = new URLSearchParams(window.location.search).get(
          "session_id"
        );
        if (!sessionId) {
          throw new Error("Session ID not found in URL");
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_EXPRESS_BACKEND_URL
          }/api/retrieve-session?session_id=${sessionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to retrieve session from backend");
        }

        const sessionData = await response.json();

        // Ensure metadata and required fields exist
        if (!sessionData.metadata) {
          throw new Error("Session metadata is missing");
        }

        const checkoutData = {
          userId: sessionData.metadata.userId,
          cartItems,
          deliveryDate: sessionData.metadata.deliveryDate,
          deliverySlot: sessionData.metadata.deliverySlot,
        };

        handleCheckout(checkoutData);
      } catch (error) {
        console.error("Error in fetchSession:", error.message);
      }
    };

    if (!isLoadingCart && cartItems.length > 0) {
      // Proceed only when cartItems are loaded
      fetchSession();
    }
  }, [isLoadingCart, cartItems]);

  if (isLoading || isLoadingCart) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  if (isErrorCart) return <div>Error: {errorCart.message}</div>;

  return (
    <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
      Thank you for your purchase! Your invoice ID is : {invoiceId}
    </div>
  );
};

export default CheckoutSuccess;
