import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AddFields from "../components/AddFields";
import { MdDelete } from "react-icons/md";
export const Uploadproduct = () => {
  const category = useSelector((state) => state?.product?.category);
  const subCategory = useSelector((state) => state?.product?.subCategory);
  const [data, setData] = useState({
    name: "",
    image: "",
    category: [],
    subcategory: [],
    unit: "",
    stock: null,
    price: null,
    discount: null,
    discription: "",
    more_details: {},
    publish: true,
  });
  const [image, setImage] = useState("");
  const [fields,setfields]=useState([])
  const [modelOpen,setModelOpen] =useState(false)
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  useEffect(()=>{
    console.log(data)
  },[data])
  const handleRemoveCategorySelected = (id) => {
    const filterCategory = data.category.filter((el) => el._id != id);
    setData((prev) => {
      return {
        ...prev,
        category: filterCategory,
      };
    });
  };
  const handleRemoveSubCategorySelected = (id) => {
    const filterSubCategory = data.subcategory.filter((el) => el._id != id);
    setData((prev) => {
      return {
        ...prev,
        subcategory: filterSubCategory,
      };
    });
  };
  const handleImage = (e) => {
    const image = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(image);
    setData((prev) => {
      return {
        ...prev,
        image,
      };
    });
  }
  const handleAddField=(name)=>{
    console.log("adding")
    setData((prev)=>{
      return {
        ...prev,
        more_details:{
          ...prev.more_details,
          [name]:""
        }
      }
    })
  }
 const handleDeleteField = (name) => {
  const updatedFields = fields.filter((el) => el !== name);
  setfields(updatedFields);

  setData((prev) => {
    const updatedDetails = { ...prev.more_details };
    delete updatedDetails[name];
    return {
      ...prev,
      more_details: updatedDetails,
    };
  });
};
  return (
    <section>
      <div className="p-2 container bg-white shadow flex items-center gap-4">
        <h2 className="font-semibold">Upload Product</h2>
      </div>
      <div className="p-3">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="name">Name</label>
            <input
              value={data.name}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 w-full"
              id="name"
              name="name"
              required
              placeholder="Enter Product Name"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="discription">Discription</label>
            <textarea
              value={data.discription}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="discription"
              name="discription"
              required
              placeholder="Enter Product Discription"
            />
          </div>
          <div className="flex gap-8 ">
            <div className="grid gap-2 px-2">
              <h2>Image</h2>
              <div className="w-36 h-36 bg-blue-50 flex items-center justify-center rounded">
                {image ? (
                  <img
                    src={image}
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
              <div className="min-w-20  border rounded-full  border-amber-300 my-2 cursor-pointer hover:border-amber-200 hover:text-white hover:bg-amber-300 transition-all ease-in-out text-center px-8">
                Upload
              </div>
            </label>
            <input
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 hidden"
              id="image"
              name="image"
              type="file"
              onChange={handleImage}
            />
          </div>
          <div className="grid gap-2 ">
            <label htmlFor="category">Category</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/*display value**/}

              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-scroll">
                {data.category.map((cat) => {
                  return (
                    <div
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
                    </div>
                  );
                })}
              </div>
            </div>
            <select
              className="bg-blue-50 py-1 px-2 outline-none "
              id="category"
              name="category"
              onChange={(e) => {
                const value = e.target.value;
                const categoryDetails = category.find((el) => el._id == value);
                const isexist = data.category.find((el) => el._id == value);
                if (isexist) return;
                setData((preve) => {
                  return {
                    ...preve,
                    category: [...preve.category, categoryDetails],
                  };
                });
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
          <div className="grid gap-2 ">
            <label htmlFor="subcategory">SubCategory</label>
            <div className="border focus-within:border-primary-200 rounded">
              {/*display value**/}

              <div className="flex flex-wrap gap-2 max-h-20 overflow-y-scroll">
                {data.subcategory?.map((cat) => {
                  return (
                    <div
                      key={cat._id + "selectedValue"}
                      className=" shadow-md px-1 m-1 flex items-center gap-2 bg-blue-50"
                    >
                      {cat.name}
                      <div
                        className="cursor-pointer hover:text-red-600"
                        onClick={() => handleRemoveSubCategorySelected(cat._id)}
                      >
                        <IoClose size={20} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <select
              className="bg-blue-50 py-1 px-2 outline-none "
              id="subcategory"
              name="subcategory"
              onChange={(e) => {
                const value = e.target.value;
                const subCategoryDetails = subCategory.find(
                  (el) => el._id == value
                );
                const isexist = data.subcategory.find((el) => el._id == value);
                if (isexist) return;
                setData((preve) => {
                  return {
                    ...preve,
                    subcategory: [...preve.subcategory, subCategoryDetails],
                  };
                });
              }}
            >
              <option value="">Select SubCategory</option>
              {subCategory?.map((cat, ind) => {
                return (
                  <option value={cat?._id} key={ind}>
                    {cat?.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="grid gap-2">
            <label htmlFor="unit">Unit</label>
            <input
              type="text"
              value={data.unit}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="unit"
              name="unit"
              required
              placeholder="Enter Product Units"
            />
          </div>

          <div className="grid gap-2">
            <label htmlFor="stock">Stock</label>
            <input
              type="number"
              value={data.unit}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="stock"
              name="stock"
              required
              placeholder="Enter Product Stock"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              value={data.unit}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="price"
              name="price"
              required
              placeholder="Enter Product price"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="discount">Discount</label>
            <input
              type="number"
              value={data.unit}
              onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id="discount"
              name="discount"
              required
              placeholder="Enter Product Discount"
            />
          </div>
          {
            fields.length>0 &&(
              fields.map((el,ind)=>{
                return (
                   <div className="grid gap-2" key={ind}>
            <div className="flex justify-between">
               <label htmlFor={el}>{el}</label>
                  <MdDelete size={20} className="cursor-pointer hover:text-red-700" onClick={()=>handleDeleteField(el)}/>
            </div>
            <input
              type="text"
              // value={data.unit}
              // onChange={handleChange}
              className="bg-blue-50 outline-none border rounded focus-within:border-amber-300 py-1 px-2 resize-none"
              id={el}
              name={el}
              required
              placeholder={`Enter Product ${el}`}
            />
          </div>
                )
              })
            )
          }
          <div className="inline-block bg-amber-300 hover:bg-white w-32 px-3 py-1 border rounded cursor-pointer font-semibold text-center" onClick={()=>setModelOpen(true)}>
              add fileds
          </div>
        </form>
      </div>
      {
      modelOpen && <AddFields close={()=>setModelOpen(false)} fields={fields} setFields={setfields} addFields={handleAddField}/>
      }
    </section>
  );
};
