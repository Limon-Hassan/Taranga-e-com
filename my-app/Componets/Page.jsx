'use client';
import React from 'react';
import Container from './Container/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Page = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <>
      <section className="mobile:w-full tablet:w-full mobile:mb-0 tablet:mb-[20px] computer:mb-[40px] laptop:mb-[40px]">
        <Container>
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div className="mobile:mt-1 tablet:mt-[20px] laptop:mt-[40px] computer:mt-[40px] mobile:h-[200px] tablet:h-[300px] laptop:h-[500px] computer:h-[500px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="/compressed.webp"
                    alt="benner"
                  />
                </div>
              </div>
              <div>
                <div className="mobile:mt-1 tablet:mt-[20px] laptop:mt-[40px] computer:mt-[40px] mobile:h-[200px] tablet:h-[300px] laptop:h-[500px] computer:h-[500px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="/INGCO-MOBILE.webp"
                    alt="benner"
                  />
                </div>
              </div>
              <div>
                <div className="mobile:mt-1 tablet:mt-[20px] laptop:mt-[40px] computer:mt-[40px] mobile:h-[200px] tablet:h-[300px] laptop:h-[500px] computer:h-[500px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="/MOBILE.webp"
                    alt="benner"
                  />
                </div>
              </div>
            </Slider>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page;
