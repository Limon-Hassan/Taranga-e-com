import React, { useState, useRef, useMemo } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";

const AddCategory = () => {
  const api = import.meta.env.VITE_SERVER_URL;
  const editor = useRef(null);
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Write your content here...",
      height: 400,
      autofocus: true,
      toolbarAdaptive: false,
      toolbarSticky: false,
    }),
    [],
  );

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

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const form = e.target.form;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let fromdata = new FormData();
      fromdata.append("name", CategoryName);
      fromdata.append("description", description);
      if (images.length > 0) {
        images.forEach((img) => {
          fromdata.append("image", img);
        });
      }
      for (let [key, value] of fromdata.entries()) {
        console.log(key + " : " + value);
      }
      await axios
        .post(`${api}api/v3/category/createCategory`, fromdata, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          setCategoryName("");
          setDescription("");
          setImages([]);
          toast.success("Category added SuccessFully!", {
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
    }
  };

  return (
    <>
      <Card className="mx-auto w-full max-w-5xl p-6 shadow-lg">
        <Typography variant="h4" className="mb-4">
          Add Category
        </Typography>
        <form noValidate>
          <div className="flex flex-col gap-4">
            <div>
              <Typography variant="small" className="mb-3">
                Category Name *
              </Typography>
              <Input
                color="blue"
                type="text"
                label="Enter Category name"
                value={CategoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                maxLength={50}
              />
            </div>
            <div className="w-full ">
              <Typography variant="small" className="mb-3">
                Description *
              </Typography>
              <div className="h-[400px] w-full resize-none rounded border border-gray-300 bg-[#F5F5F5] p-2 text-[16px] font-normal text-black/50 outline-none">
                <JoditEditor
                  ref={editor}
                  value={description}
                  config={config}
                  tabIndex={1}
                  onBlur={(newContent) => setDescription(newContent)}
                />
              </div>
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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
            <Button color="blue" onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button color="gray">Save Category</Button>
            <Button color="gray" variant="outlined">
              Schedule
            </Button>
          </div>
          <ToastContainer />
        </form>
      </Card>
    </>
  );
};

export default AddCategory;
