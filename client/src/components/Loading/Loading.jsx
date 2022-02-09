import React from 'react';
import LoadingIcon from '../LoadingIcon/LoadingIcon';
import { ReactComponent as LoadingSVG } from '../../assets/svgs/undraw_loading_re_5axr.svg';

function Loading() {
  return (
    <main className='container flex col center loading__container'>
      <LoadingSVG className='loading__svg' />
      <LoadingIcon />
    </main>
  );
}

export default Loading;
