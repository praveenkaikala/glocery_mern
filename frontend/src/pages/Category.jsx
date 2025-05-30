import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import SkeletonLoader from "../components/SkeletonLoader";
import NoData from "../components/NoData";

const Category = () => {
  const [showUploadCategory, setShowUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  }, []);
  return (
    <section >
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
        <UploadCategory close={() => setShowUploadCategory(false)} />
      )}
      {loading && (
        <div className="w-full h-[60vh] grid gap-3 py-3 overflow-y-hidden">
          <SkeletonLoader />
        </div>
      )}
      {!loading && !categoryData && (
        <div>
         <NoData/>
        </div>
      )}
      {
        categoryData.length>0 && 
        <div className=" grid grid-cols-2 md:grid-cols-5 gap-4 p-3 ">
          {
            categoryData?.map((data,ind)=>{
              return(
                <div className="h-40 p-3 border-b-2 border-red-500 rounded-xl group cursor-pointer hover:bg-gray-100 flex items-center flex-col z-1">
                  <img src={data?.image} alt={data?.name} className="w-32 h-28 object-scale-down group-hover:scale-[1.1] rounded-xl transition-all ease-in-out duration-500"  />
                  <h2>{data?.name}</h2>
                  </div>
              )
            })
          }
        </div>
      }
    </section>
  );
};

export default Category;
