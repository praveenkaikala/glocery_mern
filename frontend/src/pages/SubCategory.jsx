import React, { useEffect, useState } from "react";
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
import { createColumnHelper } from "@tanstack/react-table";
import DisplayTable from "../components/Table";
import { LuPencil } from "react-icons/lu";
import { MdDelete  } from "react-icons/md";
import { HiPencil } from "react-icons/hi";
import EditSubCategory from "../components/EditSubCategory";
const SubCategory = () => {
    const [showUploadSubCategory, setShowUploadSubCategory] = useState(false);
    const [data,loading,refetch]=useFetchData(summaryApi.getSubCategory)
    const [subCategoryData,setSubCategoryData]=useState([])
    useEffect(()=>{
      setSubCategoryData(data?.data || [])
    })
     const [editModelOpen, setEditModelOpen] = useState(false);
     const [deleteModel, setDeleteModel] = useState(false);
     const [deleteId, setDeleteId] = useState("");
      const [editData,setEditData]=useState({
         id:"",
         image:"",
         name:"",
         category:[]
       })
        const columnHelper = createColumnHelper()
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
      setRefresh(!refresh)
      // fetchCategoryList()
    } catch (error) {
      console.log(error)
       toastError(error?.response?.data?.message || "Category Deletion Failed");
    }
    finally{
      setDeleteModel(false)
    }
  }

   const column = [
    columnHelper.accessor('name',{
      header : "Name"
    }),
    columnHelper.accessor('image',{
      header : "Image",
      cell : ({row})=>{
        return <div className='flex justify-center items-center'>
            <img 
                src={row.original.image}
                alt={row.original.name}
                className='w-8 h-8 cursor-pointer'
                onClick={()=>{
                  setImageURL(row.original.image)
                }}      
            />
        </div>
      }
    }),
    columnHelper.accessor("category",{
       header : "Category",
        cell : ({row})=>{
        return(
          <>
            {
              row.original.categoryId.map((c,index)=>{
                return(
                  <p key={c._id+"table"} className='shadow-md px-1 inline-block'>{c.name}</p>
                )
              })
            }
          </>
        )
       }
    }),
    columnHelper.accessor("_id",{
      header : "Action",
      cell : ({row})=>{
        return(
          <div className='flex items-center justify-center gap-3'>
              <button onClick={()=>{
                  setEditModelOpen(true)
                  setEditData(row.original)
              }} className='p-2 bg-green-100 rounded-full hover:text-green-600'>
                  <HiPencil size={20}/>
              </button>
              <button onClick={()=>{
                setDeleteModel(true)
                setDeleteId(row?.original?._id)
              }} className='p-2 bg-red-100 rounded-full text-red-500 hover:text-red-600'>
                  <MdDelete  size={20}/>
              </button>
          </div>
        )
      }
    })
  ]
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
       <div className='overflow-auto w-full max-w-[95vw]'>
            <DisplayTable
                data={subCategoryData}
                column={column}
            />
        </div>
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
        showUploadSubCategory && <UploadSubCategoryModel close={()=>setShowUploadSubCategory(false)} refresh={refetch} />
      }
        {
        deleteModel &&(
          <ConfirmBox close={()=>setDeleteModel(false)} cancel={()=>setDeleteModel(false)} confirm={handleDelete}/>
        )
      }
      {
        editModelOpen && <EditSubCategory editData={editData} close={()=>setEditModelOpen(false)} setEditData={setEditData} refresh={refetch}/>
      } 
    </section>
  );
};

export default SubCategory;
