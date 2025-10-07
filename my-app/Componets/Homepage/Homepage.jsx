import React from 'react';
import Page from '../Page';
import Page_1 from '../Page_1';
import Page_2 from '../Page_2';
import Page_3 from '../Page_3';

const Homepage = ({ initialProducts, initialCategory }) => {
  return (
    <>
      <Page />
      <Page_1
        initialProducts={initialProducts}
        initialCategory={initialCategory}
      />
      <Page_2 />
      <Page_3 />
    </>
  );
};

export default Homepage;
