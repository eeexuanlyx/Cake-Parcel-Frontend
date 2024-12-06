import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus, viewOrders } from "../../api/api";

const AdminPage = () => {
  const queryClient = useQueryClient();
  const [showSysMsg, setShowSysMsg] = useState(false);

  const {
    data: invoices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["invoices"],
    queryFn: viewOrders,
  });

  const {
    mutate,
    isLoading: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updateOrderStatus,
    onSuccess: () => {
      setShowSysMsg(true);
      queryClient.invalidateQueries(["invoices"]);
    },
  });

  const handleUpdate = (invoice_id, value) => {
    const updatePayload = { id: invoice_id, status: value };
    mutate({ invoice_id, ...updatePayload });
  };

  // Group invoices by invoice_id
  const groupedInvoices = invoices.reduce((acc, invoice) => {
    if (!acc[invoice.invoice_id]) {
      acc[invoice.invoice_id] = {
        ...invoice,
        products: [invoice], // Create an array of products for this invoice_id
      };
    } else {
      acc[invoice.invoice_id].products.push(invoice); // Add additional products to the same invoice_id
    }
    return acc;
  }, {});

  const groupedInvoiceArray = Object.values(groupedInvoices).sort(
    (a, b) => b.invoice_id - a.invoice_id
  );

  if (isLoading || isUpdating) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {showSysMsg && (
        <div className="text-sm text-center text-green-500 mt-2">
          Status updated successfully!
        </div>
      )}
      {updateError && (
        <div className="text-sm text-red-500 mb-4">Failed to update.</div>
      )}
      <div className=" bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-2 py-8 min-h-screen">
        <h1 className="text-indigo-900 text-2xl font-bold mb-2">
          Customer Order Details
        </h1>
        <table className="text-xs table-auto border-collapse border border-gray-300 w-full">
          <thead className="text-indigo-900">
            <tr>
              <th className="border px-2 py-2">Invoice ID</th>
              <th className="border px-2 py-2 hidden md:table-cell">
                Name / Contact
              </th>
              <th className="border px-2 py-2 hidden lg:table-cell">Address</th>
              <th className="border px-2 py-2">Product Details</th>
              <th className="border px-2 py-2">Order Date</th>
              <th className="border px-2 py-2">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {groupedInvoiceArray.map((group) => {
              const { invoice_id, user_name, contact_number, products } = group;
              const {
                street_name,
                unit_number,
                postal_code,
                status,
                order_date,
              } = products[0];

              return (
                <tr key={invoice_id}>
                  <td className="border px-2 py-2">{invoice_id}</td>
                  <td className="border px-2 py-2 hidden md:table-cell">
                    <div className="font-bold text-blue-600">{user_name}</div>
                    <div className="text-green-600">{contact_number}</div>
                  </td>
                  <td className="border px-2 py-2 hidden lg:table-cell">
                    {street_name}, {unit_number}, {postal_code}
                  </td>
                  <td className="border px-2 py-2">
                    {products.map((product, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded mb-1">
                        <div className="font-bold text-blue-600">
                          {product.product_name}
                        </div>
                        <div className="text-gray-700">
                          {`${product.selected_size}, ${product.selected_flavour}`}
                        </div>
                        <div className="text-green-600">
                          Qty: {product.quantity}
                        </div>
                      </div>
                    ))}
                  </td>

                  <td className="border px-2 py-2">
                    {new Date(order_date).toLocaleString("en-US", {
                      timeZone: "Asia/Singapore", // GMT+8 timezone
                      year: "numeric",
                      month: "short", // "short" for abbreviated month name
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border px-2 py-2">
                    <select
                      value={status}
                      onChange={(e) => handleUpdate(invoice_id, e.target.value)}
                      className="p-1 border rounded-md"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
