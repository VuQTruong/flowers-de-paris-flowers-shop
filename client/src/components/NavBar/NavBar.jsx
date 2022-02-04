import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  //   const [mbNavActive, setMbNavActive] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  //   const dispatch = useDispatch();
  //   const cart = useSelector((state) => state.cart);
  //   const userSignIn = useSelector((state) => state.userSignIn);
  //   const { userInfo } = userSignIn;

  //   const renderCartNotification = () => {
  //     if (cart.cartItems.length > 0) {
  //       return <span className='cart-notification'>{cart.cartItems.length}</span>;
  //     } else {
  //       return <span className='cart-notification hidden'>{cart.cartItems.length}</span>;
  //     }
  //   };

  //   const openNavHandler = () => {
  //     setMbNavActive(true);
  //   };

  //   const closeNavHandler = () => {
  //     setMbNavActive(false);
  //   };

  //   const onSignOutClick = () => {
  // dispatch(signout());
  // closeNavHandler();
  //   };

  //   const getClientName = () => {
  //     const nameArray = userInfo.name.split(' ');
  //     return nameArray[nameArray.length - 1];
  //   };

  const searchHandler = (e) => {
    if (e.code === 'Enter') {
      navigate(`/search?name[regex]=${searchValue}`);
      setSearchValue('');
    }
  };

  const onScroll = () => {
    const posY = window.scrollY;
    posY > 50 ? setHideHeader(true) : setHideHeader(false);
  };

  window.addEventListener('scroll', onScroll);

  return (
    <header className={`header-container bg-primary fixed ${hideHeader ? 'hide-header' : ''}`}>
      <div className='main-header container flex'>
        <Link to='/' className='brand'>
          Flowers de Paris
        </Link>

        {/* Navigation */}
        <nav className='header-nav'>
          <ul className='header-category flex'>
            <li className='dropdown'>
              <Link to='#' className='header-category-link'>
                Shop
              </Link>
              <ul className='dropdown-menu'>
                <Link to='/products/bouquets' className='dropdown-item'>
                  Hoa tươi
                </Link>
                <Link to='/products/flowerbaskets' className='dropdown-item'>
                  Lẵng hoa
                </Link>
                <Link to='/products/gifts' className='dropdown-item'>
                  Quà tặng
                </Link>
              </ul>
            </li>

            <li>
              <Link to='/blogs' className='header-category-link'>
                Blog
              </Link>
            </li>

            <li>
              <Link to='/about' className='header-category-link'>
                Về chúng tôi
              </Link>
            </li>
          </ul>
        </nav>

        {/* Search Bar */}
        <input
          type='text'
          className='search-bar'
          placeholder='Tìm kiếm...'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyUp={searchHandler}
        />

        {/* Cart and User Functionalities */}
        {/* <div className='header-info'>
          <Link to='/cart' className='cart'>
            <FaShoppingCart />
            {renderCartNotification()}
          </Link>
          {userInfo ? (
            <div className='header-info__user dropdown'>
              <Link to='/customer/account'>
                {getClientName()}
                &nbsp;
                <FaCaretDown />
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
                  Đơn hàng
                </Link>
                <Link to='/customer/account' className='dropdown-item'>
                  <i className='bx bxs-user'></i>
                  Tài khoản của tôi
                </Link>
                <Link to='#signout' className='dropdown-item' onClick={onSignOutClick}>
                  <i className='bx bx-log-out'></i>
                  Thoát tài khoản
                </Link>
              </ul>
            </div>
          ) : (
            <Link to='/signin'>Đăng nhập</Link>
          )}
        </div> */}
      </div>
    </header>
  );
}

export default NavBar;
