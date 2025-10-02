import React from 'react';
import Container from './Container/Container';
import { IoSearchSharp } from 'react-icons/io5';
import { LuShoppingBag } from 'react-icons/lu';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';

const Navber_1 = () => {
  return (
    <>
      <section className="mobile:w-full tablet:w-full bg-[#ededed] py-[20px]">
        <Container>
          <div className="laptop:flex computer:flex computer:items-center computer:justify-between laptop:items-center laptop:justify-between">
            <div className="computer:flex laptop:flex computer:items-center laptop:items-center mobile:gap-0 tablet:gap-0 laptop:gap-[30px] computer:gap-[50px]">
              <div className="mobile:mb-[30px] tablet:mb-[20px] mobile:flex tablet:flex mobile:justify-between tablet:justify-between mobile:items-center tablet:items-center">
                <img
                  className="computer:w-[250px] laptop:w-[250px] mobile:w-[170px] tablet:w-[250px]  computer:mb-0 laptop:mb-0"
                  src="/headimage.webp"
                  alt="headimage"
                />
                <div className="mobile:flex tablet:flex computer:hidden laptop:hidden  mobile:items-center table:items-center gap-[8px]">
                  <LuShoppingBag className="text-[25px] text-[#69727d]" />
                  <span className="flex items-center  text-[20px] text-[#69727d]">
                    00.0
                    <FaBangladeshiTakaSign />
                  </span>
                </div>
              </div>
              <div className="border border-[#E6963A] rounded-[4px] flex items-center gap-[20px] p-[6px]">
                <input
                  className="computer:w-[400px] computer:h-[50px] laptop:w-[400px] laptop:h-[50px] tablet:w-[365px] tablet:h-[50px] mobile:w-[190px] mobile:h-[40px] border border-[#D1D5DB] bg-white rounded-[5px] p-[10px] text-[18px] font-nunito font-normal text-[#000] "
                  type="search"
                  placeholder="Search..."
                  name="search"
                  id="search"
                />
                <button className="mobile:text-[14px] tablet:text-[16px] laptop:-[16px] computer:text-[16px]  font-nunito font-bold text-[#fff] bg-[#E6963A] rounded-[6px] mobile:py-[8px] tablet:py-[12px] laptop:py-[12px] computer:py-[12px] mobile:px-[10px] tablet:px-[24px] laptop:px-[24px] computer:px-[24px] cursor-pointer flex items-center mobile:gap-[3px] tablet:gap-[8px] laptop:gap-[8px] computer:gap-[8px]">
                  <IoSearchSharp /> Search
                </button>
              </div>
            </div>
            <div className="computer:flex computer:items-center laptop:items-center laptop:flex computer:gap-[8px] laptop:gap-[8px] mobile:hidden tablet:hidden">
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
