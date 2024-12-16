import React from "react";
import { formatISO } from "date-fns";
import { useState } from "react";
import useUserContext from "../../context/useUserContext";

const CheckoutButton = ({ cartItems }) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = formatISO(tomorrow, { representation: "date" });

  const [deliveryDate, setDeliveryDate] = useState(() => {
    return formatISO(tomorrow, { representation: "date" });
  });

  const [deliverySlot, setDeliverySlot] = useState("");
  const { user } = useUserContext();

  const handleClick = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_EXPRESS_BACKEND_URL
        }/api/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartItems,
            metadata: {
              userId: user?.id,
              deliveryDate,
              deliverySlot,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(
          `Checkout session creation failed: ${errorDetails.error}`
        );
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
      alert("There was an issue initiating the checkout. Please try again.");
    }
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
          min={minDate}
        />
      </label>
      <label className="block text-gray-700 font-bold mt-4">
        Delivery Time Slot:
        <select
          value={deliverySlot}
          onChange={(e) => setDeliverySlot(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="" disabled>
            Select a time slot
          </option>
          <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
          <option value="1:00 PM - 3:00 PM">1:00 PM - 3:00 PM</option>
          <option value="3:00 PM - 6:00 PM">3:00 PM - 6:00 PM</option>
        </select>
      </label>
      <div className="grid place-content-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded "
          onClick={handleClick}
        >
          Check out
        </button>
      </div>
    </div>
  );
};

export default CheckoutButton;
