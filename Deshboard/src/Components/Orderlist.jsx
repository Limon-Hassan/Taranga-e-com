import React, { useState, useEffect } from "react";
import axios from "axios";

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalOrders = orders.length;
  const successfulOrders = orders.filter(
    (order) => order.status === "Success",
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  useEffect(() => {
    axios
      .get("http://localhost:5990/api/v1/orders")
      .then((response) => setOrders(response.data.orders))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.productName.toLowerCase().includes(search.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Order List</h2>

            <div className="mb-4 flex justify-between rounded-lg bg-gray-100 p-4">
              <p>
                Total Orders:{" "}
                <span className="font-semibold">{totalOrders}</span>
              </p>
              <p>
                Successful Orders:{" "}
                <span className="font-semibold text-green-500">
                  {successfulOrders}
                </span>
              </p>
              <p>
                Pending Orders:{" "}
                <span className="font-semibold text-gray-500">
                  {pendingOrders}
                </span>
              </p>
            </div>

            <div className="mb-4 flex gap-2">
              <input
                type="text"
                placeholder="Search here..."
                className="w-full rounded border p-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="rounded bg-blue-500 px-4 py-2 text-white">
                Search
              </button>
            </div>

            <div className="w-full overflow-x-auto rounded-lg bg-white p-4 shadow-md">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b bg-gray-100">
                    <th className="p-3 text-left">Product</th>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Price</th>
                    <th className="p-3 text-left">Quantity</th>
                    <th className="p-3 text-left">Status</th>
                    <th className="p-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="flex items-center gap-3 p-3">
                      <img
                        src="/mans.png"
                        alt="Product 1"
                        className="h-10 w-10 rounded"
                      />
                      <span>Product 1</span>
                    </td>
                    <td className="p-3">#123456</td>
                    <td className="p-3">$100.00</td>
                    <td className="p-3">2</td>
                    <td className="p-3 font-semibold text-green-500">
                      Success
                    </td>
                    <td className="flex gap-3 p-3">
                      <button className="text-green-500">✏ Edit</button>
                      <button className="text-red-500">🗑 Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p>Showing {currentOrders.length} entries</p>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  className="rounded border px-3 py-1"
                >
                  ◀
                </button>
                <button className="border bg-blue-500 px-3 py-1 text-white">
                  {currentPage}
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(
                        prev + 1,
                        Math.ceil(filteredOrders.length / itemsPerPage),
                      ),
                    )
                  }
                  className="rounded border px-3 py-1"
                >
                  ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orderlist;
