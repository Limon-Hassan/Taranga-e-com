import Link from 'next/link';
import React from 'react';

const page = () => {
  return (
    <>
      <div>this is a about page</div>
         <Link href='/about/12555555'>dynamic</Link>
    </>
  );
};

export default page;
