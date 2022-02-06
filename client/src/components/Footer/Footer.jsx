import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import visaImg from '../../assets/payment-methods/visa.png';
import masterImg from '../../assets/payment-methods/master-card.png';
import paypalImg from '../../assets/payment-methods/paypal.png';

function Footer() {
  const { categories } = useSelector((state) => state.allCategories);

  return (
    <footer className='bg-primary'>
      <div className='main-footer container'>
        <Link to='/' className='brand large'>
          Flowers de Paris
        </Link>

        <ul className='footer-info flex'>
          <li>
            <h3 className='footer-header'>Flowers de Paris</h3>
          </li>
          <li>
            <Link to='/about' className='footer-link'>
              About us
            </Link>
          </li>
          <li>
            <Link to='/contact' className='footer-link'>
              Contact
            </Link>
          </li>
          <li>
            <Link to='/hiring' className='footer-link'>
              Hiring
            </Link>
          </li>
        </ul>

        <ul className='footer-category flex'>
          <li>
            <h3 className='footer-header'>Categories</h3>
          </li>

          {categories &&
            categories.map((category) => {
              return (
                <li key={category.slug}>
                  <Link
                    to={`/products/${category.slug}`}
                    className='footer-link'
                  >
                    {category.name}
                  </Link>
                </li>
              );
            })}
        </ul>

        <ul className='footer-social flex'>
          <li>
            <h3 className='footer-header'>Find us on</h3>
          </li>
          <li>
            <ul className='footer-social-list flex'>
              <li>
                <a
                  href='https://www.facebook.com/quangvu.bk10/'
                  target='_blank'
                  className='footer-social-item'
                  rel='noreferrer'
                >
                  <i className='bx bxl-facebook'></i>
                </a>
              </li>
              <li>
                <a
                  href='#instagram'
                  target='_blank'
                  rel='noreferrer'
                  className='footer-social-item'
                >
                  <i className='bx bxl-instagram'></i>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <ul className='footer-payment flex'>
          <li>
            <h3 className='footer-header'>Payment methods</h3>
          </li>
          <li>
            <ul className='footer-payment-list flex'>
              {/* <li className='footer-payment-item'>
            <img
              className='footer-payment-item'
              src='/images/payments/vnpayqr.png'
              alt='VNPay Icon'
            />
          </li>
          <li className='footer-payment-item'>
            <img
              className='footer-payment-item'
              src='/images/payments/momo.png'
              alt='Momo Icon'
            />
          </li> */}
              <li className='footer-payment-item'>
                <img
                  className='footer-payment-item'
                  src={visaImg}
                  alt='Visa Icon'
                />
              </li>
              <li className='footer-payment-item'>
                <img
                  className='footer-payment-item'
                  src={masterImg}
                  alt='Master Card Icon'
                />
              </li>
              <li className='footer-payment-item'>
                <img
                  className='footer-payment-item'
                  src={paypalImg}
                  alt='Paypal Icon'
                />
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <p className='legit'>
        Copyright 2022 &copy;Flowers de Paris. Alrights reserved.
      </p>
    </footer>
  );
}

export default Footer;
