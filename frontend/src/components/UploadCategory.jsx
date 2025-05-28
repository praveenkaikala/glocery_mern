import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import { toastSuccess } from "../utils/toastSuccess";
import { toastError } from "../utils/toastError";
import DotLoading from "./DotLoading";
const UploadCategory = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState("");
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];
    console.log(image);
    if (!image) return;
    setData((prev) => {
      return {
        ...prev,
        image: image,
      };
    });
    const reader = new FileReader();
    reader.onloadend = () => {
      setCategoryImage(reader.result);
    };
    reader.readAsDataURL(image);
  };
  const validate = data.name.trim() !== "" && data.image instanceof File;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate) {
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("image", data?.image);
      const resp = await AxiosPravite({
        ...summaryApi.createCategory,
        data: formData,
      });
      toastSuccess(resp?.data?.message);
      close();
    } catch (error) {
      toastError(error?.response?.data?.message || "Category Creation Failed ");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60  p-4 flex  items-center justify-center ">
      <div className="bg-white max-w-sm w-full p-3 flex  flex-col rounded-sm">
        <div className="w-full flex justify-between">
          <h2 className="font-semibold">Category</h2>
          <IoIosCloseCircle
            size={26}
            className="cursor-pointer hover:text-red-600 transition-all ease-in-out"
            onClick={() => close()}
          />
        </div>
        <form className="grid gap-3" onSubmit={handleSubmit}>
          <div className="grid gap-2 grid-cols-2">
            <div className="grid gap-2 px-2">
              <h2>Image</h2>
              <div className="w-36 h-36 bg-blue-50 flex items-center justify-center rounded">
                {categoryImage ? (
                  <img
                    src={categoryImage}
                    alt={data?.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <p className="font-light">No Image</p>
                )}
              </div>
            </div>
            <label htmlFor="image" className="flex items-center">
              <div className="min-w-20 border rounded-full w-full  border-amber-300 my-2 cursor-pointer hover:border-amber-200 hover:text-white hover:bg-amber-300 transition-all ease-in-out text-center">
                Upload
              </div>
            </label>
            <input
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 hidden"
              id="image"
              name="image"
              type="file"
              onChange={handleImageChange}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="name">Categoty Name</label>
            <input
              onChange={handleChange}
              value={data?.name}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2"
              id="name"
              name="name"
            />
          </div>
          <button
          type="submit"
            className={`w-full py-2 border rounded cursor-pointer font-semibold  ${
              validate
                ? "bg-green-800 text-white hover:bg-green-700 transition-all ease-in-out "
                : "bg-gray-200"
            }`}
          >
            {loading ? "Creating..." : "Save Category"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UploadCategory;
