'use client';
import React from 'react';
import { SiBlockchaindotcom } from 'react-icons/si';
import Container from './Container/Container';

const ProductDetails = () => {
  return (
    <>
      <section>
        <Container>
          <div className="border border-[#000]/30 mobile:p-[15px] tablet:p-[30px] laptop:p-[30px] computer:p-[30px] shadow-md">
            <span className="flex mobile:items-baseline tablet:items-center laptop:items-center computer:items-center gap-2.5">
              <SiBlockchaindotcom />
              <h3 className="mobile:text-[14px] tablet:text-[20px] laptop:text-[28px] computer:text-[28px] font-nunito font-bold text-[#1e293b]">
                Smartec ২০V কর্ডলেস ইমপ্যাক্ট ড্রিল মেশিন (মেটাল চক সহ ২৪টি
                এক্সেসরিজ)
              </h3>
            </span>
            <div
              className="product-description mt-6 text-[15px] text-[#444]"
              dangerouslySetInnerHTML={{
                __html: `
             <h3><strong>Product Features:</strong></h3>
            <ul>
               <li>✅ High power 20V cordless drill</li>
             <li>🔋 Long-lasting rechargeable battery</li>
             <li>⚙️ Metal chuck with 24 accessories</li>
              </ul>
                      <p>Perfect for home and professional use.</p>
                   `,
              }}
            />
          </div>
        </Container>
      </section>
    </>
  );
};

export default ProductDetails;
