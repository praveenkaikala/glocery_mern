import { Outlet } from "react-router-dom"
import "./index.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import { fetchUserDatail } from "./utils/fetchUserdetails";
function App() {
  const fetchUser = async () => {
    try {
      await fetchUserDatail()
    } catch (error) {
      console.log(error)
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
