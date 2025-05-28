import React from "react";

const SkeletonLoader = ({ width = "w-full", height = "h-8", rounded = "rounded-md", className = "",count=7 }) => {
    const skeletons=[]
    for (let i = 0; i < count; i++) {
    skeletons.push(
      <div key={i} className="py-2">
         <div className={`bg-gray-200  animate-pulse ${width} ${height} ${rounded} ${className}`} />
      </div>
    );
  }
  return (
        <div>
            {
                skeletons
            }
        </div>
   
  );
};

export default SkeletonLoader;
