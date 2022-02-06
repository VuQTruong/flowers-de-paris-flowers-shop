import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signOut } from '../../features/auth/current-user-slice';
import Avatar from 'react-avatar';

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
    return nameArray[0];
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
          <Avatar
            className='header-info__user-avatar'
            name={userInfo.name}
            round={true}
            size='30'
            textSizeRatio={3.5}
          />

          <Link to='/user/info'>
            {getClientName()}
            &nbsp;
            <i className='bx bx-caret-down'></i>
          </Link>
          <ul className='dropdown-menu dropdown-menu--right'>
            {userInfo.isAdmin && (
              <Link to='/admin/dashboard' className='dropdown-item'>
                <i className='bx bx-dashboard'></i>
                Dashboard
              </Link>
            )}
            <Link to='/user/orders' className='dropdown-item'>
              <i className='bx bx-spreadsheet'></i>
              My Orders
            </Link>
            <Link to='/user/info' className='dropdown-item'>
              <i className='bx bx-user'></i>
              My Account
            </Link>
            <Link to='/user/fav' className='dropdown-item'>
              <i className='bx bx-heart'></i>
              My Favorites
            </Link>
            <Link
              to='#signout'
              className='dropdown-item'
              onClick={onSignOutClick}
            >
              <i className='bx bx-log-out-circle'></i>
              Sign Out
            </Link>
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
