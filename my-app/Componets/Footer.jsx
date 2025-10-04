import React from 'react';
import Container from './Container/Container';

const Footer = () => {
  return (
    <>
      <section className="bg-[#1B1F23]">
        <Container>
          <div className="mobile:flex-none mobile:gap-0 tablet:flex-none tablet:gap-0 laptop:flex computer:flex laptop:items-center computer:items-center laptop:gap-[165px] computer:gap-[200px] py-[50px]">
            <div className="mobile:mb-[30px] tablet:mb-[30px] laptop:mb-0 computer:mb-0">
              <h1 className="mobile:text-[28px] tablet:text-[30px] laptop:text-[35px] computer:text-[40px] font-bold font-nunito text-white leading-6 mb-[20px]">
                Taranga Traders
              </h1>
              <p className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px]  font-normal font-nunito text-white mobile:w-auto tablet:w-[280px] laptop:w-[280px] computer:w-[280px] mb-[20px]">
                We believe—“Your Trust, Our Commitment.” Shop from the comfort
                of your home with confidence!
              </p>
              <h5 className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-normal font-nunito text-white mobile:w-auto tablet:w-[280px] laptop:w-[280px] computer:w-[280px] ">
                306, Bara Moghbazar, Dhaka, Ramna, Bangladesh
              </h5>
            </div>
            <div className="mobile:flex-none mobile:gap-0 tablet:flex tablet:gap-[100px] laptop:flex laptop:gap-[50px] computer:flex computer:gap-[100px]">
              <ul>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Accessories
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Chainsaw
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Demolition
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Hammer Drill
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Impact Drill
                </li>
              </ul>
              <ul>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Aspirator Blower
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Heat Gun
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  High Pressure Washer
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Sander
                </li>
              </ul>
              <ul>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Privacy Policy
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Returns
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Contact Us
                </li>
                <li className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Our Sitemap
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center ">
            <p className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-white mobile:mb-[5px] tablet:mb-[10px] laptop:mb-[10px] computer:mb-[10px]">
              © All Rights Reserved - Tarangatraders LTD
            </p>
            <p className="mobile:text-[14px] tablet:text-[16px] laptop:text-[16px] computer:text-[16px] font-bold font-nunito text-white ">
              Made By Mahammud Hassan Limon_🖤_
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Footer;
