import { Outlet } from 'react-router-dom';
import Header from '@components/Header';
import { Suspense } from 'react';
import Loading from '@components/Loading';

const RootLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default RootLayout;
