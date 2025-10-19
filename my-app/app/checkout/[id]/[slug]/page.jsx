'use client';
import React, { useEffect, useState } from 'react';
import Container from '../../../../Componets/Container/Container';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';

const page = () => {
  let router = useRouter();
  let [name, SetName] = useState('');
  let { enqueueSnackbar } = useSnackbar();
  let [phone, SetPhone] = useState('');
  let [Address, SetAddress] = useState('');
  let [saveInfo, setSaveInfo] = useState(false);
  let [SummeryData, setSummeryData] = useState([]);

  const [error, setError] = useState({
    name: false,
    phone: false,
    address: false,
  });

  async function FetchInfo() {
    let phone = JSON.parse(localStorage.getItem('userInfo'));
    if (!phone) return;
    try {
      const res = await fetch(
        `http://localhost:7000/api/v3/checkout/getSavedInfo?phone=${phone}`
      );

      if (!res.ok) return;

      const data = await res.json();
      if (data?.data) {
        SetName(data.data.name || '');
        SetAddress(data.data.address || '');
        SetPhone(data.data.phone?.toString() || '');
        setSaveInfo(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchInfo();
  }, []);

  async function FetchSummery() {
    let CartId = JSON.parse(localStorage.getItem('CARTID'));
    try {
      let res = await fetch(
        `http://localhost:7000/api/v3/cart/FinalSummery?CartId=${CartId}`,
        {
          method: 'GET',
        }
      );

      if (!res.ok) throw new Error('Failed to fetch CartSummery');

      let data = await res.json();
      setSummeryData(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchSummery();
  }, []);

  let handleSubmit = async () => {
    const isMobile = window.innerWidth < 768;
    let cartId = JSON.parse(localStorage.getItem('CARTID'));
    try {
      if (!name || !phone || !Address) {
        setError({
          name: !name,
          phone: !phone,
          address: !Address,
        });

        enqueueSnackbar('দয়া করে সবগুলোই পূরণ করুন', {
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

      if (phone.length < 11) {
        setError(prev => ({ ...prev, phone: true }));

        enqueueSnackbar('মোবাইল নাম্বার সঠিক নয় (১১ ডিজিট দিতে হবে)', {
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

      setError({ name: false, phone: false, address: false });

      const bodyData = {
        cartId,
        name,
        phone,
        address: Address,
        saveInfo,
      };

      const response = await fetch(
        'http://localhost:7000/api/v3/checkout/makeCheckout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bodyData),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.msg || 'Checkout failed');
      if (data.msg === 'Checkout successful') {
        localStorage.removeItem('cartInfo');
        localStorage.removeItem('CARTID');
        setSummeryData([]);
        localStorage.setItem('userInfo', JSON.stringify(phone));
        window.dispatchEvent(new Event('storage'));
        enqueueSnackbar('ধন্যবাদ আপনাকে সফলভাবে চেকআউট করার জন্য', {
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
        SetName('');
        SetAddress('');
        SetPhone('');
        setSaveInfo(false);
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  let handleShowProduct = async product => {
    try {
      let response = await fetch(
        `http://localhost:7000/api/v3/product/getProduct?id=${product}`
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
                    className={`w-full h-[50px] text-[16px] border border-[#000]/20 outline-none ${
                      error.name ? 'border-red-500' : 'border-[#000]/20'
                    } font-noto-bengali border font-bold text-gray-500 shadow-md px-3 `}
                    type="text"
                    value={name}
                    onChange={e => SetName(e.target.value)}
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
                    className={`w-full ${
                      error.address ? 'border-red-500' : 'border-[#000]/20'
                    } h-[50px] text-[16px] border outline-none font-noto-bengali font-bold text-gray-500 shadow-md px-3 `}
                    type="text"
                    value={Address}
                    onChange={e => SetAddress(e.target.value)}
                    placeholder="আপনার পূর্ণ ঠিকানা..."
                  />
                </div>
                <div className="mobile:w-[270px] tablet:w-[510px] laptop:w-[570px] computer:w-[570px] mb-[20px]">
                  <label
                    className="text-[16px] font-noto-bengali font-medium text-[#000] mb-[10px]"
                    htmlFor="text"
                  >
                    মোবাইল নাম্বার *
                  </label>
                  <input
                    className={`w-full h-[50px] ${
                      error.phone ? 'border-red-500' : 'border-[#000]/20'
                    } text-[16px] border outline-none font-noto-bengali font-bold text-gray-500 shadow-md px-3 `}
                    type="text"
                    value={phone}
                    onChange={e => SetPhone(e.target.value)}
                    placeholder="মোবাইল নাম্বার..."
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={e => setSaveInfo(e.target.checked)}
                    />
                    <span>দ্বিতীয়বার অডারের জন্য আপনার তথ্য সেভ করুন </span>
                  </label>
                </div>
              </div>
              <div className="mobile:mt-[30px] tablet:mt-[30px] laptop:mt-[30px] computer:mt-0 mobile:p-[15px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] computer:w-[500px] bg-[#69727d]/10 border border-[#000]/20 shadow-md rounded-[6px]">
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
                {SummeryData.items?.map((item, indx) => (
                  <div
                    key={indx}
                    className="flex items-center justify-between mb-[10px]"
                  >
                    <h4
                      onClick={() => handleShowProduct(item.productId._id)}
                      className="text-[16px] mobile:w-[220px] tablet:w-[415px] laptop:w-[478px] hover:text-[#4169e1] computer:w-[360px] truncate font-bold font-nunito text-[#f1a31c] cursor-pointer"
                    >
                      ({item.quantity}) {item.productId.name}
                    </h4>
                    <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                      {item.productId.price}
                    </h4>
                  </div>
                ))}

                <div className="flex items-center justify-between mb-[20px] border-t border-[#000]/30 ">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500 mt-[10px]">
                    Subtotal
                  </h4>
                  <h4 className="mt-[10px] text-[16px] font-bold font-noto-bengali text-gray-600">
                    (+) {SummeryData.subTotal || 0}
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[20px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Shipping cost
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    {SummeryData.shippingCost || 0}
                  </h4>
                </div>
                <div className="flex items-center justify-between mb-[30px]">
                  <h4 className="text-[16px] font-bold font-nunito text-gray-500">
                    Total
                  </h4>
                  <h4 className=" text-[16px] font-bold font-noto-bengali text-gray-600">
                    {SummeryData.totalPrice || 0}
                  </h4>
                </div>

                <h4 className="text-[18px] font-bold font-noto-bengali text-gray-600">
                  # Cash On Delivery
                </h4>
                <button
                  onClick={handleSubmit}
                  className="mobile:text-[20px] tablet:text-[28px] laptop:text-[28px] computer:text-[28px] font-bold font-noto-bengali text-white bg-[#C67D09] py-[12px] mobile:px-[82px] tablet:px-[185px] laptop:px-[145px] computer:px-[145px] cursor-pointer rounded-[4px] mt-[30px]"
                >
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
