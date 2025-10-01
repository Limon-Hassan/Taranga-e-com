'use client';
import CheckBox from '@/Componets/CheckBox';
import Container from '@/Componets/Container/Container';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';

const page = () => {
  let [Selectpayment, setSelectpayment] = useState(null);
  let handlePaymentChange = paymentMethod => {
    setSelectpayment(paymentMethod);
  };

  return (
    <>
      <section className="pt-[100px] pb-[500px]">
        <Container>
          <div>
            <h4 className="text-[30px] font-nunito font-bold text-[#1e293b] mb-[20px]">
              Cart
            </h4>
            <div className="border border-[#000]/30 mb-[50px]">
              <div className="flex items-center justify-between p-[15px] border-b border-[#000]/30 bg-[#fbfbfb]">
                <div>
                  <h4 className="text-[18px] font-nunito font-bold text-[#1e293b]">
                    Product
                  </h4>
                </div>
                <div className="flex items-center gap-[80px] ">
                  <h4 className="text-[18px] font-nunito font-bold text-[#1e293b]">
                    Price
                  </h4>
                  <h4 className="text-[18px] font-nunito font-bold text-[#1e293b]">
                    Quantity
                  </h4>
                  <h4 className="text-[18px] font-nunito font-bold text-[#1e293b]">
                    Subtotal
                  </h4>
                </div>
              </div>
              <div className="h-[450px] overflow-y-scroll">
                <div className="flex items-center justify-between  p-[15px] border-b border-[#000]/30">
                  <div className="flex items-center gap-[20px]">
                    <span className="text-[20px] cursor-pointer">
                      <RxCross1 />
                    </span>
                    <img
                      className="max-w-[100px] h-auto cursor-pointer"
                      src="/THT15246.webp"
                      alt="product"
                    />
                    <h4 className="text-[18px] font-bold font-nunito text-[#f1a31c] hover:text-[#4169e1] ease-in-out duration-300 cursor-pointer truncate w-[500px]">
                      Smartec 20V Cordless Impact Drill Machine Metal Chuck With
                      24ps Accessories
                    </h4>
                  </div>
                  <div className="flex items-center gap-[30px]">
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                    <div className="flex items-center">
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        -
                      </button>
                      <button className="text-[16px] font-bold border border-[#000]/30 py-2.5 px-5">
                        1
                      </button>
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        +
                      </button>
                    </div>
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between  p-[15px] border-b border-[#000]/30">
                  <div className="flex items-center gap-[20px]">
                    <span className="text-[20px] cursor-pointer">
                      <RxCross1 />
                    </span>
                    <img
                      className="max-w-[100px] h-auto cursor-pointer"
                      src="/THT15246.webp"
                      alt="product"
                    />
                    <h4 className="text-[18px] font-bold font-nunito text-[#f1a31c] hover:text-[#4169e1] ease-in-out duration-300 cursor-pointer truncate w-[500px]">
                      Smartec 20V Cordless Impact Drill Machine Metal Chuck With
                      24ps Accessories
                    </h4>
                  </div>
                  <div className="flex items-center gap-[30px]">
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                    <div className="flex items-center">
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        -
                      </button>
                      <button className="text-[16px] font-bold border border-[#000]/30 py-2.5 px-5">
                        1
                      </button>
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        +
                      </button>
                    </div>
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between  p-[15px] border-b border-[#000]/30">
                  <div className="flex items-center gap-[20px]">
                    <span className="text-[20px] cursor-pointer">
                      <RxCross1 />
                    </span>
                    <img
                      className="max-w-[100px] h-auto cursor-pointer"
                      src="/THT15246.webp"
                      alt="product"
                    />
                    <h4 className="text-[18px] font-bold font-nunito text-[#f1a31c] hover:text-[#4169e1] ease-in-out duration-300 cursor-pointer truncate w-[500px]">
                      Smartec 20V Cordless Impact Drill Machine Metal Chuck With
                      24ps Accessories
                    </h4>
                  </div>
                  <div className="flex items-center gap-[30px]">
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                    <div className="flex items-center">
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        -
                      </button>
                      <button className="text-[16px] font-bold border border-[#000]/30 py-2.5 px-5">
                        1
                      </button>
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        +
                      </button>
                    </div>
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                  </div>
                </div>
                <div className="flex items-center justify-between  p-[15px] border-b border-[#000]/30">
                  <div className="flex items-center gap-[20px]">
                    <span className="text-[20px] cursor-pointer">
                      <RxCross1 />
                    </span>
                    <img
                      className="max-w-[100px] h-auto cursor-pointer"
                      src="/THT15246.webp"
                      alt="product"
                    />
                    <h4 className="text-[18px] font-bold font-nunito text-[#f1a31c] hover:text-[#4169e1] ease-in-out duration-300 cursor-pointer truncate w-[500px]">
                      Smartec 20V Cordless Impact Drill Machine Metal Chuck With
                      24ps Accessories
                    </h4>
                  </div>
                  <div className="flex items-center gap-[30px]">
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                    <div className="flex items-center">
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        -
                      </button>
                      <button className="text-[16px] font-bold border border-[#000]/30 py-2.5 px-5">
                        1
                      </button>
                      <button className="text-[16px] cursor-pointer font-bold border border-[#000]/30 py-2.5 px-5">
                        +
                      </button>
                    </div>
                    <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                      4,650.00৳
                    </h4>
                  </div>
                </div>
              </div>
              <div className="p-[15px] mt-[30px] border-t border-[#000]/30">
                <input
                  className="text-[16px] font-nunito font-normal text-[#1e293b] border border-[#000]/30 h-[40px] p-[5px] focus:outline-dotted focus:outline-[#000]/30 w-[230px]"
                  type="text"
                  placeholder="Coupon code..."
                />
                <button className="text-[16px] font-bold font-nunito text-[#1e293b] cursor-pointer bg-[#f1a31c] py-[10px] px-[28px] rounded-[6px] hover:bg-[#4169e1] hover:text-[#FFF] ease-in-out duration-300 ml-[20px]">
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="border border-[#000]/30 px-[10px] w-[47%] float-right ">
              <div className="border-b border-[#000]/30 p-[20px] bg-[#fbfbfb]">
                <h4 className="text-[30px] font-nunito font-bold text-[#1e293b]">
                  Cart totals
                </h4>
              </div>
              <div className="flex items-center justify-between border-b border-[#000]/30 p-[10px]">
                <h4 className="text-[16px] font-nunito font-bold text-[#1e293b]">
                  Subtotal
                </h4>
                <h4 className="text-[16px] font-nunito font-bold text-[#1e293b]">
                  4,650.00৳
                </h4>
              </div>
              <div className="flex items-center justify-between border-b border-[#000]/30 p-[10px]">
                <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                  Shipping
                </h4>
                <div className="my-[10px]">
                  <CheckBox
                    label="Outside Dhaka: 130.00৳"
                    checked={Selectpayment === 'Outside Dhaka: 130.00৳'}
                    className="rounded-full mb-2.5"
                    onChange={() =>
                      handlePaymentChange('Outside Dhaka: 130.00৳')
                    }
                  />
                  <CheckBox
                    label="Inside Dhaka: 80.00৳"
                    checked={Selectpayment === 'Inside Dhaka: 80.00৳'}
                    className="rounded-full"
                    onChange={() => handlePaymentChange('Inside Dhaka: 80.00৳')}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-[#000]/30 p-[10px]">
                <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                  Total
                </h4>
                <h4 className="text-[16px] font-bold font-nunito text-[#1e293b]">
                  4,650.00৳
                </h4>
              </div>
              <button className="text-[18px] font-nunito font-bold text-[#1e293b] bg-[#f1a31c] py-[18px] px-[185px] hover:text-[#FFF] hover:bg-[#4169e1] ease-in-out duration-300 mt-[20px] rounded-[6px] mb-[30px] cursor-pointer">
                Proceed to checkout
              </button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default page;
