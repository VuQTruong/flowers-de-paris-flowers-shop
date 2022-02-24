import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileNav from '../../MobileNav/MobileNav';
import UserNav from '../../UserNav/UserNav';

function AdHeader() {
  const [mbNavActive, setMbNavActive] = useState(false);

  return (
    <header className='header-container bg-primary'>
      <div className='main-header container flex'>
        <Link to='/' className='brand'>
          Flowers de Paris
        </Link>

        <UserNav disableCart activeMobileNav={(val) => setMbNavActive(val)} />

        <MobileNav
          mbNavActive={mbNavActive}
          activeMobileNav={(val) => setMbNavActive(val)}
        />
      </div>
    </header>
  );
}

export default AdHeader;
