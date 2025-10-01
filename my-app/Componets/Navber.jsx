import React from 'react';
import Container from './Container/Container';
import { FaPhoneVolume, FaFacebook } from 'react-icons/fa6';
import { IoMail } from 'react-icons/io5';

const Navber = () => {
  return (
    <>
      <section className="bg-[#E6963A] py-[5px]">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[30px]">
              <p className="flex items-center gap-[10px] text-white text-[18px] font-nunito">
                <FaPhoneVolume />
                +880 01887604100
              </p>

              <p className="flex items-center gap-[10px] text-white text-[18px] font-nunito">
                <IoMail /> mahammudhassanlimon@gmail.com
              </p>
            </div>
            <div className="relative w-[30px] h-[30px] before:content-[''] before:absolute before:top-0 before:left-0 before:w-[30px] before:h-[30px] before:rounded-full before:bg-[#3b5998] flex items-center justify-center z-[1] cursor-pointer">
              <FaFacebook className="text-white text-[20px] z-[10]" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Navber;
