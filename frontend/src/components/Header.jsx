import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.webp";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { GoTriangleUp } from "react-icons/go";
import { GoTriangleDown } from "react-icons/go";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const [showuserMenu,setUserShowMenu]=useState(false)
  const user=useSelector(state=>state?.user)
  const isSearchpage = location.pathname === "/search";
  const handleUserMenu=()=>{
    setUserShowMenu(!showuserMenu)
  }
  const menuRef=useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <header className="h-26 md:h-18 md:shadow-md sticky  top-0 flex md:items-center justify-around md:flex-row flex-col md:justify-between bg-white">
      
      {/* mobile verison */}
      
      {!(isSearchpage && isMobile) && (
        <div className="container mx-auto px-3 flex items-center justify-between">
          {/* logo */}
          <Link to={"/"} className="flex h-full items-center">
            <div>
              {/* pc */}
              <img
                src={logo}
                alt="logo"
                width={150}
                height={60}
                className="hidden lg:block"
              />

              {/* mobile */}
              <img
                src={logo}
                alt="logo"
                width={100}
                height={40}
                className="lg:hidden block"
              />
            </div>
          </Link>

          {/* search */}
          <div className="hidden md:block">
            <Search />
          </div>

          {/* login */}

          <div className="hidden md:flex items-center gap-4">
            {
              user?._id ? (
                <div className="relative w-auto" ref={menuRef}>
                  <div className="flex gap-2 p-2 rounded items-center cursor-pointer hover:bg-green-800 hover:text-white transition-all ease-in-out duration-300" onClick={handleUserMenu}>
                    <p>Account</p>
                    {
                      showuserMenu ?(
                        <GoTriangleUp/>
                      ):(

                        <GoTriangleDown />
                      )
                    }
                    </div>
                    <div className="absolute right-10 top-14">
                     { showuserMenu && <UserMenu close={()=>setUserShowMenu(!showuserMenu)}/>}
                      </div>
                  </div>
              ):(

                <Link to={"/login"}><button className="font-semibold text-md cursor-pointer">Login</button></Link>
              )
            }
            <button className="flex items-center gap-2 bg-green-900 text-white px-4 py-2 rounded cursor-pointer">
              <div className="animate-bounce">
              <TiShoppingCart size={26}/>
              </div>
              <div>
                
                <p className="font-semibold">My Cart</p>
              </div>
            </button>
          </div>

          <div className="md:hidden block">
            <FaRegUserCircle size={26} />
          </div>
        </div>
      )}

      <div className="md:hidden block container mx-auto px-3">
        <Search />
      </div>
    </header>
  );
};

export default Header;
