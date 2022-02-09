import React from 'react';

function LoadingIcon(props) {
  return (
    <div className={props.className}>
      <div className='loading-icon__container'>
        <div className='gooey'>
          <span className='dot'></span>
          <div className='dots'>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoadingIcon;
