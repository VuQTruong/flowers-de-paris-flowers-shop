import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNav from '../MobileNav/MobileNav';
import NavBar from '../NavBar/NavBar';
import SearchBar from '../SearchBar/SearchBar';
import UserNav from '../UserNav/UserNav';

function Header() {
  const [mbNavActive, setMbNavActive] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const onScroll = () => {
    const posY = window.scrollY;
    posY > 50 ? setHideHeader(true) : setHideHeader(false);
  };

  window.addEventListener('scroll', onScroll);

  return (
    <header
      className={`header-container bg-primary fixed ${
        hideHeader ? 'hide-header' : ''
      }`}
    >
      <div className='main-header container flex'>
        <Link to='/' className='brand'>
          Flowers de Paris
        </Link>

        <NavBar />
        <SearchBar />
        <UserNav activeMobileNav={(val) => setMbNavActive(val)} />

        <MobileNav
          mbNavActive={mbNavActive}
          activeMobileNav={(val) => setMbNavActive(val)}
        />
      </div>
    </header>
  );
}

export default Header;
