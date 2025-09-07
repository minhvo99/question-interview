import NavBar from '@components/NavBar';
import SideBar from '@components/SideBar';
import React from 'react';
import { Outlet } from 'react-router-dom';
const DashBoard = () => {
  return (
    <div className='w-full h-screen flex'>
      <SideBar />
      <div className='h-screen flex-1 bg-zinc-100 space-y-6'>
        {/* Navbar section */}
        <NavBar />
        {/* Dashboard contents */}
        <div className='w-full px-12'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
