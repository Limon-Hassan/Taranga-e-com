import Homepage from '../Componets/Homepage/Homepage';
import { GetCategory } from '../lib/api/categoryApi';
import { getProducts } from '../lib/api/productApi';

const page = async () => {
  let initialProducts = await getProducts();
  let initialCategory = await GetCategory();
  return (
    <>
      <Homepage
        initialProducts={initialProducts}
        initialCategory={initialCategory}
      />
    </>
  );
};

export default page;
