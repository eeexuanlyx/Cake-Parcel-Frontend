import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserProfile, updateProfile } from "../../api/api";
import Address from "./Address";
import useUserContext from "../../context/useUserContext";

const ProfilePage = () => {
  const { user } = useUserContext();

  // Input states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Error and message states
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [showSysMsg, setShowSysMsg] = useState(false);
  const [showAddress, setShowAddress] = useState(false);

  // Fetch user profile
  const {
    data: profile = {},
    isError: fetchError,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    enabled: !!user,
  });

  useEffect(() => {
    if (profile?.user_email) {
      setEmail(profile.user_email);
    }
  }, [profile]);

  // Update profile mutation
  const {
    mutate,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      setShowSysMsg(true);
      setError("");
      setPassword(""); // Reset password fields after successful update
      setConfirmPassword("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError(false);
    setError("");

    // Validate inputs
    if (!email.trim()) {
      setIsError(true);
      setError("Email is required.");
      return;
    }

    if (password && password.length < 12) {
      setIsError(true);
      setError("Password must be at least 12 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setError("Passwords do not match, please try again.");
      return;
    }

    // Prepare payload
    const payload = { email, password };
    mutate(payload);
  };

  const handleToggle = () => {
    setShowAddress((prev) => !prev); // Toggle between address and profile
  };

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <>
      {!showAddress ? (
        <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
          <h2 className="text-indigo-900 text-2xl font-bold mb-6">
            Profile Settings
          </h2>
          <p className="text-gray-700 font-corinthia text-3xl">
            Welcome, {profile.user_name}
          </p>
          <p>Update your account settings here.</p>

          {fetchError && (
            <div className="text-sm text-red-500 mb-4">
              Error fetching profile.
            </div>
          )}
          {showSysMsg && (
            <div className="text-sm text-green-500 mb-4">
              Profile updated successfully!
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
              className="bg-white shadow-md rounded-lg px-4 py-8 max-w-sm mx-auto mt-8"
              onSubmit={handleSubmit}
            >
              <div className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new email"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                    placeholder="Re-enter new password"
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
                  {isUpdating ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </form>
          )}
          <p className="text-center mt-3">
            Change Address?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleToggle}
            >
              Update here
            </span>
          </p>
        </div>
      ) : (
        <Address name={profile.user_name} />
      )}
    </>
  );
};

export default ProfilePage;
