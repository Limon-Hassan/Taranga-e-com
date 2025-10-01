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
      <section className="mb-[40px]">
        <Container>
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div className=" mt-[40px] h-[500px]">
                  <img
                    className="bg-cover bg-center w-full"
                    src="/compressed.webp"
                    alt="benner"
                  />
                </div>
              </div>
              <div>
                <div className=" mt-[40px] h-[500px]">
                  <img
                    className="bg-cover bg-center w-full"
                    src="/MOBILE.webp"
                    alt="benner"
                  />
                </div>
              </div>
              <div>
                <div className=" mt-[40px] h-[500px]">
                  <img
                    className="bg-cover bg-center w-full"
                    src="/INGCO-MOBILE.webp"
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
