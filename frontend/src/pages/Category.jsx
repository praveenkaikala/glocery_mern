import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import SkeletonLoader from "../components/SkeletonLoader";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";

const Category = () => {
  const [showUploadCategory, setShowUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData,setEditData]=useState({
    id:"",
    image:"",
    name:""
  })
  const [reFetch,setReFetch]=useState(false)
  const [editModelOpen,setEditModelOpen]=useState(false);
  const fetchCategoryList = async () => {
    try {
      setLoading(true);
      const resp = await AxiosPravite({
        ...summaryApi.getCategotyList,
      });
      setCategoryData(resp?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCategoryList();
  }, [reFetch]);
  return (
    <section>
      <div className="p-2 container bg-white shadow flex items-center gap-4">
        <h2 className="font-semibold">Category</h2>
        <button
          className="border border-amber-300 hover:bg-amber-300 transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => setShowUploadCategory(true)}
        >
          Add Category
        </button>
      </div>
      {showUploadCategory && (
        <UploadCategory reFetch={reFetch} setReFetch={setReFetch} close={() => setShowUploadCategory(false)} />
      )}
      {
        editModelOpen && (
          <EditCategory reFetch={reFetch} setReFetch={setReFetch} close={()=>setEditModelOpen(false)} editData={editData} setEditData={setEditData}/>
        )
      }
      {loading && (
        <div className="w-full h-[60vh] grid gap-3 py-3 overflow-y-hidden">
          <SkeletonLoader />
        </div>
      )}
      {!loading && !categoryData && (
        <div>
          <NoData />
        </div>
      )}
      {categoryData.length > 0 && (
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-4 p-3 ">
          {categoryData?.map((data, ind) => {
            return (
              <div className="h-50 p-3 border-b-2 border-red-500 rounded-xl group cursor-pointer hover:bg-gray-100 flex items-center flex-col ">
                <img
                  src={data?.image}
                  alt={data?.name}
                  className="w-32 h-28 object-scale-down group-hover:scale-[1.1] rounded-xl transition-all ease-in-out duration-500"
                />
                <h2>{data?.name}</h2>

                <div className="group-hover:opacity-100 group-hover:scale-100 opacity-0 scale-95 transform transition-all duration-300 ease-in-out gap-2 py-2 flex">
                  <button className="px-3 text-green-500 border border-green-500 rounded cursor-pointer hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out" onClick={()=>{
                    setEditModelOpen(true)
                    setEditData(data)
                  }}>
                    Edit
                  </button>
                  <button className="px-3 text-red-500 border border-red-500 rounded cursor-pointer hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Category;
