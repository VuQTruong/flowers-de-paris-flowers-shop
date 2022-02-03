import React from 'react';

function Loading(props) {
  return (
    <div className={props.className}>
      <div className='loading-container'>
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

export default Loading;
