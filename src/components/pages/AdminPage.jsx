import React from "react";
import { useQuery } from "@tanstack/react-query";
import { viewOrders } from "../../api/api";

const AdminPage = () => {
  const {
    data: invoice = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["invoice"],
    queryFn: viewOrders,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Admin: Invoice Details</h1>
      <table className="table-auto border-collapse border border-gray-300 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Invoice ID</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Total Price</th>
            <th className="border px-4 py-2">Products</th>
            <th className="border px-4 py-2">Order Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoice.map((invoice) => (
            <tr key={invoice.invoice_id}>
              <td className="border px-4 py-2">{invoice.invoice_id}</td>
              <td className="border px-4 py-2">{invoice.user_name}</td>
              <td className="border px-4 py-2">
                {invoice.street_name}, {invoice.unit_number},{" "}
                {invoice.postal_code}
              </td>
              <td className="border px-4 py-2">{invoice.total_price}</td>
              <td className="border px-4 py-2">
                {`${invoice.selected_size}, ${invoice.selected_flavour} (${invoice.quantity})`}
              </td>
              <td className="border px-4 py-2">{invoice.order_date}</td>
              <td className="border px-4 py-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
