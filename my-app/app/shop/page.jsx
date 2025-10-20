import { Suspense } from 'react';
import ClientShop from './ClientShop';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ClientShop />;
    </Suspense>
  );
}
