import React, { useState, useEffect } from "react";
import axios from "axios";

const OrderDetails = () => {
  const api = import.meta.env.VITE_SERVER_URL;
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${api}api/v3/checkout/AdminReadCheckout`)
      .then((res) => {
        console.log(res);
        setOrders(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        console.error(err.message);
      });
  }, []);

  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <section className="py-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Order Details</h2>

          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Search by Order ID..."
              className="w-full rounded border p-2 focus:border-blue-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="w-full overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50">
                      <td className="p-3">{order._id}</td>
                      <td className="p-3">{order.name}</td>
                      <td className="p-3">{order.phone}</td>
                      <td className="p-3">{order.address}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center italic text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
