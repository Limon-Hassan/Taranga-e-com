import Homepage from '../Componets/Homepage/Homepage';
import { getProducts } from '../lib/api/productApi';

const page = async () => {
  let initialProducts = await getProducts();
  return (
    <>
      <Homepage initialProducts={initialProducts} />
    </>
  );
};

export default page;
