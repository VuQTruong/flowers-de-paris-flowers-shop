import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import { ReactComponent as BlockSVG } from '../../assets/svgs/undraw_security_re_a2rk.svg';
import { useEffect } from 'react';

function Forbidden() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <div className='page-container'>
      <Header />
      <main className='container flex col center forbidden__container'>
        <BlockSVG className='forbidden__svg' />
        <h2 className='forbidden__title'>
          Forbidden! You do not have an administration to access this resource!
        </h2>
        <Link to='/' className='forbidden__back-home'>
          <i className='bx bx-home'></i>
          Go back to Home page
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Forbidden;
