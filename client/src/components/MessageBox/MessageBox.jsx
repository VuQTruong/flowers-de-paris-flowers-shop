import React from 'react';
import { ReactComponent as SuccessSVG } from '../../assets/icons/success.svg';
import { ReactComponent as DangerSVG } from '../../assets/icons/danger.svg';
import { ReactComponent as InfoSVG } from '../../assets/icons/info.svg';
import { ReactComponent as WarningSVG } from '../../assets/icons/warning.svg';

/*
 * Usage:
 *  <MessageBox fullWidth>Info</MessageBox>: use 'fullWidth' attribute to enable 100% width
 *  <MessageBox>Message</MessageBox>
 *  <MessageBox variant='info'>Info</MessageBox>
 *  <MessageBox variant='success'>Success</MessageBox>
 *  <MessageBox variant='danger'>Error</MessageBox>
 *  <MessageBox variant='warning'>Warning</MessageBox>
 */

export default function MessageBox(props) {
  const { variant, className, fullWidth } = props;
  return (
    <div
      className={`
      alert alert-${variant || 'info'} 
      ${className} 
      ${fullWidth ? 'alert--full-width' : ''}`}
    >
      {variant === 'success' && (
        <SuccessSVG className='message-box__success-icon' />
      )}
      {variant === 'danger' && (
        <DangerSVG className='message-box__danger-icon' />
      )}
      {variant === 'warning' && (
        <WarningSVG className='message-box__warning-icon' />
      )}
      {variant === 'info' && <InfoSVG className='message-box__info-icon' />}
      {props.children}
    </div>
  );
}
