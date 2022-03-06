import React from 'react';
import { NavLink } from 'react-router-dom';
import UserBriefInfo from '../UserBriefInfo/UserBriefInfo';

function UserSideBar() {
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
      <UserBriefInfo />

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
