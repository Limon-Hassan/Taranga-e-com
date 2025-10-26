'use client';

import React, { useEffect, useState } from 'react';
import Container from '../../../Componets/Container/Container';
import { FaCartShopping } from 'react-icons/fa6';
import { useParams } from 'next/navigation';
import { useSnackbar } from 'notistack';
const page = () => {
  const params = useParams();
  let { enqueueSnackbar } = useSnackbar();
  let [singleCategoryData, setSingleCategoryData] = useState([]);

  useEffect(() => {
    async function Fetch() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/category/getCategory?id=${params.id}`,
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
  }, [params._id]);

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

  let handleCart = async proID => {
    const isMobile = window.innerWidth < 768;
    let productId = proID;
    let savedCartId = JSON.parse(localStorage.getItem('CARTID'));
    if (!savedCartId) {
      savedCartId = `CRT-${uuidv4().split('-')[0].toUpperCase()}`;
      localStorage.setItem('CARTID', JSON.stringify(savedCartId));
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/cart/addCart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId,
            cartId: savedCartId,
          }),
        }
      );
      let data = await response.json();
      if (!response.ok) {
        enqueueSnackbar(data.msg, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'top',
            horizontal: isMobile ? 'center' : 'right',
          },
          style: {
            width: isMobile ? '300px' : '350px',
            fontSize: isMobile ? '14px' : '16px',
            backgroundColor: '#D32F2F',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '8px',
          },
        });
        return;
      }
      if (data.msg === 'Product added to cart!') {
        enqueueSnackbar(data.msg, {
          variant: 'success',
          anchorOrigin: {
            vertical: 'top',
            horizontal: isMobile ? 'center' : 'right',
          },
          style: {
            width: isMobile ? '300px' : '350px',
            fontSize: isMobile ? '14px' : '16px',
            backgroundColor: '#629D23',
            color: '#fff',
            padding: '10px 15px',
            borderRadius: '8px',
          },
        });
        localStorage.setItem(
          'cartInfo',
          JSON.stringify({
            items: data.data.items,
            cartLength: data.data.items.length,
            totalPrice: data.data.totalPrice,
          })
        );
        window.dispatchEvent(new Event('storage'));
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: 'error' });
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
                className="mobile:shadow-md tablet:shadow-md laptop:shadow-none computer:shadow-none border border-black/40 mobile:p-1 tablet:p-[3px] laptop:p-[3px] computer:p-[3px] mobile:max-w-[200px] tablet:max-w-[200px] laptop:max-w-[280px] computer:max-w-[280px] hover:border-[#F1A31C] rounded-sm"
              >
                <div className="mobile:w-full tablet:w-auto laptop:w-full computer:w-full mobile:h-[140px] tablet:h-40 laptop:h-[250px] computer:h-[250px] flex items-center justify-center mx-auto">
                  <img
                    className="w-full h-full object-cover cursor-pointer"
                    src={pro.photo[0]}
                    alt="product"
                  />
                </div>

                <div className="bg-[#eeeeee] text-center w-full max-h-[220px] pb-[15px]">
                  <h3 className="mobile:text-[14px] wrap-break-word tablet:text-[16px] laptop:text-[15px] computer:text-[15px] pt-2.5 mobile:font-bold tablet:font-bold laptop:font-medium mobile:w-[170px] tablet:w-[170px] laptop:w-[185px] computer:w-[200px] text-center mx-auto computer:font-medium cursor-pointer font-nunito text-[#1e293b] mb-[5px] line-clamp-3 overflow-hidden text-ellipsis h-[75px]">
                    {pro.name}
                  </h3>
                  <h5 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito  font-normal text-[#1e293b] mb-[5px] h-[20px]">
                    {singleCategoryData?.map((cat, index) => (
                      <span
                        key={index}
                        className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito  font-normal text-[#1e293b] mb-[5px] h-[20px]"
                      >
                        {cat.name}
                      </span>
                    ))}
                  </h5>
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
                      pro.stock < 1 ? 'text-green-600' : 'text-red-400'
                    }`}
                  >
                    {pro.stock >= 5 ? 'In stock' : 'Out of stock'}
                  </h5>

                  <button
                    onClick={() => handleCart(pro._id)}
                    disabled={pro.stock < 1}
                    className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-noto-bengali font-bold text-[#FFF] bg-[#F1A31C] border-b-4 border-[#BD8017] mobile:w-[180px] tablet:w-full laptop:w-full computer:w-full mobile:h-[36px] tablet:h-[40px] laptop:h-[40px] computer:h-[40px] rounded-full flex items-center justify-center mx-auto cursor-pointer"
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
