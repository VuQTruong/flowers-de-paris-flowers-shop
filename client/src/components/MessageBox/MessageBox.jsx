import React from 'react';

/*
 * Usage:
 *  <MessageBox fullWidth>Info</MessageBox>: use 'fullWidth' attribute to enable 100% width
 *  <MessageBox>Info</MessageBox>
 *  <MessageBox variant='success'>Success</MessageBox>
 *  <MessageBox variant='danger'>Error</MessageBox>
 *  <MessageBox variant='warning'>Warning</MessageBox>
 */

export default function MessageBox(props) {
  return (
    <div
      className={`
      alert alert-${props.variant || 'info'} 
      ${props.className} 
      ${props.fullWidth ? 'alert--full-width' : ''}`}
    >
      {props.children}
    </div>
  );
}
