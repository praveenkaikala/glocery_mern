import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import useFetchData from "../hooks/useFetchData";
import { summaryApi } from "../common/SummaryApi";
import SkeletonLoader from "../components/SkeletonLoader";
import NoData from "../components/NoData";
import Category from "./Category";
import ConfirmBox from "../components/ConfirmBox";
import { toastError } from "../utils/toastError";
import { toastSuccess } from "../utils/toastSuccess";
import { AxiosPravite } from "../utils/Axios";

const SubCategory = () => {
    const [showUploadSubCategory, setShowUploadSubCategory] = useState(false);
    const [subCategoryData,loading]=useFetchData(summaryApi.getSubCategory)
     const [editModelOpen, setEditModelOpen] = useState(false);
     const [deleteModel, setDeleteModel] = useState(false);
     const [deleteId, setDeleteId] = useState("");
      const [editData,setEditData]=useState({
         id:"",
         image:"",
         name:"",
         category:[]
       })
const handleDelete=async()=>{
    try {
      if(!deleteId) return
      const resp=await AxiosPravite({
        ...summaryApi.deleteSubCategoty,
        data:{
          id:deleteId
        }
      })
      toastSuccess(resp?.data?.message)
      
      // fetchCategoryList()
    } catch (error) {
      console.log(error)
       toastError(error?.response?.data?.message || "Category Deletion Failed");
    }
    finally{
      setDeleteModel(false)
    }
  }
  return (
    <section>
      <div className="p-2 container bg-white shadow flex items-center gap-4">
          <h2 className="font-semibold">Sub Category</h2>
        <button
          className="border border-amber-300 hover:bg-amber-300 transition-all ease-in-out rounded py-1 px-2 cursor-pointer"
          onClick={() => setShowUploadSubCategory(true)}
        >
          Add SubCategory
        </button>
      </div>
         {subCategoryData.length > 0 && !loading && (
       <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
          {subCategoryData?.map((data) => {
            return(
                        <div className='w-32 min-h-45 h-auto rounded shadow-md p-2 flex flex-col justify-between gap-2' key={data._id}>
                            <img 
                                alt={data.name}
                                src={data.image}
                                className='w-full h-23 object-scale-down'
                            />
                            <p className=" text-center ">{data?.name}</p>
                            <div className='items-center h-9 flex gap-2'>
                                <button onClick={()=>{
                                   setEditModelOpen(true)
                                    setEditData(data)
                                }} className='flex-1 cursor-pointer bg-green-100 hover:bg-green-200 text-green-600 font-medium py-1 px-2 rounded'>
                                    Edit
                                </button>
                                <button onClick={()=>{
                                   setDeleteId(data?._id)
                                   setDeleteModel(true)
                                }} className='flex-1 cursor-pointer bg-red-100 hover:bg-red-200 text-red-600 font-medium py-1 px-2 rounded'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )
          })}
        </div>
      )}
      {loading && (
              <div className="w-full h-[60vh] grid gap-3 py-3 overflow-y-hidden">
                <SkeletonLoader />
              </div>
            )}
            {!loading && !subCategoryData && (
              <div>
                <NoData />
              </div>
            )}
      {
        showUploadSubCategory && <UploadSubCategoryModel close={()=>setShowUploadSubCategory(false)}/>
      }
        {
        deleteModel &&(
          <ConfirmBox close={()=>setDeleteModel(false)} cancel={()=>setDeleteModel(false)} confirm={handleDelete}/>
        )
      }
    </section>
  );
};

export default SubCategory;
