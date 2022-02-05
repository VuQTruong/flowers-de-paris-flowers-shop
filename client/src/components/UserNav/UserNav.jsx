import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../features/auth/current-user-slice';

function UserNav(props) {
  const { activeMobileNav } = props;

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.currentUser);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const onSignOutClick = () => {
    dispatch(signOut());
    activeMobileNav(false);
  };

  const getClientName = () => {
    const nameArray = userInfo.name.split(' ');
    return nameArray[nameArray.length - 1];
  };

  return (
    <div className='header-info'>
      <Link to='/cart' className='cart'>
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

      {userInfo ? (
        <div className='header-info__user dropdown'>
          <Link to='/customer/account'>
            {getClientName()}
            &nbsp;
            <i className='bx bx-caret-down'></i>
          </Link>
          <ul className='dropdown-menu dropdown-menu--right'>
            {userInfo.isAdmin && (
              <Link to='/admin/dashboard' className='dropdown-item'>
                <i className='bx bxs-dashboard'></i>
                Dashboard
              </Link>
            )}
            <Link to='/customer/orders/history' className='dropdown-item'>
              <i className='bx bxs-spreadsheet'></i>
              My Orders
            </Link>
            <Link to='/customer/account' className='dropdown-item'>
              <i className='bx bxs-user'></i>
              My Account
            </Link>
            <Link
              to='#signout'
              className='dropdown-item'
              onClick={onSignOutClick}
            >
              <i className='bx bx-log-out'></i>
              Sign Out
            </Link>
          </ul>
        </div>
      ) : (
        <Link to='/signin'>Sign In</Link>
      )}
    </div>
  );
}

export default UserNav;