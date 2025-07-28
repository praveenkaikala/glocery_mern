import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile] = useMobile();
  const [isSearchpage, setIsSearchPage] = useState();
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");
  useEffect(() => {
    const isSearch = location.pathname === "/search";
    setIsSearchPage(isSearch);
    console.log(isSearch);
  }, [location]);
  const redirectToSearchPage = () => {
    navigate("/search");
  };
  const redirectToHome = () => {
    navigate("/");
  };
   useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [input]);

  // Trigger navigation when debouncedInput changes
  useEffect(() => {
    if (debouncedInput) {
      navigate(`/search?query=${debouncedInput}`);
    }
    else
    { 
      if(location.pathname.startsWith("/search"))
      {

        navigate("/search")
      }
    }
  }, [debouncedInput, navigate]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div className="w-full border min-w-[300px] md:min-w-[400px] h-10 rounded flex items-center text-neutral-600 group focus-within:border-amber-300">
      {isSearchpage && isMobile ? (
        <button className="flex h-full items-center p-3 text-neutral-600 group-focus-within:text-amber-300 cursor-pointer bg-white rounded-full m-1  shadow-lg" onClick={redirectToHome}>
          <FaArrowLeft size={20} />
        </button>
      ) : (
        <button className="flex h-full items-center p-3 text-neutral-600 group-focus-within:text-amber-300 ">
          <IoSearch size={20} />
        </button>
      )}
      <div className="w-full">
        <div className="w-full">
          {!isSearchpage ? (
            <div onClick={redirectToSearchPage} className="w-full">
              <TypeAnimation
                className="w-full"
                sequence={[
                  "Search 'Milk'",
                  1000,
                  "Search 'Sugar'",
                  1000,
                  "Search 'Chiken'",
                  1000,
                  "Search 'Rice'",
                  1000,
                  "Search 'Chocolate'",
                  1000,
                  "Search 'Cake'",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          ) : (
            <div className="w-full">
              <input
                type="text"
                placeholder="Search for ..."
                className="w-full outline-none"
                autoFocus={true}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
