'use client';
import React from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const Pagination = ({ active, setActive, totalPages }) => {
  const next = () => {
    if (active < totalPages) setActive(active + 1);
  };

  const prev = () => {
    if (active > 1) setActive(active - 1);
  };
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={prev}
        disabled={active === 1}
        className={`uppercase cursor-pointer flex items-center gap-2 px-[12px] py-[10px] rounded-full text-sm  font-medium transition-all ease-in-out duration-300 ${
          active === 1
            ? 'text-gray-400 cursor-not-allowed'
            : 'hover:text-[#FFF] text-black hover:bg-[#E6963A]'
        }`}
      >
        <span>
          <FaArrowLeft />
        </span>
        Previous
      </button>

      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => setActive(page)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-all ease-in-out duration-200 font-bold text-sm ${
              active === page
                ? 'bg-[#E6963A] text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-[#E6963A]'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={next}
        disabled={active === totalPages}
        className={`uppercase cursor-pointer flex items-center gap-2 px-[12px] py-[10px] rounded-full text-sm  font-medium transition-all ease-in-out duration-300 ${
          active === totalPages
            ? 'text-gray-400 cursor-not-allowed'
            : 'hover:text-[#FFF] text-black hover:bg-[#E6963A]'
        }`}
      >
        Next
        <span>
          <FaArrowRight />
        </span>
      </button>
    </div>
  );
};

export default Pagination;
