import { QUESTIONS } from '@constants/constant';
import {
  faFantasyFlightGames,
  faSuperpowers,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faBars,
  faCalendar,
  faEnvelopeOpen,
  faSpaghettiMonsterFlying,
  faTableCells,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenus, setSubMenus] = useState({
    calendar: false,
    support: false,
    tables: false,
    analytics: false,
  });

  const toggleSubMenu = (menu) => {
    setSubMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  const tableSubMenu = QUESTIONS.map((ques) => ({
    name: ques.Name,
    url: ques.url,
    id: ques.Id,
    icon: ques.Icon,
  }));

  const Menus = [
    { title: 'Dashboard', icon: <FontAwesomeIcon icon={faBars} /> },
    {
      title: 'Inbox',
      icon: <FontAwesomeIcon icon={faEnvelopeOpen} />,
      key: 'inbox',
    },
    { title: 'Calendar', icon: <FontAwesomeIcon icon={faCalendar} /> },
    {
      title: 'Tables',
      icon: <FontAwesomeIcon icon={faTableCells} />,
      subMenu: tableSubMenu,
      key: 'table',
    },
    {
      title: 'Analytics',
      icon: <FontAwesomeIcon icon={faFantasyFlightGames} />,
    },
    { title: 'Support', icon: <FontAwesomeIcon icon={faSuperpowers} /> },
    {
      title: 'Setting',
      icon: <FontAwesomeIcon icon={faSpaghettiMonsterFlying} />,
      key: 'settings',
    },
  ];
  return (
    <div
      className={`${
        open ? 'w-72 p-5' : 'w-20 p-4'
      } bg-zinc-900 pt-8 relative duration-300 ease-in-out h-screen`}
    >
      {/* Toggle button sections */}
      <div
        className={`absolute cursor-pointer -right-4 top-9 w-8 h-8 p-0.5 bg-zinc-50 border-zinc-50 border-2 rounded-full text-xl flex items-center justify-center ${
          !open && 'rotate-180'
        } transition-all ease-in-out duration-300`}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        ) : (
          <FontAwesomeIcon icon={faArrowAltCircleRight} />
        )}
      </div>

      {/* Logo and title section */}
      <div className='flex gap-x-4 items-center'>
        <img
          src='https://cdn.pixabay.com/photo/2017/02/18/19/20/logo-2078018_640.png'
          alt='logo'
          className={`w-10 h-10 rounded-full object-cover object-center cursor-pointer ease-in-out duration-3 ${
            open && 'rotate-[360deg]'
          }`}
        />

        <h1
          className={`text-zinc-50 origin-left font-semibold text-xl duration-200 ease-in-out ${
            !open && 'scale-0'
          }`}
        >
          Admin Dashboard
        </h1>
      </div>

      {/* Sidebar Navbar Items section */}
      <ul className='pt-6 space-y-0.5'>
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex flex-col rounded-md py-3 px-4 cursor-pointer hover:text-white text-zinc-50 hover:bg-zinc-800/50 transition-all ease-in-out duration-300 'mt-2'
             ${index === 0 && 'bg-zinc-800/40'}`}
          >
            <div
              className='flex items-center justify-between gap-x-4'
              onClick={() => toggleSubMenu(Menu.key)}
            >
              <div className='flex items-center gap-2'>
                <span className='text-lg'>{Menu.icon}</span>
                <span
                  className={`${
                    !open && 'hidden'
                  } origin-left ease-in-out duration-300`}
                >
                  {Menu.title}
                </span>
              </div>

              {Menu.subMenu && (
                <span
                  className={`ml-auto cursor-pointer text-sm ${
                    subMenus[Menu.key] ? 'rotate-360' : ''
                  } transition-transform ease-in-out duration-300 ${
                    !open ? 'hidden' : ''
                  }`}
                >
                  {subMenus[Menu.key] ? (
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowAltCircleRight} />
                  )}
                </span>
              )}
            </div>

            {Menu.subMenu && subMenus[Menu.key] && (
              <ul className='pl-3 pt-4 text-zinc-300 max-h-60 overflow-y-auto'>
                {Menu.subMenu.map((subMenu) => (
                  <Link
                    key={subMenu.id}
                    className='text-sm flex items-center gap-x-2 py-3 px-2 hover:bg-zinc-800 rounded-lg'
                    to={`table/${subMenu.url}`}
                  >
                    <span className='text-zinc-4'>
                      <img
                        alt={subMenu.name}
                        src={`data:image/png;base64, ${subMenu.icon}`}
                        className='w-8 h-8 rounded-full pr-2'
                      />
                    </span>
                    {subMenu.name}
                  </Link>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;
