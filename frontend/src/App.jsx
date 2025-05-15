import { Outlet } from "react-router-dom"
import "./index.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { fetchUserDatail } from "./utils/fetchUserdetails";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";
function App() {
  const dispatch=useDispatch()
  const fetchUser = async () => {
    try {
      const data=await fetchUserDatail();
      console.log("userdetails",data)
      dispatch(setUser(data))
    } catch (error) {
      console.log("error",error)
    }
   }
  useEffect(()=>{
    fetchUser()
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
