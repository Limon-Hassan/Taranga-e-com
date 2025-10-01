import React from 'react';

const page = async ({ params }) => {
  let { id } = await params;
  console.log(id);
  return <div>dynamic route {id}</div>;
};

export default page;
