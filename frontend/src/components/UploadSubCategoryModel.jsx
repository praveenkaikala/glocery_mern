import React, { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { useSelector } from "react-redux";
import { summaryApi } from "../common/SummaryApi";
import { toastSuccess } from "../utils/toastSuccess";
import { toastError } from "../utils/toastError";
import { AxiosPravite } from "../utils/Axios";

const UploadSubCategoryModel = ({ close }) => {
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
  });
  const [loading, setLoading] = useState(false);
  const [categoryImage, setCategoryImage] = useState("");
  const { category } = useSelector((state) => state?.product);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
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
  const validate =
    data.name.trim() !== "" &&
    data.image instanceof File &&
    data.category.length > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate) {
      return;
    }
    try {
      setLoading(true);
     
      const categoryIds=data?.category?.map((el)=>el._id)
       console.log("calling")
      const formData = new FormData();
      formData.append("name", data?.name);
      formData.append("image", data?.image);
      formData.append("category",JSON.stringify(categoryIds))
      const resp = await AxiosPravite({
        ...summaryApi.createSubCategory,
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
  const handleRemoveCategorySelected=(id)=>{
    const filterCategory=data.category.filter(el=>el._id!=id)
    setData((prev)=>{
        return {
            ...prev,
            category:filterCategory
        }
    })
  }
  useEffect(() => {
    console.log(data);
  });
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900/60  p-4 flex  items-center justify-center ">
      <div className="bg-white max-w-xl w-full p-3 flex  flex-col rounded-sm">
        <div className="w-full flex justify-between">
          <h2 className="font-semibold">Sub Category</h2>
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
          <div className="grid gap-2">
            <label htmlFor="category">Select Category</label>
             <div className="border focus-within:border-primary-200 rounded">
              {/*display value**/}
            
              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-scroll">
                {data.category.map((cat, index) => {
                  return (
                    <p
                      key={cat._id + "selectedValue"}
                      className=" shadow-md px-1 m-1 flex items-center gap-2 bg-blue-50"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </p>
                  );
                })}
              </div>
            </div>
            <select
              className="bg-blue-50 py-1 px-2 outline-none "
              id="category"
              name="category"
              onChange={(e)=>{
                                    const value = e.target.value
                                    const categoryDetails = category.find(el => el._id == value)
                                    const isexist=data.category.find(el => el._id == value)
                                    if(isexist) return
                                    setData((preve)=>{
                                        return{
                                            ...preve,
                                            category : [...preve.category,categoryDetails]
                                        }
                                    })
                                }}
            >
              <option value="">Select category</option>
              {category.length > 0 &&
                category?.map((cat, ind) => {
                  return (
                    <option value={cat?._id} key={ind}>
                      {cat?.name}
                    </option>
                  );
                })}
            </select>
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

export default UploadSubCategoryModel;
