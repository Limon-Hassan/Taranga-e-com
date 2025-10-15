import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Textarea,
} from "@material-tailwind/react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const AddCategory = () => {
  const [CategoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [Image, setImageupload] = useState("");

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const form = e.target.form;
    if (!form.checkValidity()) {
      form.reportValidity();
    } else {
      let fromdata = new FormData();
      fromdata.append("name", CategoryName);
      fromdata.append("description", description);
      if (Image) {
        fromdata.append("image", Image);
      }
      for (let [key, value] of fromdata.entries()) {
        // console.log(key + " : " + value);
      }
      await axios
        .post(
          "https://taranga-e-com.onrender.com/api/v3/category/createCategory",
          fromdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          },
        )
        .then((respone) => {
          console.log(respone);
          setCategoryName("");
          setDescription("");
          setImageupload("");
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
            <div className="w-full overflow-hidden">
              <Typography variant="small" className="mb-3">
                Description *
              </Typography>
              <ReactQuill
                color="blue"
                type="text"
                label="Description"
                className="h-[200px] w-full resize-none rounded border border-gray-300 bg-[#F5F5F5] p-4 text-[16px] font-normal text-black/50 outline-none"
                theme="snow"
                value={description || ""}
                onChange={setDescription}
                required
                maxLength={500}
              />
            </div>
          </div>
          <div className="mt-6">
            <Typography variant="small" className="mb-3">
              Upload Images
            </Typography>

            <div class="flex w-full items-center justify-center">
              <label
                htmlFor="dropzone-file"
                class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
              >
                <div class="flex flex-col items-center justify-center pb-6 pt-5">
                  <i class="fa-light fa-cloud-arrow-up mb-3 text-[30px] text-blue-600"></i>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setImageupload(e.target.files[0]);
                    }
                  }}
                  type="file"
                  class="hidden"
                />
              </label>
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
