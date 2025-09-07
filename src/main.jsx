import { lazy, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from '@redux/store';
import DashBoard from '@pages/DashBoard';
import Dialog from '@components/Dialogs/Dialog';
import Layout from '@pages/Layout.jsx';
import RootLayout from '@pages/RootLayout';
const Home = lazy(() => import('@pages/Home'));
const ManuBar = lazy(() => import('@components/ManuBar'));
const Table = lazy(() => import('@components/TableQuestion'));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
        ],
      },
      {
        path: '/dashboard',
        element: <DashBoard />,
        children: [
          {
            index: true,
            element: <ManuBar />,
          },
          {
            path: '/dashboard/table/:id',
            element: <Table />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      <Dialog />
    </Provider>
  </StrictMode>,
);
