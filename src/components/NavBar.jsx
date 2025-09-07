import React from 'react';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavBar = () => {
  return (
    <div className='w-full h-[8ch] px-12 bg-zinc-50 shadow-md flex items-center justify-between'>
      <div className='w-96 border border-zinc-300 rounded-full h-11 flex items-center justify-center'>
        <input
          type='text'
          placeholder='Search...'
          className='flex-1 h-full rounded-full outline-none border-none bg-zinc-50 px-4'
        />

        <button className='px-4 h-full flex items-center justify-center text-base text-zinc-600 border-l border-zinc-300'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      <div className='flex items-center gap-x-8'>
        {/* Notification */}
        <button className='relative'>
          <div className='w-5 h-5 bg-zinc-50 flex items-center justify-center absolute -top-1.5 -right-2.5 rounded-full p-0.5'>
            <span className='bg-red-600 text-white rounded-full w-full h-full flex items-center justify-center text-xs'>
              3
            </span>
          </div>
          <FontAwesomeIcon icon={faBell} />
        </button>

        {/* Profile img */}
        <img
          src='https://cdn.pixabay.com/photo/2016/11/21/11/17/model-1844729_640.jpg'
          alt='profile img'
          className='w-11 h-11 rounded-full object-cover object-center cursor-pointer'
        />
      </div>
    </div>
  );
};

export default NavBar;
