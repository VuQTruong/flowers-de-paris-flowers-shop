import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MobileNav(props) {
  const { mbNavActive, activeMobileNav } = props;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const allCategories = useSelector((state) => state.allCategories);
  const { categories } = allCategories;

  const getClientName = () => {
    const nameArray = userInfo.name.split(' ');
    return nameArray[nameArray.length - 1];
  };

  const onSignOutClick = () => {
    // dispatch(signout());
    closeNavHandler();
  };

  const openNavHandler = () => {
    activeMobileNav(true);
  };

  const closeNavHandler = () => {
    activeMobileNav(false);
  };

  return (
    <React.Fragment>
      {/* Mobile Header */}
      <i
        className='bx bx-menu nav-toggle mobile-view'
        onClick={openNavHandler}
      ></i>
      <Link to='/cart' className='cart mobile-cart mobile-view'>
        <i className='bx bx-cart'></i>

        {/* render notification */}
        {cartItems && (
          <span
            className={`cart-notification ${
              cartItems.length > 0 ? '' : 'hidden'
            }`}
          >
            {cartItems.length}
          </span>
        )}
      </Link>

      {/* Mobile Sidebar */}
      <div
        className={`mobile-nav ${mbNavActive ? 'active' : ''} flex mobile-view`}
      >
        <div className='mobile-nav-content'>
          <header className='mobile-nav-header bg-primary flex'>
            <Link to='/' className='brand brand--sidebar'>
              Flowers de Paris
            </Link>
            <span className='mobile-nav-close' onClick={closeNavHandler}>
              &times;
            </span>
          </header>

          <nav className='mobile-nav-main'>
            <ul className='mobile-category-list'>
              {userInfo && userInfo.isAdmin && (
                <li>
                  <Link
                    className='mobile-category-list__link'
                    to='/admin/dashboard'
                    onClick={closeNavHandler}
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className='mobile-category-list__link'
                  to='/'
                  onClick={closeNavHandler}
                >
                  <i className='bx bx-store'></i>
                  Home
                </Link>
              </li>
              {categories &&
                categories.map((category) => {
                  return (
                    <li key={category.slug}>
                      <Link
                        className='mobile-category-list__link'
                        to={`/products/${category.slug}`}
                        onClick={closeNavHandler}
                      >
                        <i className='bx bx-category'></i>
                        {category.name}
                      </Link>
                    </li>
                  );
                })}

              <li>
                <Link
                  className='mobile-category-list__link'
                  to='/blog'
                  onClick={closeNavHandler}
                >
                  <i className='bx bxs-book-content'></i>
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  className='mobile-category-list__link'
                  to='/about'
                  onClick={closeNavHandler}
                >
                  <i className='bx bx-info-circle'></i>
                  About us
                </Link>
              </li>
            </ul>
          </nav>

          <footer className='mobile-nav-footer bg-primary flex'>
            {userInfo ? (
              <React.Fragment>
                <Link
                  to='/customer/account'
                  className='mobile-nav-user flex'
                  onClick={closeNavHandler}
                >
                  <i className='bx bxs-user'></i>
                  <div>
                    <p>{getClientName()}</p>
                    <p>My Account</p>
                  </div>
                </Link>

                <Link to='#signout' onClick={onSignOutClick}>
                  <i className='bx bx-log-out'></i>
                </Link>
              </React.Fragment>
            ) : (
              <Link
                to='/signin'
                className='mobile-nav-user flex'
                onClick={closeNavHandler}
              >
                <i className='bx bx-log-in'></i>
                Sign in
              </Link>
            )}
          </footer>
        </div>

        <div className='mobile-nav-blank' onClick={closeNavHandler}></div>
      </div>

      {/* Mobile User Info */}
      <div className='mobile-user flex'>
        <Link to='/customer/favourite' className='mobile-user__item'>
          <i className='bx bxs-heart'></i>
          <span>Yêu thích</span>
        </Link>
        <Link to='/customer/account' className='mobile-user__item'>
          <i className='bx bxs-user'></i>
          <span>Tài khoản</span>
        </Link>
        <Link to='/customer/orders/history' className='mobile-user__item'>
          <i className='bx bx-notepad'></i>
          <span>Đơn hàng</span>
        </Link>
      </div>
    </React.Fragment>
  );
}

export default MobileNav;
