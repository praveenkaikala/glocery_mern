import React from "react";
import logo from "../assets/logo.webp";
import Search from "./Search";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
const Header = () => {
  const [isMobile] = useMobile();
  const location = useLocation();
  const isSearchpage = location.pathname === "/search";
  console.log("is search page", isSearchpage);
  console.log("ismobile", isMobile);
  return (
    <header className="h-26 md:h-18 md:shadow-md sticky top-0 flex md:items-center justify-around md:flex-row flex-col md:justify-between bg-white">
      
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
            <Link to={"/login"}><button className="font-semibold text-md cursor-pointer">Login</button></Link>
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
