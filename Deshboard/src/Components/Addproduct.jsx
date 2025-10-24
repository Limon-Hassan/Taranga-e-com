import React, { useState, useEffect } from "react";
import {
  Card,
  Input,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const AddProduct = () => {
  const api = import.meta.env.VITE_SERVER_URL;
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [categoriesFromBackend, setcategoriesFromBackend] = useState([]);
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [images, setImages] = useState([]);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]);
  };

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    axios
      .get(`${api}api/v3/category/getCategory`, { withCredentials: true })
      .then((response) => {
        console.log(response);
        let data = response.data?.data || response.data || [];
        const safeArray = Array.isArray(data) ? data : [data];
        setcategoriesFromBackend(safeArray);
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
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("description", description);
    formData.append("price", price);
    if (images.length > 0) {
      images.forEach((img) => {
        formData.append("photo", img);
      });
    }
    for (let [key, value] of formData.entries()) {
      console.log(key + " : " + value);
    }
    await axios
      .post(`${api}api/v3/product/AddProduct`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        setProductName("");
        setCategory("");
        setBrand("");
        setDescription("");
        setPrice("");
        setStock("");
        setWeight("");
        setImages([]);
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
            <Input
              color="blue"
              type="text"
              label="Product Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              required
              maxLength={50}
            />
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
          <div>
            <Typography variant="small" className="mb-3">
              stock *
            </Typography>
            <Input
              color="blue"
              type="number"
              label="stock"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              required
              min="1"
            />
          </div>
          <div>
            <Typography variant="small" className="mb-3">
              weight *
            </Typography>
            <Input
              color="blue"
              type="number"
              label="weight"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              min="1"
            />
          </div>
          <div className="w-full overflow-hidden">
            <Typography variant="small" className="mb-3">
              Description *
            </Typography>
            <ReactQuill
              theme="snow"
              value={description}
              modules={modules}
              onChange={(content, delta, source, editor) => {
                setDescription(content);
              }}
              required
              maxLength={400}
              className="h-[200px] w-full resize-none rounded border border-gray-300 bg-[#F5F5F5] p-4 text-[16px] font-normal text-black/50 outline-none"
            />
          </div>
        </div>

        <div className="mt-6">
          <Typography variant="small" className="mb-3">
            Upload Images
          </Typography>

          <div className="flex w-full flex-col items-center justify-center gap-4">
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
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative h-40 w-40">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`upload-${index}`}
                    className="h-full w-full rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
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
