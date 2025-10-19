'use client';

import React, { useEffect, useRef, useState } from 'react';
import Container from '../../Componets/Container/Container';
import { FaCartShopping } from 'react-icons/fa6';
import { FaChevronDown } from 'react-icons/fa';
import Pagination from '../../Componets/Pagination';
import socket from '../../utills/socket';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaBars } from 'react-icons/fa6';
import { ImCross } from 'react-icons/im';
import { useSnackbar } from 'notistack';
import { v4 as uuidv4 } from 'uuid';

const ClientShop = () => {
  let router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState('');
  let { enqueueSnackbar } = useSnackbar();
  let [minPrice, SetminPrice] = useState(0);
  let [maxPrice, SetmaxPrice] = useState(0);
  const [sortOrder, setSortOrder] = useState('');
  let [CurrentPrice, SetCurrentPrice] = useState(maxPrice);
  let [filteredRange, setFilteredRange] = useState(null);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ActiveSidebar, setActiveSidebar] = useState(false);

  useEffect(() => {
    setQuery(searchParams.get('search') || '');
  }, [searchParams]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  async function FetchProduct() {
    try {
      const params = new URLSearchParams();

      if (query) params.append('query', query);
      if (filteredRange) {
        params.append('minPrice', filteredRange.min);
        params.append('maxPrice', filteredRange.max);
      }
      if (sortOrder) params.append('sort', sortOrder);
      params.append('page', currentPage);
      params.append('limit', 12);

      const url = `http://localhost:7000/api/v3/product/product/searchProduct?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      const allProducts =
        currentPage === 1
          ? [...data.mainProducts, ...data.related]
          : [...data.mainProducts];

      setProducts(allProducts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const highest = Math.max(...prices);
      SetmaxPrice(highest);
      SetCurrentPrice(highest);
    }
  }, [products]);

  useEffect(() => {
    FetchProduct();
  }, [query, filteredRange, sortOrder, currentPage]);

  useEffect(() => {
    socket.on('productCreated', newProduct => {
      console.log('New product received:', newProduct);
      setProducts(prev => [...prev, newProduct]);
    });
    return () => socket.off('productCreated');
  }, []);

  let handleRangeChange = e => {
    const value = Number(e.target.value);
    SetCurrentPrice(value);
    SetmaxPrice(value);
  };
  let handleFilter = () => {
    setFilteredRange({ min: minPrice, max: maxPrice });
    setActiveSidebar(false);
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
        `http://localhost:7000/api/v3/cart/addCart`,
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
    <section className="relative z-0">
      <Container>
        <div
          className="flex justify-between mobile:mt-0 laptop:mt-[60px] computer:mt-[60px] "
          ref={menuRef}
        >
          <button
            onClick={() => setActiveSidebar(!ActiveSidebar)}
            className={`laptop:hidden computer:hidden absolute top-[10px] left-0 z-[99] text-white bg-[#E6963A] text-[20px] rounded-full w-[50px] h-[50px] flex justify-center items-center transition-all duration-500 ease-in-out ${
              ActiveSidebar
                ? 'opacity-100 rotate-90 left-0'
                : 'opacity-50 rotate-0 top-[-20px] left-[-30px]'
            }`}
          >
            {ActiveSidebar ? <ImCross /> : <FaBars />}
          </button>
          {ActiveSidebar === true ? (
            <div
              className={`w-full computer:block laptop:block bg-white absolute top-[10px] left-0 z-50 p-[10px] rounded-[6px]`}
            >
              <div className="mb-[20px] border border-[#e2e2e2] rounded-[8px]">
                <h5 className="text-[20px] font-nunito font-bold text-[#2C3C28] border-b border-[#e2e2e2] py-[30px] pl-[30px] ">
                  Widget Price Filter
                </h5>
                <div className="flex justify-between gap-3 px-[20px] pt-[30px] pb-[15px]">
                  <div className="flex-1">
                    <label className="block text-sm text-[#6E777D] mb-1">
                      Min price
                    </label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={e => SetminPrice(Number(e.target.value))}
                      className="w-full border border-[#e2e2e2] rounded-[4px] px-[15px] py-1.5 outline-none font-medium text-[#2C3C28]"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm text-[#6E777D] mb-1">
                      Max price
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={e => SetmaxPrice(Number(e.target.value))}
                      className="w-full border border-[#e2e2e2] rounded-[4px] px-[15px] py-1.5 outline-none font-medium text-[#2C3C28]"
                    />
                  </div>
                </div>
                <div className="px-[20px] mb-[30px]">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={CurrentPrice}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-[#E6963A] rounded-lg appearance-none cursor-pointer accent-[#E6963A]"
                  />
                  <div className="flex justify-between items-center">
                    <p className="mt-3 text-[16px] font-nunito font-normal text-[#6E777D]">
                      Price: ${minPrice} — ${maxPrice}
                    </p>

                    <button
                      onClick={handleFilter}
                      className="mt-3 bg-[#E6963A] text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-[20px] border border-[#e2e2e2] rounded-[8px]">
                <h5 className="text-[20px] font-nunito font-bold text-[#2C3C28] border-b border-[#e2e2e2] py-[30px] pl-[30px] pr-[20px]">
                  Product Categories
                </h5>
                <div className="p-[20px]">
                  <ul>
                    <li className="list-disc text-[14px] font-nunito  font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] ">
                      <a href="#">Potato</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-[260px] mobile:hidden tablet:hidden computer:block laptop:block">
              <div className="mb-[20px] border border-[#e2e2e2] rounded-[8px]">
                <h5 className="text-[20px] font-nunito font-bold text-[#2C3C28] border-b border-[#e2e2e2] py-[30px] pl-[30px] pr-[20px]">
                  Widget Price Filter
                </h5>
                <div className="flex justify-between gap-3 px-[20px] pt-[30px] pb-[15px]">
                  <div className="flex-1">
                    <label className="block text-sm text-[#6E777D] mb-1">
                      Min price
                    </label>
                    <input
                      type="number"
                      value={minPrice}
                      onChange={e => SetminPrice(Number(e.target.value))}
                      className="w-full border border-[#e2e2e2] rounded-[4px] px-[15px] py-1.5 outline-none font-medium text-[#2C3C28]"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm text-[#6E777D] mb-1">
                      Max price
                    </label>
                    <input
                      type="number"
                      value={maxPrice}
                      onChange={e => SetmaxPrice(Number(e.target.value))}
                      className="w-full border border-[#e2e2e2] rounded-[4px] px-[15px] py-1.5 outline-none font-medium text-[#2C3C28]"
                    />
                  </div>
                </div>
                <div className="px-[20px] mb-[30px]">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={CurrentPrice}
                    onChange={handleRangeChange}
                    className="w-full h-2 bg-[#E6963A] rounded-lg appearance-none cursor-pointer accent-[#E6963A]"
                  />
                  <div className="flex justify-between items-center">
                    <p className="mt-3 text-[16px] font-nunito font-normal text-[#6E777D]">
                      Price: ${minPrice} — ${maxPrice}
                    </p>

                    <button
                      onClick={handleFilter}
                      className="mt-3 bg-[#E6963A] text-white font-semibold py-2 px-4 rounded-md cursor-pointer"
                    >
                      Filter
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-[20px] border border-[#e2e2e2] rounded-[8px]">
                <h5 className="text-[20px] font-nunito font-bold text-[#2C3C28] border-b border-[#e2e2e2] py-[30px] pl-[30px] pr-[20px]">
                  Product Categories
                </h5>
                <div className="p-[20px]">
                  <ul>
                    <li className="list-disc text-[14px] font-nunito  font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] mb-[13px]">
                      <a href="#">Potato</a>
                    </li>
                    <li className="list-disc text-[14px] font-nunito font-medium text-[#2C3C28] leading-[17px] ml-[25px] ">
                      <a href="#">Potato</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          <div className="mobile:w-full tablet:w-full  laptop:w-[670px] computer:w-[915px]">
            <div className="flex justify-between items-center bg-[#F3F4F6] rounded-[6px] p-[15px] relative">
              <h4>Showing results ({products.length})</h4>

              <button
                onClick={() => setOpen(prev => !prev)}
                className="text-[16px] mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px]  font-nunito font-semibold text-[#FFF] bg-[#E6963A] py-[8px] mobile:px-[10px] tablet:px-[14px] laptop:px-[14px] computer:px-[14px] cursor-pointer rounded-[4px] flex items-center gap-2"
              >
                Sort
                <span className="ml-1.5 ">
                  <FaChevronDown />
                </span>
              </button>
              {open && (
                <div className="absolute top-0 right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                  <ul className="py-2 text-sm text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-[#E6963A] hover:text-[#FFF] cursor-pointer transition-all ease-in-out duration-300"
                      onClick={() => {
                        setSortOrder('lowToHigh');
                        setOpen(false);
                      }}
                    >
                      Low to High
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-[#E6963A] hover:text-[#FFF] cursor-pointer transition-all ease-in-out duration-300"
                      onClick={() => {
                        setSortOrder('highToLow');
                        setOpen(false);
                      }}
                    >
                      High To Low
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center mobile:justify-normal computer:justify-normal laptop:justify-normal tablet:justify-center mobile:gap-[10px] tablet:gap-[18px] laptop:gap-[26px] computer:gap-[26px] mobile:mt-[20px] tablet:mt-[50px] laptop:mt-[50px] computer:mt-[50px]">
              {products?.map((pro, idx) => (
                <div
                  key={idx}
                  onClick={() => handleShowProduct(pro._id)}
                  className="mobile:shadow-md tablet:shadow-md laptop:shadow-none computer:shadow-none border border-[#000]/40 mobile:p-0 tablet:p-[3px] laptop:p-[3px] computer:p-[3px] mobile:w-[150px] tablet:w-[200px] laptop:w-[280px] computer:w-[280px]  rounded-[4px]"
                >
                  <img
                    className="mobile:w-auto tablet:w-auto laptop:w-full computer:w-full cursor-pointer mobile:h-[140px] tablet:h-[160px] laptop:h-[250px] computer:h-[250px]"
                    src={pro.photo?.[0]}
                    alt="product"
                  />
                  <div className="bg-[#eeeeee] text-center w-full pb-[15px]">
                    <h3 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[20px] computer:text-[20px] pt-[10px] mobile:font-bold tablet:font-bold laptop:font-medium truncate mobile:w-[120px] tablet:w-[140px] cursor-pointer  laptop:w-[185px] computer:w-[185px] mx-auto computer:font-medium font-nunito text-[#1e293b] mb-[5px]">
                      {pro.name}
                    </h3>
                    <p className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito mobile:font-medium tablet:font-medium laptop:font-normal truncate computer:font-normal text-[#1e293b] mobile:w-auto tablet:w-auto laptop:w-[250px] computer:w-[250px] mx-auto">
                      {pro.description}
                    </p>
                    <h5 className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito  font-normal text-[#1e293b] mb-[10px]">
                      {pro.category[0]?.name}
                    </h5>
                    <h2 className="mobile:text-[16px] tablet:text-[18px] laptop:text-[20px] computer:text-[20px] font-nunito font-bold text-[#778E38] mobile:mb-[5px]  tablet:mb-[10px] laptop:mb-[10px] computer:mb-[10px]">
                      {pro.price}.00৳
                    </h2>
                    <button
                      onClick={() => handleCart(pro._id)}
                      className="mobile:text-[12px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-nunito font-bold text-[#FFF] bg-[#F1A31C] border-b-4 border-[#BD8017] mobile:py-[4px] mobile:px-[25px] tablet:py-[4px] tablet:px-[36px] laptop:py-[6px] laptop:px-[70px] computer:py-[6px] computer:px-[70px] mobile:rounded-[15px] tablet:rounded-[18px] laptop:rounded-[20px] computer:rounded-[20px] flex items-center mx-auto cursor-pointer"
                    >
                      <FaCartShopping className="mr-[10px]" />
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center mobile:my-[40px] tablet:my-[60px] laptop:my-[60px] computer:my-[60px]">
          <Pagination
            active={currentPage}
            setActive={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </Container>
    </section>
  );
};

export default ClientShop;
