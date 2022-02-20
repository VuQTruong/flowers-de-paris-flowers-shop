import React from 'react';

function CheckoutSteps(props) {
  return (
    <div className='checkout-steps'>
      <div className={`checkout-steps__box ${props.step1 ? 'active' : ''}`}>
        <span className='checkout-steps__step'>1</span>
        <span className='checkout-steps__step-name'>Sign In</span>
      </div>
      <div className={`checkout-steps__box ${props.step2 ? 'active' : ''}`}>
        <span className='checkout-steps__step'>2</span>
        <span className='checkout-steps__step-name'>Delivery</span>
      </div>
      <div className={`checkout-steps__box ${props.step3 ? 'active' : ''}`}>
        <span className='checkout-steps__step'>3</span>
        <span className='checkout-steps__step-name'>Payment</span>
      </div>
    </div>
  );
}

export default CheckoutSteps;
