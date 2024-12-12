import React from "react";
import { useQuery } from "@tanstack/react-query";
import { viewRequests } from "../../api/api";

const AdminPageRequests = () => {
  const {
    data: requests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["requests"],
    queryFn: viewRequests,
  });

  if (isLoading) return <p>Loading... </p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-2 py-8 min-h-screen">
      <h1 className="text-indigo-900 text-2xl font-bold mb-2">
        Customer Requests Details
      </h1>
      <table className="text-xs table-auto border-collapse border border-gray-300 w-full">
        <thead className="text-indigo-900">
          <tr>
            <th className="border px-2 py-2">Request ID</th>
            <th className="border px-2 py-2 hidden md:table-cell">Image</th>
            <th className="border px-2 py-2 hidden lg:table-cell">Title</th>
            <th className="border px-2 py-2">Description</th>
            <th className="border px-2 py-2">Customer</th>
            <th className="border px-2 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border px-2 py-2">{request.id}</td>
              <td className="border px-2 py-2 hidden md:table-cell">
                {request.image_url ? (
                  <img
                    src={request.image_url}
                    alt={request.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td className="border px-2 py-2 hidden lg:table-cell">
                {request.title}
              </td>
              <td className="border px-2 py-2">{request.description}</td>
              <td className="border px-2 py-2">{request.user_name}</td>
              <td className="border px-2 py-2">{request.user_email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPageRequests;
