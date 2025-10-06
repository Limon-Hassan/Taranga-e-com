'use client';
import React from 'react';
import { SiBlockchaindotcom } from 'react-icons/si';
import Container from './Container/Container';

const ProductDetails = () => {
  return (
    <>
      <section>
        <Container>
          <div>
            <span>
              <SiBlockchaindotcom />
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
