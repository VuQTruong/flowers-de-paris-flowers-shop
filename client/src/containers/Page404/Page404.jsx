import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Page404SVG } from '../../assets/svgs/undraw_lost_re_xqjt.svg';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

function Page404() {
  return (
    <div className='page-container'>
      <Header />
      <main className='container flex col center notfound__container'>
        <Page404SVG className='notfound__svg' />
        <h2 className='notfound__title'>
          404 - Looks like you are getting lost!
        </h2>
        <Link to='/' className='notfound__back-home'>
          <i className='bx bx-home'></i>
          Go back to Home page
        </Link>
      </main>
      <Footer />
    </div>
  );
}

export default Page404;
