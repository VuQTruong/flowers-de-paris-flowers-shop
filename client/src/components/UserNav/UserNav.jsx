import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../features/users/sign-out';
import Avatar from 'react-avatar';
import { unwrapResult } from '@reduxjs/toolkit';
import swal from 'sweetalert2';
import { clearCartStore } from '../../features/cart/slice/cart-slice';

function UserNav(props) {
  const { activeMobileNav, disableCart } = props;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.currentUser);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const onSignOutClick = async () => {
    activeMobileNav(false);

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

  const getClientName = () => {
    const nameArray = userInfo.name.split(' ');
    return nameArray[0];
  };

  const calculateTotalItems = () => {
    let totalQuantity = 0;

    for (let item of cartItems) {
      totalQuantity += item.quantity;
    }

    return totalQuantity;
  };

  return (
    <div className='header-info'>
      {!disableCart && (
        <Link to='/cart' className='cart'>
          <i className='bx bx-cart'></i>

          {/* render notification */}
          {cartItems && (
            <span className='cart-notification'>{calculateTotalItems()}</span>
          )}
        </Link>
      )}

      {userInfo ? (
        <div className='header-info__user dropdown'>
          {!userInfo.avatar && (
            <Avatar
              className='header-info__user-avatar'
              name={userInfo.name}
              round={true}
              size='30'
              textSizeRatio={3.5}
            />
          )}

          {userInfo.avatar && (
            <img
              src={userInfo.avatar}
              alt='User Avatar'
              className='header-info__user-avatar-img'
            />
          )}

          <Link to='/user/info'>
            {getClientName()}
            &nbsp;
            <i className='bx bx-caret-down'></i>
          </Link>
          <ul className='dropdown-menu dropdown-menu--right'>
            {userInfo.isAdmin && (
              <li>
                <Link to='/admin/dashboard' className='dropdown-item'>
                  <i className='bx bxs-dashboard'></i>
                  Dashboard
                </Link>
              </li>
            )}
            <li>
              <Link to='/user/info' className='dropdown-item'>
                <i className='bx bx-user'></i>
                My Account
              </Link>
            </li>
            <li>
              <Link to='/user/fav' className='dropdown-item'>
                <i className='bx bx-heart'></i>
                My Favorites
              </Link>
            </li>
            <li>
              <Link to='/user/orders' className='dropdown-item'>
                <i className='bx bx-spreadsheet'></i>
                My Orders
              </Link>
            </li>
            <li>
              <Link
                to='/#signout'
                className='dropdown-item'
                onClick={onSignOutClick}
              >
                <i className='bx bx-log-out-circle'></i>
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      ) : (
        <React.Fragment>
          <Link to='/signin' className='header-info__btn-signin'>
            Sign In
          </Link>
          <Link to='/signup' className='header-info__btn-signup'>
            Sign Up
          </Link>
        </React.Fragment>
      )}
    </div>
  );
}

export default UserNav;
