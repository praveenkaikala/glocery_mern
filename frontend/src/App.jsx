import { Outlet } from "react-router-dom"
import "./index.css"
import Header from "./components/Header"
import { useEffect } from "react";
import { fetchUserDatail } from "./utils/fetchUserdetails";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
import { setCategory } from "./store/productSlice";
import { summaryApi } from "./common/SummaryApi";
import { AxiosPravite } from "./utils/Axios";
function  App() {
  const dispatch=useDispatch()
  const fetchUser = async () => {
    try {
      const data=await fetchUserDatail();
  
      dispatch(setUser(data))
    } catch (error) {
      console.log("error",error)
    }
   }
   const fetchCategoryList = async () => {
       try {
         
         const resp = await AxiosPravite({
           ...summaryApi.getCategotyList,
         });
         console.log("cat",resp.data.data.length)
         if(resp.data.data.length>0)
         {
          console.log("calling category reducer")
          dispatch(setCategory(resp.data.data))
         }
       } catch (error) {
         console.log(error);
       } 
     };
  useEffect(()=>{
    fetchUser()
    fetchCategoryList()
  },[])
  return(
    <>
    <Header/>
    <main >
      <Outlet/>
    </main>
    {/* <Footer/> */}
    </>
  )
}

export default App
