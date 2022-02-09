import React from 'react';
import Loading from '../../components/Loading/Loading';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function LoadingPage() {
  return (
    <div className='page-container'>
      <Header />
      <Loading />
      <Footer />
    </div>
  );
}

export default LoadingPage;
