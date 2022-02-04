import React from 'react';
import Loading from '../../components/Loading/Loading';
import { ReactComponent as LoadingSVG } from '../../assets/svgs/undraw_loading_re_5axr.svg';

function LoadingPage() {
  return (
    <div className='container loading-page-container'>
      <LoadingSVG className='loading-page__svg' />
      <Loading />
    </div>
  );
}

export default LoadingPage;
