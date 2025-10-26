import { Input } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const api = import.meta.env.VITE_SERVER_URL;
  const [GetallProducts, setGetallProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${api}api/v3/product/getProduct`)
      .then((response) => {
        console.log(response.data);
         let data = response.data?.data || response.data || [];
         const safeArray = Array.isArray(data) ? data : [data];
         setGetallProducts(safeArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleProDeleted = async (id) => {
    try {
      const res = await axios.delete(
        `${api}api/v3/product/deleteProduct?id=${id}`,
        { withCredentials: true },
      );

      setGetallProducts((prev) => prev.filter((item) => item._id !== id));

      console.log(res.data.msg);

      setTimeout(() => {
        axios
          .get(`${api}api/v3/product/getProduct`)
          .then((res) => setGetallProducts(res.data));
      }, 1500);
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <div className="mt-8 w-full rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Products</h2>
              <div className="w-[450px]">
                <Input color="blue" label="Search..." />
              </div>
              <Link
                to="/addproduct"
                className="rounded-lg border border-red-400 px-[42px] py-[12px] text-[20px] text-red-500 duration-300 ease-in-out hover:bg-red-500 hover:text-white"
              >
                <span>+</span> Add Product
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Product ID</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Stock</th>
                    <th className="px-4 py-2">Category</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {GetallProducts.length > 0 ? (
                    GetallProducts?.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="flex items-center gap-2 px-4 py-3">
                          <img
                            src={product.photo?.[0] || "/default-image.png"}
                            alt={product.name}
                            className="h-10 w-10 rounded-lg"
                          />
                          {product.name}
                        </td>
                        <td className="px-4 py-3">#{product._id}</td>
                        <td className="px-4 py-3">৳{product.price}</td>
                        <td className="px-4 py-3">
                          {product.stock > 0 ? product.stock : "out of stock"}
                        </td>
                        <td className="px-4 py-3">
                          {Array.isArray(product.category) &&
                          product.category.length > 0
                            ? product.category.map((cat, index) => (
                                <span key={cat._id}>
                                  {cat.name}
                                  {index !== product.category.length - 1
                                    ? ", "
                                    : ""}
                                </span>
                              ))
                            : "N/A"}
                        </td>

                        <td className="px-4 py-3">
                          <i
                            onClick={() => handleProDeleted(product._id)}
                            className="fa-light fa-trash cursor-pointer text-[24px] text-red-400"
                          ></i>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="py-4 text-center text-gray-500"
                      >
                        No products found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mb-5 mt-8 flex items-center justify-between text-sm text-gray-600">
              <p>Showing {GetallProducts.length} entries</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductList;
