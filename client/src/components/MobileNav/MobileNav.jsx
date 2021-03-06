import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { signOut } from '../../features/users/sign-out';
import Avatar from 'react-avatar';
import { unwrapResult } from '@reduxjs/toolkit';
import swal from 'sweetalert2';
import { clearCartStore } from '../../features/cart/slice/cart-slice';

function MobileNav(props) {
  const dispatch = useDispatch();
  const { mbNavActive, activeMobileNav } = props;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const allCategories = useSelector((state) => state.allCategories);
  const { categories } = allCategories;

  const getClientName = () => {
    const nameArray = userInfo.name.split(' ');
    return nameArray[0];
  };

  const onSignOutClick = async () => {
    closeNavHandler();

    try {
      const actionResult = await dispatch(signOut());
      unwrapResult(actionResult);

      dispatch(clearCartStore());

      swal.fire({
        icon: 'success',
        title: 'Sign Out Successfully!',
        text: 'Thanks for shopping with us! See you later!',
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error,
      });
    }
  };

  const openNavHandler = () => {
    document.body.style.overflow = 'hidden';
    activeMobileNav(true);
  };

  const closeNavHandler = () => {
    document.body.style.overflow = 'auto';
    activeMobileNav(false);
  };

  const generateUserNavClasses = (navData) => {
    const { isActive } = navData;
    let classesArray = ['mobile-user__item'];

    if (isActive) {
      classesArray.push('active');
    }

    return classesArray.join(' ');
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
      <aside
        className={`mobile-nav ${mbNavActive ? 'active' : ''} flex mobile-view`}
      >
        <div className='mobile-nav__content'>
          <header className='mobile-nav__header bg-primary flex'>
            <Link to='/' className='brand brand--sidebar'>
              Flowers de Paris
            </Link>
            <span className='mobile-nav__btn-close' onClick={closeNavHandler}>
              &times;
            </span>
          </header>

          <nav className='mobile-nav__main'>
            <ul className='mobile-category-list'>
              {userInfo && userInfo.isAdmin && (
                <li>
                  <Link
                    className='mobile-category-list__link'
                    to='/admin/dashboard'
                    onClick={closeNavHandler}
                  >
                    <i className='bx bxs-dashboard'></i>
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
                  to='/blogs'
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

          <footer className='mobile-nav__footer bg-primary flex'>
            {userInfo ? (
              <React.Fragment>
                <Link
                  to='/user/info'
                  className='mobile-nav__user flex'
                  onClick={closeNavHandler}
                >
                  <Avatar
                    className='mobile-nav__user-avatar'
                    name={userInfo.name}
                    round={true}
                    size='50'
                    textSizeRatio={3}
                  />

                  <div>
                    <p>{getClientName()}</p>
                    <span>My Account</span>
                  </div>
                </Link>

                <Link
                  to='#signout'
                  onClick={onSignOutClick}
                  className='mobile-nav__btn-signout'
                >
                  <i className='bx bx-log-out-circle'></i>
                  <span>Sign Out</span>
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link
                  to='/signin'
                  className='mobile-nav__btn-signin flex center'
                  onClick={closeNavHandler}
                >
                  <i className='bx bx-log-in-circle'></i>
                  Sign In
                </Link>
                <Link
                  to='/signup'
                  className='mobile-nav__btn-signup'
                  onClick={closeNavHandler}
                >
                  Sign Up
                </Link>
              </React.Fragment>
            )}
          </footer>
        </div>

        <div className='mobile-nav__blank' onClick={closeNavHandler}></div>
      </aside>

      {/* Mobile User Info */}
      <nav className='mobile-user flex'>
        <NavLink to='/user/fav' className={generateUserNavClasses}>
          <i className='bx bx-heart'></i>
          <span>Favorites</span>
        </NavLink>
        <NavLink to='/user/info' className={generateUserNavClasses}>
          <i className='bx bx-user'></i>
          <span>My Account</span>
        </NavLink>
        <NavLink to='/user/orders' className={generateUserNavClasses}>
          <i className='bx bx-notepad'></i>
          <span>My Oders</span>
        </NavLink>
      </nav>
    </React.Fragment>
  );
}

export default MobileNav;
