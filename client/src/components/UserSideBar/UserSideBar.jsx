import React from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dateFormat } from '../../utilities/helpers';

function UserSideBar() {
  const { userInfo } = useSelector((state) => state.currentUser);

  const generateClasses = (navData) => {
    const { isActive } = navData;
    let classesArray = ['user-sidebar__list-item'];

    if (isActive) {
      classesArray.push('active');
    }

    return classesArray.join(' ');
  };

  return (
    <aside className='user-sidebar__container'>
      <section className='user-sidebar__brief-info'>
        <Avatar
          className='user-sidebar__user-avatar'
          name={userInfo.name}
          round={true}
          size='100'
          textSizeRatio={3}
        />
        <p className='user-sidebar__username'>{userInfo.name}</p>
        <p className='user-sidebar__joined-info'>
          Joined on
          <span className='joined-date'>
            {dateFormat.format(Date.parse(userInfo.createdAt))}
          </span>
        </p>
        <p className='user-sidebar__divider'>🔥🔥🔥🔥🔥🔥🔥</p>
      </section>

      <nav className='user-sidebar__navigation'>
        <ul className='user-sidebar__nav-list'>
          <li>
            <NavLink to='/user/info' className={generateClasses}>
              <i className='bx bx-user'></i>
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink to='/user/fav' className={generateClasses}>
              <i className='bx bx-heart'></i>
              My Favorites
            </NavLink>
          </li>
          <li>
            <NavLink to='/user/orders' className={generateClasses}>
              <i className='bx bx-spreadsheet'></i>
              My Orders
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default UserSideBar;
