import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAddressContact, updateAddressContact } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import ProfilePage from "./ProfilePage";

const Address = (props) => {
  const { user } = useUserContext();

  const [streetName, setStreetName] = useState("");
  const [unitNumber, setUnitNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showSysMsg, setShowSysMsg] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const {
    data: addressData = {},
    isError: fetchError,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["addressData"],
    queryFn: getAddressContact,
    enabled: !!user,
  });

  useEffect(() => {
    if (addressData) {
      setStreetName(addressData.street_name || "");
      setUnitNumber(addressData.unit_number || "");
      setPostalCode(addressData.postal_code || "");
      setContactNumber(addressData.contact_number || "");
    }
  }, [addressData]);

  const {
    mutate,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateAddressContact, // Function to send updated address to the backend
    onSuccess: () => {
      setShowSysMsg(true);
      setStreetName("");
      setUnitNumber("");
      setPostalCode("");
      setContactNumber("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    const payload = {
      street_name: streetName,
      unit_number: unitNumber,
      postal_code: postalCode,
      contact_number: contactNumber,
    };
    mutate(payload);
  };

  const handleToggle = () => {
    setShowProfile((prev) => !prev);
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
      {!showProfile ? (
        <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
          <p className="text-gray-700 font-corinthia text-3xl">
            Welcome, {props.user_name}
          </p>
          {fetchError && (
            <div className="text-sm text-red-500 mb-4">
              Error fetching Address/ Contact.
            </div>
          )}
          {showSysMsg && (
            <div className="text-sm text-green-500 mb-4">
              Address/ Contact updated successfully!
            </div>
          )}
          {isError && <div className="text-sm text-red-500 mb-4">{error}</div>}
          {updateError && (
            <div className="text-sm text-red-500 mb-4">
              {updateError.message}
            </div>
          )}

          {isFetching ? (
            <div className="text-center">Loading profile...</div>
          ) : (
            <form
              className="bg-white shadow-md rounded-lg px-4 py-8 max-w-sm mx-auto mt-11"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="street_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Street Name
                  </label>
                  <input
                    type="text"
                    id="street_name"
                    value={streetName}
                    onChange={(e) => setStreetName(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new street name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="unit_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Unit Number
                  </label>
                  <input
                    type="text"
                    id="unit_number"
                    value={unitNumber}
                    onChange={(e) => setUnitNumber(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new unit number"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postal_code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postal_code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new postal code"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact_number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="text"
                    id="contact_number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new contact number"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className={`w-full py-2 px-4 font-bold rounded-md ${
                    isUpdating
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-700 text-white"
                  }`}
                >
                  {isUpdating ? "Updating..." : "Update Address or Contact"}
                </button>
              </div>
            </form>
          )}
          <p className="text-center mt-3">
            Change Account Settings?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleToggle}
            >
              Update here
            </span>
          </p>
        </div>
      ) : (
        <ProfilePage />
      )}
    </>
  );
};

export default Address;
