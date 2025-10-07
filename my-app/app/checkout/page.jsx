import React from 'react';
import Container from '../../Componets/Container/Container';

const page = () => {
  return (
    <>
      <section className="mobile:py-[50px] tablet:py-[100px] laptop:py-[100px] computer:py-[100px]">
        <Container>
          <div>
            <h3 className="text-[28px] font-bold font-nunito text-gray-800 mb-[20px]">
              Checkout
            </h3>
            <div className="w-full computer:flex  mobile:flex-none tablet:flex-none laptop:flex-1/2 gap-[40px]">
              <div className="mobile:p-[20px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] bg-[#69727d]/10 border border-[#000]/20 shadow-md rounded-[6px]">
                <h4 className="text-[26px] font-noto-bengali font-bold text-[#000] mb-[30px]">
                  আপনার তথ্য দিন
                </h4>
                <div className="mobile:w-[270px] tablet:w-[510px] laptop:w-[570px] computer:w-[570px] mb-[20px] ">
                  <label
                    className="text-[16px] font-noto-bengali font-medium text-[#000] mb-[10px]"
                    htmlFor="text"
                  >
                    আপনার নাম *
                  </label>
                  <input
                    className="w-full h-[50px] text-[16px] border border-[#000]/20 outline-none font-noto-bengali font-bold text-gray-500 shadow-md px-3 "
                    type="text"
                    placeholder="আপনার নাম..."
                  />
                </div>
                <div className="mobile:w-[270px] tablet:w-[510px] laptop:w-[570px] computer:w-[570px] mb-[20px] ">
                  <label
                    className="text-[16px] font-noto-bengali font-medium text-[#000] mb-[10px]"
                    htmlFor="text"
                  >
                    আপনার পূর্ণ ঠিকানা *
                  </label>
                  <input
                    className="w-full h-[50px] text-[16px] border border-[#000]/20 outline-none font-noto-bengali font-bold text-gray-500 shadow-md px-3 "
                    type="text"
                    placeholder="আপনার পূর্ণ ঠিকানা..."
                  />
                </div>
                <div className="mobile:w-[270px] tablet:w-[510px] laptop:w-[570px] computer:w-[570px] mb-[20px] ">
                  <label
                    className="text-[16px] font-noto-bengali font-medium text-[#000] mb-[10px]"
                    htmlFor="text"
                  >
                    মোবাইল নাম্বার *
                  </label>
                  <input
                    className="w-full h-[50px] text-[16px] border border-[#000]/20 outline-none font-noto-bengali font-bold text-gray-500 shadow-md px-3 "
                    type="text"
                    placeholder="মোবাইল নাম্বার..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      // checked={saveInfo}
                      // onChange={e => setSaveInfo(e.target.checked)}
                    />
                    <span>দ্বিতীয়বার অডারের জন্য আপনার তথ্য সেভ করুন </span>
                  </label>
                </div>
              </div>
              <div className="mobile:mt-[30px] tablet:mt-[30px] laptop:mt-[30px] computer:mt-0 mobile:p-[20px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] computer:w-[500px] bg-[#69727d]/10 border border-[#000]/20 shadow-md rounded-[6px]">
                <h4 className="text-[26px] font-noto-bengali font-bold text-[#000] mb-[30px]">
                  অর্ডার লিস্ট
                </h4>
                <div className="flex items-center justify-between mb-[20px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-600">
                    Products
                  </h4>
                  <h4 className="text-[16px] font-bold font-nunito text-gray-600">
                    Subtotals
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[10px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Smartec 20V cord
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    1000tk
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Smartec 20V cord
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    1000tk
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[20px] border-t border-[#000]/30 ">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500 mt-[10px]">
                    Subtotal
                  </h4>
                  <h4 className="mt-[10px] text-[16px] font-bold font-noto-bengali text-gray-600">
                    4000tk
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Shipping cost
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    200tk
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[30px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Total
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    2000tk
                  </h4>
                </div>

                <h4 className="text-[18px] font-bold font-noto-bengali text-gray-600">
                  # Cash On Delivery
                </h4>
                <button className="mobile:text-[20px] tablet:text-[28px] laptop:text-[28px] computer:text-[28px] font-bold font-noto-bengali text-white bg-[#C67D09] py-[12px] mobile:px-[82px] tablet:px-[185px] laptop:px-[145px] computer:px-[145px] cursor-pointer rounded-[4px] mt-[30px]">
                  অর্ডার করুন
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
