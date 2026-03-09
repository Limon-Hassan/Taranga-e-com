import React from 'react';
import Container from '../../Componets/Container/Container';

const page = () => {
  return (
    <>
      <Container>
        <div className=" pt-[200px]">
          <div className="bg-white p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="mobile:text-[28px] computer:text-3xl font-noto-bengali font-medium text-black mb-2.5">
                আপনার অর্ডার সফল হয়েছে 🎉
              </h3>
              <p className="text-[16px] font-noto-bengali font-normal text-black mb-2">
                কিছুক্ষণের মধ্যেই আমাদের এজেন্ট আপনার সাথে যোগাযোগ করবে।
              </p>
              <p className="text-[16px] font-noto-bengali font-normal text-black mb-2">
                সকল দায়-দায়িত্ত এবং পরিবেশনায় Deluxe X Deals LTD.
              </p>
              <p className="text-sm font-noto-bengali font-normal text-black">
                Organizer of Deluxe X Deals LTD : CEO MD Hakim Ahmed
              </p>
              <div className="py-10 text-center">
                <a
                  href="/"
                  className="px-12 bg-[#E6963A] text-white font-semibold py-3"
                >
                  হোম পেজ যান
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default page;
