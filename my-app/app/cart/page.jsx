'use client';

import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import Container from '../../Componets/Container/Container';
import CheckBox from '../../Componets/CheckBox';
import socket from '../../utills/socket';
import { useSnackbar } from 'notistack';

const page = () => {
  let { enqueueSnackbar } = useSnackbar();
  let [Selectpayment, setSelectpayment] = useState(null);
  let [cartData, setCartData] = useState([]);
  let handlePaymentChange = paymentMethod => {
    setSelectpayment(paymentMethod);
  };

  async function FetchCart() {
    let cartId = JSON.parse(localStorage.getItem('CARTID'));
    try {
      let response = await fetch(
        `https://taranga-e-com.onrender.com/api/v3/cart/reatCart?cartId=${cartId}`
      );
      if (!response.ok) throw new Error('Failed to fetch Cart');
      let data = await response.json();
      setCartData(data.data.items);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchCart();
    let cartId = JSON.parse(localStorage.getItem('CARTID'));
    socket.emit('joinCart', { cartId: cartId });
    socket.on('cartFetched', newCartData => {
      console.log(newCartData);
      setCartData(newCartData.items);
    });

    return () => socket.off('cartFetched');
  }, [socket]);

  let handleCartDelete = async () => {
    const isMobile = window.innerWidth < 768;
    let cartId = JSON.parse(localStorage.getItem('CARTID'));
    try {
      let response = await fetch(
        `https://taranga-e-com.onrender.com/api/v3/cart/deleteCart?cartId=${cartId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) throw new Error('Failed to Delete cart');
      let data = await response.json();
      if (data.msg === 'cart delete Successfully !') {
        localStorage.removeItem('CARTID');
        localStorage.removeItem('cartInfo');
        window.dispatchEvent(new Event('storage'));
        setCartData([]);
        enqueueSnackbar(data.msg, {
          variant: 'info',
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="mobile:pt-[50px] tablet:pt-[80px] laptop:pt-[100px] computer:pt-[100px] mobile:pb-[150px] tablet:pb-[200px] laptop:pb-[400px] computer:pb-[500px]">
        <Container>
          <div>
            <h4 className="text-[30px] font-nunito font-bold text-[#1e293b] mb-[20px]">
              Cart
            </h4>
            <div className="border border-[#000]/30 mb-[50px]">
              <div className="flex items-center justify-between mobile:p-[5px] tablet:p-[10px] laptop:p-[15px] computer:p-[15px] border-b border-[#000]/30 bg-[#fbfbfb]">
                <div>
                  <h4 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px] font-nunito font-bold text-[#1e293b]">
                    Product
                  </h4>
                </div>
                <div className="flex items-center mobile:gap-[15px] tablet:gap-[80px] laptop:gap-[80px] computer:gap-[80px] ">
                  <h4 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px] font-nunito font-bold text-[#1e293b]">
                    Price
                  </h4>
                  <h4 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px] font-nunito font-bold text-[#1e293b]">
                    Quantity
                  </h4>
                  <h4 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px] font-nunito font-bold text-[#1e293b]">
                    Subtotal
                  </h4>
                </div>
              </div>
              <div className="mobile:h-[250px] tablet:h-[300px] laptop:h-[450px] computer:h-[450px] overflow-y-scroll">
                {cartData?.map((items, indx) => (
                  <div
                    key={indx}
                    className="flex items-center justify-between mobile:p-[5px] tablet:p-[10px] laptop:p-[15px] computer:p-[15px] border-b border-[#000]/30"
                  >
                    <div className="flex items-center mobile:gap-[5px] tablet:gap-[10px] laptop:gap-[20px] computer:gap-[20px]">
                      <span
                        onClick={handleCartDelete}
                        className="mobile:text-[14px] tablet:text-[16px] laptop:text-[20px] computer:text-[20px] cursor-pointer"
                      >
                        <RxCross1 />
                      </span>
                      <img
                        className="mobile:hidden tablet:hidden laptop:block computer:bloxk max-w-[100px] h-auto cursor-pointer"
                        src={items.productId.photo?.[0]}
                        alt="product"
                      />
                      <h4 className="mobile:text-[13px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px]  font-bold font-nunito text-[#f1a31c] hover:text-[#4169e1] ease-in-out duration-300 cursor-pointer truncate mobile:w-[100px] tablet:w-[150px] laptop:w-[350px] computer:w-[500px]">
                        {items.productId.name}
                      </h4>
                    </div>
                    <div className="flex items-center mobile:gap-[20px] tablet:gap-[10px] laptop:gap-[30px] computer:gap-[30px]">
                      <h4 className="mobile:text-[10px] tablet:text-[16px] laptop:text-[16px]  computer:text-[16px] font-bold font-nunito text-[#1e293b] tablet:flex tablet:items-center tablet:gap-1 laptop:flex laptop:items-center laptop:gap-1 computer:flex computer:items-center computer:gap-1">
                        {items.productId.price}
                        <span className="mobile:hidden tablet:block laptop:block computer:block">
                          .00৳
                        </span>
                      </h4>
                      <div className="flex items-center">
                        <button className="mobile:text-[10px] tablet:text-[16px] laptop:text-[16px]  computer:text-[16px] cursor-pointer font-bold border border-[#000]/30 mobile:py-[4px] mobile:px-[8px] tablet:py-2.5 tablet:px-5 laptop:py-2.5 laptop:px-5 computer:py-2.5 computer:px-5">
                          -
                        </button>
                        <button className="mobile:text-[10px] tablet:text-[16px] laptop:text-[16px]  computer:text-[16px] font-bold border border-[#000]/30 mobile:py-[4px] mobile:px-[8px] tablet:py-2.5 tablet:px-5 laptop:py-2.5 laptop:px-5 computer:py-2.5 computer:px-5">
                          {items.quantity}
                        </button>
                        <button className="mobile:text-[10px] tablet:text-[16px] laptop:text-[16px]  computer:text-[16px] cursor-pointer font-bold border border-[#000]/30 mobile:py-[4px] mobile:px-[8px] tablet:py-2.5 tablet:px-5 laptop:py-2.5 laptop:px-5 computer:py-2.5 computer:px-5">
                          +
                        </button>
                      </div>
                      <h4 className="mobile:text-[10px] tablet:text-[16px] laptop:text-[16px]  computer:text-[16px] font-bold font-nunito text-[#1e293b] tablet:flex tablet:items-center tablet:gap-1 laptop:flex laptop:items-center laptop:gap-1 computer:flex computer:items-center computer:gap-1">
                        {items.singleSubtotal}
                        <span className="mobile:hidden tablet:block laptop:block computer:block">
                          .00৳
                        </span>
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mobile:p-[8px] tablet:p-[15px] laptop:p-[15px] computer:p-[15px] mt-[30px] border-t border-[#000]/30">
                <input
                  className="text-[16px] font-nunito font-normal text-[#1e293b] border border-[#000]/30 h-[40px] p-[5px] focus:outline-dotted focus:outline-[#000]/30 mobile:w-[150px] tablet:w-[200px] laptop:w-[230px] computer:w-[230px]"
                  type="text"
                  placeholder="Coupon code..."
                />
                <button className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-[#1e293b] cursor-pointer bg-[#f1a31c] mobile:py-[10px] mobile:px-[20px] tablet:py-[10px] tablet:px-[28px] laptop:py-[10px] laptop:px-[28px] computer:py-[10px] computer:px-[28px] rounded-[6px] hover:bg-[#4169e1] hover:text-[#FFF] ease-in-out duration-300 ml-[20px]">
                  Apply Coupon
                </button>
              </div>
            </div>

            <div className="border border-[#000]/30 px-[10px] mobile:w-full tablet:w-full laptop:w-[47%] computer:w-[47%] mobile:float-none tablet:float-none laptop:float-right computer:float-right ">
              <div className="border-b border-[#000]/30 p-[20px] bg-[#fbfbfb]">
                <h4 className="mobile:text-[15px] tablet:text-[20px] laptop:text-[30px] computer:text-[30px] font-nunito font-bold text-[#1e293b]">
                  Cart totals
                </h4>
              </div>
              <div className="flex items-center justify-between border-b border-[#000]/30 p-[10px]">
                <h4 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#1e293b]">
                  Subtotal
                </h4>
                <h4 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#1e293b]">
                  4,650.00৳
                </h4>
              </div>
              <div className="flex items-center justify-between border-b border-[#000]/30 p-[10px]">
                <h4 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-[#1e293b]">
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
                <h4 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-[#1e293b]">
                  Total
                </h4>
                <h4 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-[#1e293b]">
                  4,650.00৳
                </h4>
              </div>
              <button className="mobile:text-[12px] tablet:text-[16px] laptop:text-[18px] computer:text-[18px] font-nunito font-bold text-[#1e293b] bg-[#f1a31c] mobile:py-[14px] mobile:px-[85px] tablet:py-[18px] tablet:px-[200px] laptop:py-[18px] laptop:px-[125px] computer:py-[18px] computer:px-[185px] hover:text-[#FFF] hover:bg-[#4169e1] ease-in-out duration-300 mt-[20px] rounded-[6px] mb-[30px] cursor-pointer">
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
