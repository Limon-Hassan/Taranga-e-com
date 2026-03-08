'use client';
import Container from './Container/Container';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaWhatsapp } from 'react-icons/fa';

const Page = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 5000,
    arrows: false,
  };
  return (
    <>
      <section className="mobile:w-full tablet:w-full mobile:pb-[20px] tablet:pb-5 computer:pb-10 laptop:pb-10 computer:mt-[12%] laptop:mt-[20%] tablet:mt-[35%] mobile:mt-[30%] bg-[#E6963A]/30">
        <Container>
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div className="mobile:mt-1 tablet:mt-5 laptop:mt-10 computer:mt-10 mobile:h-[200px] tablet:h-[300px] laptop:h-[500px] computer:h-[500px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="/Benner_2.jpg"
                    alt="benner"
                  />
                </div>
              </div>
              <div>
                <div className="mobile:mt-1 tablet:mt-5 laptop:mt-10 computer:mt-10 mobile:h-[200px] tablet:h-[300px] laptop:h-[500px] computer:h-[500px]">
                  <img
                    className="w-full h-full object-cover object-center"
                    src="/benner_1.jpg"
                    alt="benner"
                  />
                </div>
              </div>
            </Slider>
          </div>
          <div>
            <a
              href="https://wa.me/8801813336311"
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-50"
            >
              <FaWhatsapp size={28} />
            </a>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page;
