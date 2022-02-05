import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as FailSVG } from '../../../assets/svgs/undraw_warning_cyit.svg';

function OAuthFail() {
  return (
    <div className='container flex col center oauth-fail__container'>
      <FailSVG className='oauth-fail__svg' />
      <h2 className='oauth-fail__title'>Oops...! Something wrong happened!</h2>
      <Link to='/signin' className='oauth-fail__btn-back'>
        <i className='bx bx-log-in-circle'></i>
        Try again
      </Link>
    </div>
  );
}

export default OAuthFail;
