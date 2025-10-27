import React, { useState, useEffect } from "react";
import axios from "axios";

const Orderlist = () => {
  const api = import.meta.env.VITE_SERVER_URL;
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get(`${api}api/v3/checkout/AdminReadCheckout`)
      .then((res) => {
        console.log(res.data);
        setOrders(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, []);

  const totalOrders = orders.length;
  const successfulOrders = orders.filter(
    (order) => order.paymentStatus?.toLowerCase() === "success",
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.paymentStatus?.toLowerCase() === "pending",
  ).length;

  const filteredOrders = orders.filter((order) => {
    const productName = order.items?.[0]?.product?.name || "";
    const cartId = order.cartId || "";
    const uniqueOrderID = order.uniqueOrderID || "";
    return (
      productName.toLowerCase().includes(search.toLowerCase().trim()) ||
      cartId.toLowerCase().includes(search.toLowerCase().trim()) ||
      uniqueOrderID.toLowerCase().includes(search.toLowerCase().trim())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`${api}api/v3/checkout/deleteChechout?id=${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId),
      );
      alert("Order deleted successfully!");
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete order!");
    }
  };

  return (
    <section className="py-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Order List</h2>

          <div className="mb-4 flex flex-wrap justify-between rounded-lg bg-gray-100 p-4">
            <p>
              Total Orders:
              <span className="font-semibold text-blue-600">{totalOrders}</span>
            </p>
            <p>
              Successful Orders:
              <span className="font-semibold text-green-500">
                {successfulOrders}
              </span>
            </p>
            <p>
              Pending Orders:
              <span className="font-semibold text-yellow-600">
                {pendingOrders}
              </span>
            </p>
          </div>

          <div className="mb-4 flex gap-2">
            <input
              type="text"
              placeholder="Search by Product or Order ID..."
              className="w-full rounded border p-2 focus:border-blue-400 focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setCurrentPage(1)}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div className="w-full overflow-x-auto rounded-lg bg-white shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-100 text-left">
                  <th className="p-3">Product</th>
                  <th className="p-3">Order ID</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.length > 0 ? (
                  currentOrders.map((order) => {
                    const product = order.items?.[0]?.productId;
                    const productName = product?.name || "Unnamed Product";
                    const productImage = product?.photo?.[0] || "/mans.png";
                    const price = order.items?.[0]?.price || 0;
                    const quantity = order.items?.[0]?.quantity || 1;
                    const status = order.paymentStatus || "Pending";

                    return (
                      <tr key={order._id} className="border-b hover:bg-gray-50">
                        <td className="flex items-center gap-3 p-3">
                          <img
                            src={productImage}
                            alt={productName}
                            className="h-10 w-10 rounded object-cover"
                          />
                          <span>{productName}</span>
                        </td>
                        <td className="p-3 text-sm">{order.uniqueOrderID}</td>
                        <td className="p-3">{price}৳</td>
                        <td className="p-3">{quantity}</td>
                        <td
                          className={`p-3 font-semibold ${
                            status.toLowerCase() === "success"
                              ? "text-green-500"
                              : "text-yellow-600"
                          }`}
                        >
                          {status}
                        </td>
                        <td className="flex gap-3 p-3">
                          <button
                            onClick={() => handleDelete(order._id)}
                            className="text-red-500 hover:underline"
                          >
                            🗑 Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="p-4 text-center italic text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p>Showing {currentOrders.length} entries</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`rounded border px-3 py-1 ${
                  currentPage === 1
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100"
                }`}
              >
                ◀
              </button>
              <button className="rounded border bg-blue-500 px-3 py-1 text-white">
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
                disabled={
                  currentPage >= Math.ceil(filteredOrders.length / itemsPerPage)
                }
                className={`rounded border px-3 py-1 ${
                  currentPage >= Math.ceil(filteredOrders.length / itemsPerPage)
                    ? "cursor-not-allowed opacity-50"
                    : "hover:bg-gray-100"
                }`}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orderlist;
