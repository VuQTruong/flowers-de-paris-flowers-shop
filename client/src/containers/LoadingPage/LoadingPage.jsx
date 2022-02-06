import React from 'react';
import Loading from '../../components/Loading/Loading';
import { ReactComponent as LoadingSVG } from '../../assets/svgs/undraw_loading_re_5axr.svg';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function LoadingPage() {
  return (
    <div className='page-container'>
      <Header />
      <div className='container flex col center loading-page-container'>
        <LoadingSVG className='loading-page__svg' />
        <Loading />
      </div>
      <Footer />
    </div>
  );
}

export default LoadingPage;
