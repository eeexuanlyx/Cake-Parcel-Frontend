import React from "react";
import { getMyOrders } from "../../api/api";
import { useQuery } from "@tanstack/react-query";
import { useUserContext } from "../../context/UserContext";

const MyOrders = () => {
  const { user } = useUserContext();

  const {
    data: orders = [],
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
    enabled: !!user,
  });

  const groupedOrders = orders.reduce((acc, order) => {
    const { invoice_id, order_date, status, ...productDetails } = order;
    const existingInvoice = acc.find(
      (group) => group.invoice_id === invoice_id
    );

    if (existingInvoice) {
      existingInvoice.products.push(productDetails);
    } else {
      acc.push({ invoice_id, order_date, status, products: [productDetails] });
    }

    return acc;
  }, []);

  if (isLoading) return <div>Loading your orders...</div>;

  return (
    <div className="bg-white shadow-md max-w-screen-lg rounded-lg container mx-auto mt-6 px-4 py-8 min-h-screen">
      <h1 className="text-2xl font-bold text-indigo-900 mb-4">My Orders</h1>
      {isError && <div className="text-red-500">{error.message}</div>}
      {orders.length === 0 ? (
        <div>No orders found!</div>
      ) : (
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead className="text-indigo-900">
            <tr>
              <th className="border px-2 py-2">Invoice ID</th>
              <th className="border px-2 py-2">Product Details</th>
              <th className="border px-2 py-2">Order Date</th>
              <th className="border px-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {groupedOrders.map(
              ({ invoice_id, order_date, status, products }) => (
                <tr key={invoice_id}>
                  <td className="border px-2 py-2">{invoice_id}</td>
                  <td className="border px-2 py-2">
                    {products.map((product, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded mb-1">
                        <div className="font-bold text-blue-600">
                          {product.name}
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
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="border px-2 py-2">{status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
