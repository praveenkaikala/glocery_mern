import React from 'react'

const CardSkeleton = ({ number = 6 }) => {
  return (
    <div className="grid gap-4 md:grid-cols-6 sm:grid-cols-4 grid-cols-2 py-3 container mx-auto -z-10">
      {new Array(number).fill(null).map((_, ind) => (
        <div
          key={ind}
          className="w-full h-56 p-4 rounded-lg shadow-md bg-white animate-pulse flex flex-col gap-3"
        >
          <div className="h-32 bg-slate-200 rounded"></div>
          <div className="h-4 bg-slate-200 rounded w-3/4"></div>
          <div className="h-3 bg-slate-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default CardSkeleton;
