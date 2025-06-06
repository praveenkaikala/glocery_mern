import React, { useEffect, useState } from "react";
import UploadCategory from "../components/UploadCategory";
import { AxiosPravite } from "../utils/Axios";
import { summaryApi } from "../common/SummaryApi";
import SkeletonLoader from "../components/SkeletonLoader";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import toast from "react-hot-toast";
import { toastSuccess } from "../utils/toastSuccess";
import { useSelector } from "react-redux";

const Category = () => {
  const [showUploadCategory, setShowUploadCategory] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editData,setEditData]=useState({
    id:"",
    image:"",
    name:""
  })
  const {category}=useSelector((state)=>state?.product)
  const [reFetch,setReFetch]=useState(false)
  const [editModelOpen,setEditModelOpen]=useState(false);
  const [deleteModel,setDeleteModel]=useState(false)
  const [deleteId,setDeleteId]=useState("")
  // const fetchCategoryList = async () => {
  //   try {
  //     setLoading(true);
  //     const resp = await AxiosPravite({
  //       ...summaryApi.getCategotyList,
  //     });
  //     setCategoryData(resp?.data?.data);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchCategoryList();
  // }, [reFetch]);
  useEffect(()=>{
    setCategoryData(category)
  },[])
  const handleDelete=async()=>{
    try {
      if(!deleteId) return
      const resp=await AxiosPravite({
        ...summaryApi.deleteCategoty,
        data:{
          id:deleteId
        }
      })
      toastSuccess(resp?.data?.message)
      
      fetchCategoryList()
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
      {
        deleteModel &&(
          <ConfirmBox close={()=>setDeleteModel(false)} cancel={()=>setDeleteModel(false)} confirm={handleDelete}/>
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
      {categoryData.length > 0 && !loading && (
       <div className='p-4 grid  grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2'>
          {categoryData?.map((data, ind) => {
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
    </section>
  );
};

export default Category;
