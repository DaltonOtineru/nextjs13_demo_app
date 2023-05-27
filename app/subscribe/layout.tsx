import { Suspense } from 'react';
import Subscribe from './page';
import Loading from './loading';

export default async function SubscribeLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <Subscribe />
    </Suspense>
  );
}
