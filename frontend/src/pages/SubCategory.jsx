import React, { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategory = () => {
    const [showUploadSubCategory, setShowUploadSubCategory] = useState(false);
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
      {
        showUploadSubCategory && <UploadSubCategoryModel close={()=>setShowUploadSubCategory(false)}/>
      }
    </section>
  );
};

export default SubCategory;
