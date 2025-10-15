import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesFromBackend, setcategoriesFromBackend] = useState([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5990/api/v1/category/getAllCategories")
      .then((response) => {
        setcategoriesFromBackend(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching categoriesFromBackend:", error);
      });
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productName);
    formData.append("category", category);
    formData.append("brand", brand);
    formData.append("description", description);
    formData.append("price", price);

    if (image) {
      formData.append("photo", image);
    }
    for (let [key, value] of formData.entries()) {
      console.log(key + " : " + value);
    }
    await axios
      .post("http://localhost:5990/api/v1/products/addProducts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        setProductName("");
        setCategory("");
        setBrand("");
        setDescription("");
        setPrice("");
        setImage("");
        toast.success("Product added SuccessFully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          toast.error(error.response.data.msg || "Something went wrong", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            draggable: true,
          });
        }
      });
  };

  return (
    <Card className="mx-auto w-full max-w-5xl p-6 shadow-lg">
      <Typography variant="h4" className="mb-4 text-lg">
        Add Product
      </Typography>
      <form noValidate>
        <div className="flex flex-col gap-4">
          <div>
            <Typography variant="small" className="mb-3">
              Product Name *
            </Typography>
            <Input
              color="blue"
              type="text"
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              maxLength={50}
            />
          </div>

          <div>
            <Typography variant="small" className="mb-3">
              Category *
            </Typography>
            <Select
              value={category}
              onChange={(value) => {
                console.log("Selected Category:", value);
                setCategory(value);
              }}
              required
            >
              {categoriesFromBackend.length > 0 ? (
                categoriesFromBackend.map((cat) => (
                  <Option key={cat._id} value={cat._id}>
                    {cat.name}
                  </Option>
                ))
              ) : (
                <Option disabled>No Categories Found</Option>
              )}
            </Select>
          </div>

          <div>
            <Typography variant="small" className="mb-3">
              Brand *
            </Typography>
            <Select
              value={brand}
              onChange={(value) => setBrand(value)}
              required
            >
              <Option value="Brand A">Brand A</Option>
              <Option value="Brand B">Brand B</Option>
              <Option value="Brand C">Brand C</Option>
            </Select>
          </div>

          <div>
            <Typography variant="small" className="mb-3">
              Price *
            </Typography>
            <Input
              color="blue"
              type="number"
              label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1"
            />
          </div>

          <div className="w-full">
            <Typography variant="small" className="mb-3">
              Description *
            </Typography>
            <Textarea
              color="blue"
              type="text"
              label="Description"
              className="h-[200px] w-full resize-none rounded border border-gray-300 bg-[#F5F5F5] p-4 text-[16px] font-normal text-black/50 outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              maxLength={500}
            />
          </div>
        </div>

        <div className="mt-6">
          <Typography variant="small" className="mb-3">
            Upload Images
          </Typography>
          <div className="flex w-full items-center justify-center">
            <label
              htmlFor="dropzone-file"
              className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pb-6 pt-5">
                <i className="fa-light fa-cloud-arrow-up mb-3 text-[30px] text-blue-600"></i>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
              <input
                id="dropzone-file"
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                accept="image/*"
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button color="blue" onClick={handleAddProduct}>
            Add Product
          </Button>
          <Button color="gray">Save Product</Button>
          <Button color="gray" variant="outlined">
            Schedule
          </Button>
        </div>
        <ToastContainer />
      </form>
    </Card>
  );
};

export default AddProduct;
