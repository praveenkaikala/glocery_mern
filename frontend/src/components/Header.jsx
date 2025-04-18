import React from "react";
import logo from "../assets/logo.webp";
import Search from "./Search";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="h-16 shadow-md sticky top-0">
      <div className="container mx-auto px-3 h-full flex items-center justify-between">
        {/* logo */}
        <Link to={"/"} className="flex h-full items-center">
          <div>
            {/* pc */}
            <img src={logo} alt="logo" width={150} height={60} className="hidden lg:block"/>

            {/* mobile */}
            <img src={logo} alt="logo" width={100} height={40} className="lg:hidden block"/>
          </div>
        </Link>

        {/* search */}
        <div>
           
                <Search/>
            
        </div>

        {/* login */}

        <div>
            <div>
               login
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
