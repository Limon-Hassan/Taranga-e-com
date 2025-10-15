import { Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Axios from "axios";

const CategoryList = () => {
  let [GetallCategories, setGetallCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await Axios.get(
          "http://localhost:5990/api/v1/category/getAllCategories",
        );
        console.log(response.data.data);
        setGetallCategories(response.data.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section>
        <div className="mx-auto max-w-[1400px]">
          <div className="mt-8 w-full rounded-2xl bg-white p-4 shadow-lg">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">All Categories</h2>
              <div className="w-[450px]">
                <Input
                  color="blue"
                  label="Search..."
                  className="fant placeholder:font-Oi_kiree"
                />
              </div>
              <button className="rounded-lg border border-red-400 px-[42px] py-[12px] text-[20px] text-red-500 duration-300 ease-in-out hover:bg-red-500 hover:text-white">
                <span>+</span> Add category
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2">Categorys</th>
                    <th className="px-4 py-2">Category ID</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Sale</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {GetallCategories.length > 0 ? (
                    GetallCategories.map((category) => (
                      <tr key={category._id} className="border-b">
                        <td className="flex items-center gap-[20px] px-4 py-3">
                          <img
                            src={category.Image || "/mans.png"} 
                            alt={category.name}
                            className="h-10 w-10 rounded-lg"
                          />
                          {category.name}
                        </td>
                        <td className="px-4 py-3">{category._id}</td>
                        <td className="px-4 py-3">
                          {category.quantity || "N/A"}
                        </td>
                        <td className="px-4 py-3">{category.sale || "0"}</td>
                        <td className="px-4 py-3">
                          <i className="fa-light fa-pen-line mr-[20px] cursor-pointer text-[24px] text-green-500"></i>
                          <i className="fa-light fa-trash cursor-pointer text-[24px] text-red-400"></i>
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
              <p>Showing {GetallCategories.length} entries</p>
              <div className="flex items-center gap-2">
                <button className="rounded bg-gray-200 px-3 py-1">◀</button>
                <button className="rounded bg-gray-200 px-3 py-1">1</button>
                <button className="rounded bg-blue-500 px-3 py-1 text-white">
                  2
                </button>
                <button className="rounded bg-gray-200 px-3 py-1">3</button>
                <button className="rounded bg-gray-200 px-3 py-1">▶</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;
