'use client';
import React, { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import Container from './Container/Container';
import { FaUser } from 'react-icons/fa';
import socket from '../utills/socket';

const CustomerReview = ({ product }) => {
  let [toggleShow, settoggleShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [Comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [hover, setHover] = useState(0);

  let handleCommentSubmit = async () => {
    const reviewData = {
      name: name,
      productId: product._id,
      rating: rating,
      comment: Comment,
    };

    try {
      const response = await fetch(
        `https://taranga-e-com.onrender.com/api/v3/product/CreateReviews`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      console.log(data);
      settoggleShow(false);
    } catch (error) {
      console.log(error);
    }
  };

  async function FetchReviews() {
    try {
      let response = await fetch(
        `https://taranga-e-com.onrender.com/api/v3/product/getReviews?productId=${product._id}`
      );

      if (!response.ok) throw new Error('Faild to fetch Review');
      let data = await response.json();
      console.log('feetchdata', data);
      setReviews(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    FetchReviews();
    socket.emit('joinProduct', { productId: product._id });
    socket.on('newReview', newReviews => {
      console.log('New Category Received:', newReviews);
      setReviews(prev =>
        Array.isArray(prev)
          ? [...prev, newReviews.reviews]
          : [newReviews.reviews]
      );
    });

    return () => socket.off('newReview');
  }, [product._id]);

  return (
    <>
      <section>
        <Container>
          <div className="flex items-center gap-2">
            <h2 className="mobile:text-[14px] tablet:text-2xl laptop:text-2xl computer:text-2xl font-semibold text-gray-900 ">
              Reviews
            </h2>

            <div className="mt-2 flex items-center gap-2 sm:mt-0">
              <div className="flex items-center gap-0.5">
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <svg
                  className="h-4 w-4 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
              </div>
              <p className="text-sm font-medium leading-none text-gray-500 ">
                (4.6)
              </p>
              <a
                href="#"
                className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline "
              >
                645 Reviews
              </a>
            </div>
          </div>

          <div className="my-6 gap-8 sm:flex sm:items-start md:my-8 ">
            <div className="shrink-0 space-y-4 ">
              <p className="text-2xl font-semibold leading-none text-gray-900 ">
                4.65 out of 5
              </p>
              <button
                onClick={() => settoggleShow(true)}
                className="mb-2 me-2 mobile:text-[12px] tablet:text-[16px]  laptop:text-[16px] computer:text-[16px] font-display font-bold text-white bg-[#629D23] py-[10px] mobile:px-[15px] tablet:px-[24px] laptop:px-[24px] computer:px-[24px] rounded-[6px] cursor-pointer"
              >
                Write a review
              </button>
            </div>

            <div className="mt-6 min-w-0 flex-1 space-y-3 sm:mt-0">
              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  5
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  239 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  4
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  432 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  3
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  53 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  2
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  32 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>

              <div className="flex items-center gap-2">
                <p className="w-2 shrink-0 text-start text-sm font-medium leading-none text-gray-900 ">
                  1
                </p>
                <svg
                  className="h-4 w-4 shrink-0 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                </svg>
                <div className="h-1.5 w-80 rounded-full bg-gray-200 ">
                  <div className="h-1.5 rounded-full bg-yellow-300"></div>
                </div>
                <a
                  href="#"
                  className="w-8 shrink-0 text-right text-sm font-medium leading-none text-black-700 hover:underline text-black-500 sm:w-auto sm:text-left"
                >
                  13 <span className="hidden sm:inline">reviews</span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-6 divide-y divide-gray-200">
            <div className="flex items-center mobile:justify-between tablet:gap-[100px] laptop:gap-[100px]  computer:gap-[100px]  pb-6 mt-5 sm:flex sm:items-start">
              <div>
                <div className="flex items-center gap-0.5">
                  <svg
                    className="h-4 w-4 text-yellow-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                  </svg>

                  <p>rating 4 out of 5 </p>
                </div>
                <div
                  className=" sm:w-48 md:w-72 tablet:w-full laptop:w-full computer:w-full flex items-center mobile:gap-[100px] 
                tablet:justify-between laptop:justify-between computer:justify-between mb-[10px]"
                >
                  <div className="space-y-0.5">
                    <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
                      {/* {rev.user.name} */}
                      <FaUser /> Limon
                    </p>

                    <p className="text-sm font-normal text-gray-500 ">
                      {/* {format(
                          new Date(rev.createdAt),
                          "MMMM d yyyy 'at' HH:mm"
                        )} */}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900 ">
                    Verified purchase
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Minima explicabo voluptates ipsam ipsa, quisquam ex, numquam,
                  eveniet laborum quod distinctio maxime voluptatibus
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <button
              type="button"
              className="mb-2 me-2 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-[#629D23] focus:outline-none hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
            >
              View more reviews
            </button>
          </div>
          {toggleShow === true ? (
            <div className="w-full h-screen mobile:bg-white tablet:bg-white laptop:bg-[#000]/30 computer:bg-[#000]/30 absolute top-0 left-0 z-20 flex justify-center items-center rounded-2xl">
              <div className="w-[800px] bg-[#fff] mobile:p-[15px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] rounded-md">
                <div className="border-b border-[#dee2e6]">
                  <div className="flex items-center justify-between mb-[20px]">
                    <div className="flex items-center gap-2">
                      <h5 className="mobile:text-[15px] tablet:text-[20px] laptop:text-[20px] computer:text-[20px] font-display font-medium text-[#2C3C28]">
                        Add a review for :
                      </h5>
                      <h4 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] mobile:w-[100px] tablet:w-[250px] laptop:w-[400px] computer:w-[480px] truncate font-display font-medium text-[#6E777D]">
                        {/* ({product.name}) */}{' '}
                        islehhhhllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll
                      </h4>
                    </div>
                    <span
                      onClick={() => settoggleShow(false)}
                      className="text-[24px] hover:text-red-500 cursor-pointer ease-in-out duration-300"
                    >
                      <ImCross />
                    </span>
                  </div>
                </div>
                <div className="mt-[20px] mb-[10px]">
                  <label
                    className="text-[16px] font-medium font-display text-[#6E777D]"
                    htmlFor="text"
                  >
                    Your Rating*
                  </label>
                </div>
                <div className="flex gap-1 mb-[20px]">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(0)}
                        className="text-2xl"
                        aria-label={`Rate ${starValue} star`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={
                            (hover || rating) >= starValue ? '#629D23' : 'none'
                          }
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className={`w-8 h-8 ${
                            (hover || rating) >= starValue
                              ? 'text-[#629D23]'
                              : 'text-gray-400'
                          }`}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l2.07 6.374h6.708c.969 0 1.371 1.24.588 1.81l-5.424 3.938 2.07 6.373c.3.922-.755 1.688-1.54 1.117L12 17.768l-5.423 3.938c-.784.571-1.838-.195-1.54-1.117l2.07-6.373-5.424-3.938c-.783-.57-.38-1.81.588-1.81h6.708l2.07-6.374z"
                          />
                        </svg>
                      </button>
                    );
                  })}
                </div>

                <div>
                  <label
                    className="text-[16px] font-medium font-display text-[#6E777D]"
                    htmlFor="text"
                  >
                    Review description*
                  </label>
                  <textarea
                    className="w-full h-[200px] text-[16px] font-display font-normal text-[#6E777D] bg-transparent placeholder:text-[16px] placeholder:font-medium p-[15px] my-[15px] rounded-[5px] border-2 border-[#e2e2e2] focus:border-[#629D23] outline-none resize-none"
                    type="text"
                    name="text"
                    onChange={e => setComment(e.target.value)}
                    placeholder="Make Your Reviews..."
                  ></textarea>
                </div>
                <div>
                  <label
                    className="text-[16px] font-medium font-display text-[#6E777D]"
                    htmlFor="text"
                  >
                    Your name*
                  </label>
                  <textarea
                    className="w-full h-[60px] text-[16px] font-display font-normal text-[#6E777D] bg-transparent placeholder:text-[16px] placeholder:font-medium p-[15px] my-[15px] rounded-[5px] border-2 border-[#e2e2e2] focus:border-[#629D23] outline-none resize-none"
                    type="name"
                    name="name"
                    onChange={e => setName(e.target.value)}
                    placeholder="Your Name..."
                  ></textarea>
                </div>

                <div className="flex items-center gap-4 mt-[30px]">
                  <button
                    onClick={handleCommentSubmit}
                    className="text-[16px] font-display font-medium text-[#2C3C28] border border-[#dee2e6] hover:text-white hover:bg-[#629D23] transition-all ease-in-out duration-300 cursor-pointer py-[10px] px-[24px] rounded-[6px]"
                  >
                    Add Review
                  </button>
                  <button
                    onClick={() => settoggleShow(false)}
                    className="text-[16px] font-display font-medium text-[#2C3C28] border border-[#dee2e6] hover:text-white hover:bg-red-400  transition-all ease-in-out duration-300 cursor-pointer py-[10px] px-[24px] rounded-[6px]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </Container>
      </section>
    </>
  );
};

export default CustomerReview;
