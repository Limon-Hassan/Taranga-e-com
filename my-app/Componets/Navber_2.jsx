import React from 'react';
import Container from './Container/Container';
import { FaChevronDown } from 'react-icons/fa';


const Navber_2 = () => {
 
  return (
    <>
      <section className="bg-white shadow-md py-[5px]">
        <Container>
          <ul className="flex items-center justify-between">
            <li className="text-[18px] font-nunito font-medium text-[#484848]  cursor-pointer">
              Home
            </li>
            <li className="text-[18px] font-nunito font-medium text-[#484848] flex items-center gap-[10px] cursor-pointer">
              Power Tools
              <span>
                <FaChevronDown />
              </span>
            </li>
            <li className="text-[18px] font-nunito font-medium text-[#484848] flex items-center gap-[10px] cursor-pointer">
              Sefety Tools
              <span>
                <FaChevronDown />
              </span>
            </li>
            <li className="text-[18px] font-nunito font-medium text-[#484848] flex items-center gap-[10px] cursor-pointer">
              Accessories
              <span>
                <FaChevronDown />
              </span>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
};

export default Navber_2;
