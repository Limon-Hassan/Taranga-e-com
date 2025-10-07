import React from 'react';
import Container from '../../Componets/Container/Container';
import { FaCartShopping } from 'react-icons/fa6';

const page = () => {
  return (
    <>
      <section className="mobile:w-full tablet:w-full mobile:mb-[50px] tablet:mb-[20px] laptop:mb-[30px] computer:mb-[30px] tablet:py-[100px] laptop:py-[100px] computer:py-[100px] mobile:py-[50px]">
        <Container>
          <div className="flex items-center justify-between ">
            <h3 className="mobile:text-[15px] tablet:text-[18px] laptop:text-[28px] computer:text-[28px] font-nunito mobile:font-bold tablet:font-bold  laptop:font-bold computer:font-bold text-[#1e293b] mb-[20px]">
              Safety Tools
            </h3>
            <h3 className="mobile:text-[15px] tablet:text-[18px] laptop:text-[18px] computer:text-[18px] font-nunito mobile:font-bold tablet:font-normal  laptop:font-normal computer:font-normal text-[#1e293b] mb-[20px] cursor-pointer underline">
              Total (50)
            </h3>
          </div>
          <div className="flex flex-wrap items-center mobile:justify-normal computer:justify-normal laptop:justify-normal tablet:justify-center mobile:gap-[10px] tablet:gap-[18px] laptop:gap-[26px] computer:gap-[26px] mobile:mt-[20px] tablet:mt-[50px] laptop:mt-[50px] computer:mt-[50px]">
            <div className="mobile:shadow-md tablet:shadow-md laptop:shadow-none computer:shadow-none border border-[#000]/40 mobile:p-0 tablet:p-[3px] laptop:p-[3px] computer:p-[3px] mobile:w-[150px] tablet:w-[200px] laptop:w-[280px] computer:w-[280px] mobile:h-[335px] tablet:h-[400px] laptop:h-[480px] computer:h-[480px] rounded-[4px]">
              <img
                className="mobile:w-auto tablet:w-auto laptop:w-full computer:w-full mobile:h-[140px] tablet:h-[160px] laptop:h-[250px] computer:h-[250px]"
                src="/2.webp"
                alt="product"
              />
              <div className="bg-[#eeeeee] text-center w-full pb-[15px]">
                <h3 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[20px] computer:text-[20px] pt-[10px] mobile:font-bold tablet:font-bold laptop:font-medium computer:font-medium font-nunito text-[#1e293b] mb-[5px]">
                  Cordless Drill
                </h3>
                <p className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito mobile:font-medium  tablet:font-medium laptop:font-normal computer:font-normal text-[#1e293b] mobile:w-auto tablet:w-auto laptop:w-[250px] computer:w-[250px] mx-auto">
                  Smartec 20V Cordless Impact Drill Machine Metal Chuck With
                  24ps
                </p>
                <h5 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-normal text-[#1e293b] mb-[10px]">
                  Accessories
                </h5>
                <h2 className="mobile:text-[16px] tablet:text-[18px] laptop:text-[20px] computer:text-[20px] font-nunito font-bold text-[#778E38] mobile:mb-[5px]  tablet:mb-[10px] laptop:mb-[10px] computer:mb-[10px]">
                  4,650.00৳
                </h2>
                <button className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#FFF] bg-[#F1A31C] border-b-4 border-[#BD8017] mobile:py-[4px] mobile:px-[25px] tablet:py-[4px] tablet:px-[36px] laptop:py-[6px] laptop:px-[70px] computer:py-[6px] computer:px-[70px] mobile:rounded-[15px] tablet:rounded-[18px] laptop:rounded-[20px] computer:rounded-[20px] flex items-center mx-auto cursor-pointer">
                  <FaCartShopping className="mr-[10px]" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default page;
