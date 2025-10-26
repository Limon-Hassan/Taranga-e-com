'use client';
import React from 'react';
import { SiBlockchaindotcom } from 'react-icons/si';
import Container from './Container/Container';

const ProductDetails = ({ product }) => {
  return (
    <>
      <section>
        <Container>
          <div className="border border-black/30 mobile:p-[15px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] shadow-md">
            <span className="flex mobile:items-baseline tablet:items-center laptop:items-center computer:items-center gap-2.5">
              <SiBlockchaindotcom />
              <h3 className="mobile:text-[14px] tablet:text-[20px] laptop:text-[28px] computer:text-[28px] font-nunito font-bold text-[#1e293b]">
                {product.name}
              </h3>
            </span>
            <div
              className="mt-6 prose-content"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
