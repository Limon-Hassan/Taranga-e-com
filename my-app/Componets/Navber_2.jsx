'use client';

import { useEffect, useState } from 'react';
import Container from './Container/Container';
import { FaChevronDown } from 'react-icons/fa';
import socket from '../utills/socket';

const Navber_2 = () => {
  const [category, setCategory] = useState([]);

  async function Fetch() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PORT}api/v3/category/getCategory`,
        {
          cache: 'no-store',
        }
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      console.log(data);
      setCategory(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    Fetch();

    const handleNewCategory = newCategory => {
      setCategory(prev => [...prev, newCategory]);
    };

    socket.on('CategoryCreated', handleNewCategory);

    return () => {
      socket.off('CategoryCreated', handleNewCategory);
    };
  }, []);
  return (
    <>
      <section className="bg-white shadow-md py-[5px] mobile:hidden tablet:hidden computer:block laptop:block">
        <Container>
          <ul className="flex items-center justify-between">
            {category.slice(0, 4).map((item, index) => (
              <li
                key={index}
                className="text-[18px] font-nunito font-medium text-[#484848]  cursor-pointer"
              >
                {item.name}
              </li>
            ))}
            <a
              href="/shop"
              className="text-[18px] font-nunito font-medium text-[#484848] flex items-center gap-2.5 cursor-pointer"
            >
              Shop
              <span>
                <FaChevronDown />
              </span>
            </a>
          </ul>
        </Container>
      </section>
    </>
  );
};

export default Navber_2;
