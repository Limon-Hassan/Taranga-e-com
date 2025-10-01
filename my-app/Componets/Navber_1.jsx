import React from 'react';
import Container from './Container/Container';
import { IoSearchSharp } from 'react-icons/io5';
import { LuShoppingBag } from 'react-icons/lu';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const Navber_1 = () => {
  return (
    <>
      <section className="bg-[#ededed] py-[20px]">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[50px]">
              <img
                className="w-[250px]"
                src="/headimage.webp"
                alt="headimage"
              />
              <div className="border border-[#E6963A] rounded-[4px] flex items-center gap-[20px] p-[6px]">
                <input
                  className="w-[400px] h-[50px] border border-[#D1D5DB] bg-white rounded-[5px] p-[10px] text-[18px] font-nunito font-normal text-[#000] "
                  type="search"
                  placeholder="Search..."
                  name="search"
                  id="search"
                />
                <button className="text-[16px] font-nunito font-bold text-[#fff] bg-[#E6963A] rounded-[6px] py-[12px] px-[24px] cursor-pointer flex items-center gap-[8px]">
                  <IoSearchSharp /> Search
                </button>
              </div>
            </div>
            <div className="flex items-center gap-[8px]">
              <LuShoppingBag className="text-[25px] text-[#69727d]" />
              <span className="flex items-center  text-[20px] text-[#69727d]">
                00.0
                <FaBangladeshiTakaSign />
              </span>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Navber_1;
