'use client';

import React, { useEffect, useState } from 'react';
import Container from '../../../Componets/Container/Container';
import { FaCartShopping } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
const page = () => {
  const { id } = useParams();
  let [singleCategoryData, setSingleCategoryData] = useState([]);

  useEffect(() => {
    async function Fetch() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/category/getCategory?id=${id}`,
          {
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setSingleCategoryData(data);
      } catch (error) {
        console.error(error.message);
      }
    }

    Fetch();
  }, [id]);

  let handleShowProduct = async product => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/product/getProduct?id=${product}`
      );

      if (!response.ok) throw new Error('Failed to fetch product');

      const data = await response.json();
      window.location.href = `/productDetails/${
        data.product._id
      }/${data.product.name.replace(/\s+/g, '-')}`;
    } catch (error) {
      console.log(error);
    }
  };

  let handleDirectCheckout = async proID => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/product/getProduct?id=${proID}`
      );

      if (!response.ok) throw new Error('Failed to fetch product');
      let data = await response.json();
      window.location.href = `/checkout/${
        data.product._id
      }/${data.product.name.replace(/\s+/g, '-')}`;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="mobile:w-full tablet:w-full mobile:mb-[50px] tablet:mb-[20px] laptop:mb-[30px] computer:mb-[30px] tablet:py-[100px] laptop:py-[100px] computer:py-[100px] mobile:py-[50px]">
        <Container>
          <div className="flex items-center justify-between ">
            <h3 className="mobile:text-[15px] tablet:text-[18px] laptop:text-[28px] computer:text-[28px] font-nunito mobile:font-bold tablet:font-bold  laptop:font-bold computer:font-bold text-[#1e293b] mb-[20px]">
              {singleCategoryData[0]?.name}
            </h3>
            <h3 className="mobile:text-[15px] tablet:text-[18px] laptop:text-[18px] computer:text-[18px] font-nunito mobile:font-bold tablet:font-normal  laptop:font-normal computer:font-normal text-[#1e293b] mb-[20px] cursor-pointer underline">
              Total ({singleCategoryData[0]?.totalproducts})
            </h3>
          </div>
          <div className="flex flex-wrap items-center mobile:justify-normal computer:justify-normal laptop:justify-normal tablet:justify-center mobile:gap-[10px] tablet:gap-[18px] laptop:gap-[26px] computer:gap-[26px] mobile:mt-[20px] tablet:mt-[50px] laptop:mt-[50px] computer:mt-[50px]">
            {singleCategoryData[0]?.Product?.map((pro, index) => (
              <div
                key={index}
                onClick={() => handleShowProduct(pro._id)}
                className="relative z-0 mobile:shadow-md tablet:shadow-md laptop:shadow-none computer:shadow-none border border-black/40 mobile:p-1 tablet:p-[3px] laptop:p-[3px] computer:p-[3px] mobile:w-[48%] tablet:w-[31%] laptop:w-[31%] computer:w-[23%] hover:border-[#F1A31C] rounded-sm"
              >
                <div className="mobile:w-full tablet:w-auto laptop:w-full computer:w-full mobile:h-full tablet:h-full laptop:h-[250px] computer:h-[250px] flex items-center justify-center mx-auto">
                  <img
                    className="w-full h-full bg-white object-cover cursor-pointer"
                    src={pro.photo[0]}
                    alt="product"
                  />
                </div>
                {pro.disCountPrice > 0 && (
                  <div className="absolute top-[5px] left-[5px] bg-[#E6963A] mobile:text-[12px] tablet:text-[14px] laptop:text-[14px] computer:text-[14px] font-nunito font-bold text-white mobile:w-[90px] mobile:h-[30px] tablet:w-[90px] tablet:h-[35px] laptop:w-[90px] laptop:h-[35px] computer:w-[90px] computer:h-[35px] rounded-full flex items-center justify-center z-10">
                    Sale {pro.disCountPrice}% off
                  </div>
                )}
                <div className="bg-[#eeeeee] text-center w-full max-h-[220px] pb-[15px]">
                  <h3 className="mobile:text-[14px] wrap-break-word tablet:text-[16px] laptop:text-[15px] computer:text-[15px] pt-2.5 mobile:font-bold tablet:font-bold laptop:font-medium mobile:w-auto tablet:w-[170px] laptop:w-[185px] computer:w-[200px] text-center mx-auto computer:font-medium cursor-pointer font-nunito text-[#1e293b] mb-[5px] line-clamp-3 overflow-hidden text-ellipsis h-[75px]">
                    {pro.name}
                  </h3>
                  {singleCategoryData?.map((cat, index) => (
                    <span
                      key={index}
                      className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito  font-normal text-[#1e293b] mb-[5px] h-[20px]"
                    >
                      {cat.name}
                    </span>
                  ))}
                  <div className="flex items-center justify-center gap-2.5 mx-auto h-[25px]">
                    <h2 className="mobile:text-[16px] tablet:text-[18px] laptop:text-[20px] computer:text-[20px] font-nunito font-bold text-[#a1a0a0] my-line-through">
                      {pro.oldPrice}৳
                    </h2>
                    <h2 className="mobile:text-[18px] tablet:text-[18px] laptop:text-[20px] computer:text-[20px] font-nunito font-bold text-[#778E38]">
                      {pro.price}৳
                    </h2>
                  </div>
                  <h5
                    className={`text-sm font-semibold my-1.5 h-[20px] ${
                      pro.stock >= 1 ? 'text-green-600' : 'text-red-400'
                    }`}
                  >
                    {pro.stock >= 1 ? 'In stock' : 'Out of stock'}
                  </h5>

                  <button
                    onClick={() => handleDirectCheckout(pro._id)}
                    disabled={pro.stock < 1}
                    className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-noto-bengali font-bold text-[#FFF] bg-[#F1A31C] border-b-4 border-[#BD8017] mobile:w-full tablet:w-full laptop:w-full computer:w-full mobile:h-[36px] tablet:h-[40px] laptop:h-[40px] computer:h-[40px] rounded-full flex items-center justify-center mx-auto cursor-pointer"
                  >
                    <FaCartShopping className="mr-2.5" />
                    অডার করুন
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
};

export default page;
