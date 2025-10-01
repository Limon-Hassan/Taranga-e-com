import React from 'react';
import Container from './Container/Container';

const Footer = () => {
  return (
    <>
      <section className="bg-[#1B1F23]">
        <Container>
          <div className="flex items-center gap-[200px] py-[50px]">
            <div>
              <h1 className="text-[40px] font-bold font-nunito text-white leading-6 mb-[20px]">
                Taranga Traders
              </h1>
              <p className="text-[16px] font-normal font-nunito text-white w-[280px] mb-[20px]">
                We believe—“Your Trust, Our Commitment.” Shop from the comfort
                of your home with confidence!
              </p>
              <h5 className="text-[16px] font-normal font-nunito text-white w-[280px] ">
                306, Bara Moghbazar, Dhaka, Ramna, Bangladesh
              </h5>
            </div>
            <div className="flex  gap-[100px]">
              <ul>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Accessories
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Chainsaw
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Demolition
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Hammer Drill
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Impact Drill
                </li>
              </ul>
              <ul>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Aspirator Blower
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Heat Gun
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  High Pressure Washer
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Sander
                </li>
              </ul>
              <ul>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Privacy Policy
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Returns
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Terms & Conditions
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Contact Us
                </li>
                <li className="text-[16px] font-medium font-nunito text-[#fff] hover:text-[#F5DB27] ease-in-out duration-300 mb-[15px] cursor-pointer">
                  Our Sitemap
                </li>
              </ul>
            </div>
          </div>
          <div className="text-center ">
            <p className="text-[16px] font-bold font-nunito text-white mb-[10px]">
              © All Rights Reserved - Tarangatraders LTD
            </p>
            <p className="text-[16px] font-bold font-nunito text-white ">
              Made By Mahammud Hassan Limon_🖤_
            </p>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Footer;
