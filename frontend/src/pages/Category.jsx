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
        <div>
          data
        </div>
      }
    </section>
  );
};

export default Category;
