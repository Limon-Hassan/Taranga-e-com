'use client';
import React, { useState } from 'react';
import Container from '../../Componets/Container/Container';
import { PiStarFill } from 'react-icons/pi';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import ProductDetails from '../../Componets/ProductDetails';

const Page = () => {
  const images = [
    '/productimage.webp',
    '/2.webp',
    '/productimage.webp',
    '/productimage.webp',
  ];

  let [active, setActive] = useState({
    a: false,
    b: false,
  });

  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [zoomStyle, setZoomStyle] = useState({
    backgroundPosition: 'center',
    backgroundSize: '100%',
  });

  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle(prev => ({ ...prev, backgroundPosition: `${x}% ${y}%` }));
  };

  const handleMouseEnter = () => {
    setZoomStyle(prev => ({ ...prev, backgroundSize: '200%' }));
  };

  const handleMouseLeave = () => {
    setZoomStyle({ backgroundPosition: 'center', backgroundSize: '100%' });
  };

  let handleActive = type => {
    setActive({
      a: false,
      b: false,
      [type]: true,
    });
  };

  return (
    <>
      <section className="py-[200px]">
        <Container>
          <div className="flex flex-col lg:flex-row gap-[100px]">
            <div className="image_part relative shadow-md flex flex-col items-center">
              <div
                className="  w-[400px] h-[400px] rounded-lg overflow-hidden bg-cover bg-center bg-no-repeat cursor-zoom-in"
                style={{
                  backgroundImage: `url(${selectedImage})`,
                  ...zoomStyle,
                }}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              ></div>
              <button
                className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200 transition cursor-pointer"
                onClick={() => setIsFullscreen(true)}
              >
                <FaMagnifyingGlass />
              </button>
              {isFullscreen && (
                <div
                  className="fixed inset-0 bg-black flex items-center justify-center z-50"
                  onClick={() => setIsFullscreen(false)}
                >
                  <img
                    src={selectedImage}
                    alt="fullscreen"
                    className="max-h-[90%] max-w-[90%] object-contain rounded-lg shadow-lg"
                  />
                  <button
                    className="absolute top-5 right-5 text-white text-3xl font-bold cursor-pointer"
                    onClick={() => setIsFullscreen(false)}
                  >
                    ✖
                  </button>
                </div>
              )}
              <div className="flex items-center gap-[20px] mt-[30px] mb-[30px]">
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="product thumbnail"
                    className={`w-[80px] h-auto rounded-md cursor-pointer transition-all duration-300 ${
                      selectedImage === img
                        ? 'opacity-100 border-1 border-black/30'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="text_part ">
              <h3 className="text-[24px] font-bold font-nunito text-[#383535] w-[486px] leading-snug mb-[10px]">
                Smartec 20V Cordless Impact Drill Machine Metal Chuck With 24ps
                Accessories
              </h3>

              <span className="flex items-center gap-1.5 mb-[20px]">
                {[...Array(5)].map((_, i) => (
                  <PiStarFill key={i} className="text-[#FDA256]" />
                ))}
                <span className="text-[16px] font-nunito text-[#6E777D] ml-2">
                  (0 Reviews)
                </span>
              </span>

              <h4 className="text-[24px] font-bold font-nunito mb-[20px] text-[#FDA256]">
                4,650.00৳
              </h4>

              <div className="border-t border-[#000]/30 pt-[15px] space-y-3">
                <p className="text-[15px] text-[#555]">
                  Categories: Cordless Drill, Power Tools
                </p>
                <p className="text-[15px] text-[#555]">Brand: Smartec</p>
                <button className="text-[16px] font-bold font-nunito text-white bg-[#F2B10C] py-[10px] px-[30px] rounded-[6px] cursor-pointer hover:bg-[#e1a60b] transition">
                  Order Now
                </button>
              </div>
            </div>
          </div>
          <div className="bottom_part">
            <div className="flex items-center gap-[50px] mt-[30px]">
              <button
                onClick={() => handleActive('a')}
                className={`text-[16px] font-bold ${
                  active.a && 'border-t-4 border-[#f1a31c] border-solid'
                } font-nunito text-[#515151] cursor-pointer border-dotted border-t border-r py-[10px] px-[20px]`}
              >
                Description
              </button>

              <button
                onClick={() => handleActive('b')}
                className={`text-[16px] font-bold ${
                  active.b && 'border-t-4 border-[#f1a31c] border-solid'
                } font-nunito text-[#515151] cursor-pointer border-t border-dotted border-r  py-[10px] px-[20px]`}
              >
                Reviews (1)
              </button>
            </div>
            <div className="mt-8">{active.a && <ProductDetails />}</div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page;
