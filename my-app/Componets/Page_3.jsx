'use client';
import React, { useEffect, useState } from 'react';
import Container from './Container/Container';
import { FaCartShopping } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';
const Page_3 = () => {
  const [category, setCategory] = useState([]);
  const router = useRouter();
  let { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function Fetch() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/category/getCategory`,
          {
            cache: 'no-store',
          }
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setCategory(data);
      } catch (error) {
        console.error(error);
      }
    }
    Fetch();
  }, []);

  let handleSubmit = async category => {
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_SERVER_PORT
        }api/v3/category/getCategory?id=${encodeURIComponent(category)}`,
        {
          cache: 'no-store',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();

      setTimeout(() => {
        router.push(`/category/${category}`);
      }, [2000]);
    } catch (error) {
      console.error(error.message);
    }
  };

  let handleShowProduct = async product => {
    try {
      let response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/product/getProduct?id=${product}`
      );

      if (!response.ok) throw new Error('Failed to fetch product');

      const data = await response.json();
      router.push(
        `/productDetails/${data.product._id}/${data.product.name.replace(
          /\s+/g,
          '-'
        )}`
      );
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
      <section className="mobile:w-full tablet:w-full mobile:mb-[50px] tablet:mb-[20px] laptop:mb-[30px] computer:mb-[30px]">
        <Container>
          <div className="flex items-center justify-between border-b border-dashed border-[#000]">
            <h3 className="mobile:text-[15px] tablet:text-[18px] laptop:text-[18px] computer:text-[18px] font-nunito mobile:font-bold tablet:font-normal  laptop:font-normal computer:font-normal text-[#1e293b] mb-[20px]">
              {category[0]?.name}
            </h3>
            <h3
              onClick={() => handleSubmit(category[0]?._id)}
              className="mobile:text-[15px] tablet:text-[18px] laptop:text-[18px] computer:text-[18px] font-nunito mobile:font-bold tablet:font-normal  laptop:font-normal computer:font-normal text-[#1e293b] mb-[20px] cursor-pointer underline"
            >
              See all
            </h3>
          </div>
          <div className="flex flex-wrap items-center mobile:justify-normal computer:justify-normal laptop:justify-normal tablet:justify-center mobile:gap-[10px] tablet:gap-[18px] laptop:gap-[26px] computer:gap-[26px] mt-[50px]">
            {category[0]?.Product?.slice(0, 8).map((item, index) => (
              <div
                key={index}
                onClick={() => handleShowProduct(item._id)}
                className="mobile:shadow-md tablet:shadow-md laptop:shadow-none computer:shadow-none border border-[#000]/40 mobile:p-0 tablet:p-[3px] laptop:p-[3px] computer:p-[3px] mobile:w-[150px] tablet:w-[200px] laptop:w-[280px] computer:w-[280px] hover:border-[#F1A31C] rounded-[4px]"
              >
                <img
                  className="mobile:w-auto tablet:w-auto laptop:w-full computer:w-full mobile:h-[140px] cursor-pointer tablet:h-[160px] laptop:h-[250px] computer:h-[250px]"
                  src={item.photo[0]}
                  alt="product"
                />
                <div className="bg-[#eeeeee] text-center w-full pb-[15px]">
                  <h3 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[20px] computer:text-[20px] pt-[10px] mobile:font-bold tablet:font-bold laptop:font-medium truncate mobile:w-[120px] tablet:w-[140px] laptop:w-[185px] computer:w-[185px] mx-auto computer:font-medium cursor-pointer font-nunito text-[#1e293b] mb-[5px]">
                    {item.name}
                  </h3>
                  <p className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito mobile:font-medium tablet:font-medium laptop:font-normal truncate computer:font-normal text-[#1e293b] mobile:w-auto tablet:w-auto laptop:w-[250px] computer:w-[250px] mx-auto">
                    {item.description}
                  </p>
                  <h5 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-normal text-[#1e293b] mb-[10px]">
                    {category[0]?.name}
                  </h5>
                  <h2 className="mobile:text-[16px] tablet:text-[18px] laptop:text-[20px] computer:text-[20px] font-nunito font-bold text-[#778E38] mobile:mb-[5px]  tablet:mb-[10px] laptop:mb-[10px] computer:mb-[10px]">
                    {item.price}.00৳
                  </h2>
                  <button
                    onClick={() => handleCart(item._id)}
                    className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#FFF] bg-[#F1A31C] border-b-4 border-[#BD8017] mobile:py-[4px] mobile:px-[25px] tablet:py-[4px] tablet:px-[36px] laptop:py-[6px] laptop:px-[70px] computer:py-[6px] computer:px-[70px] mobile:rounded-[15px] tablet:rounded-[18px] laptop:rounded-[20px] computer:rounded-[20px] flex items-center mx-auto cursor-pointer"
                  >
                    <FaCartShopping className="mr-[10px]" />
                    Order Now
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

export default Page_3;
