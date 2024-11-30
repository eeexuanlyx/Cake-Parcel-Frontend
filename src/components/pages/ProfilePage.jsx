import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../../api/api";
import { useUserContext } from "../../context/UserContext";

const ProfilePage = () => {
  const { user } = useUserContext();

  const {
    data: profile = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
    enabled: !!user,
  });

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div>
      {isError && (
        <div>Error: {error?.message || "Failed to fetch profile"}</div>
      )}
      {isPending && <div>Loading...</div>}
      <h1>Welcome, {profile.user_name}</h1>
      <p>Email: {profile.user_email}</p>
    </div>
  );
};

export default ProfilePage;
