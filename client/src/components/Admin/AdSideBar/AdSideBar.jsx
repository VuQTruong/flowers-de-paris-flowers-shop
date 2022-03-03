import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function AdSideBar() {
  const [showSidebar, setShowSidebar] = useState(false);

  const showSidebarHandler = () => {
    showSidebar ? setShowSidebar(false) : setShowSidebar(true);
  };

  const generateAdSideBarClasses = (navData) => {
    const { isActive } = navData;
    let classesArray = ['admin-sidebar__link'];

    if (isActive) {
      classesArray.push('active');
    }

    return classesArray.join(' ');
  };

  return (
    <div>
      <ul className={`admin-sidebar ${showSidebar ? 'active' : ''}`}>
        <li className='admin-sidebar__item'>
          <div className='admin-sidebar__toggle' onClick={showSidebarHandler}>
            <i className='bx bx-chevrons-right'></i>
          </div>
          <div className='admin-sidebar__tooltip'>Expand</div>
        </li>

        <li className='admin-sidebar__item'>
          <NavLink to='/admin/dashboard' className={generateAdSideBarClasses}>
            <i className='bx bxs-dashboard'></i>
            Dashboard
          </NavLink>
          <div className='admin-sidebar__tooltip'>Dashboard</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/analytic' className={generateAdSideBarClasses}>
            <i className='bx bx-line-chart'></i>
            Analytic
          </NavLink>
          <div className='admin-sidebar__tooltip'>Analytic</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/orders' className={generateAdSideBarClasses}>
            <i className='bx bx-spreadsheet'></i>
            Orders
          </NavLink>
          <div className='admin-sidebar__tooltip'>Orders</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/categories' className={generateAdSideBarClasses}>
            <i className='bx bx-category'></i>
            Categories
          </NavLink>
          <div className='admin-sidebar__tooltip'>Categories</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/products' className={generateAdSideBarClasses}>
            <i className='bx bx-store-alt'></i>
            Products
          </NavLink>
          <div className='admin-sidebar__tooltip'>Products</div>
        </li>

        <li className='admin-sidebar__item'>
          <NavLink to='/admin/tags' className={generateAdSideBarClasses}>
            <i className='bx bx-purchase-tag'></i>
            Tags
          </NavLink>
          <div className='admin-sidebar__tooltip'>Tags</div>
        </li>

        <li className='admin-sidebar__item'>
          <NavLink to='/admin/accounts' className={generateAdSideBarClasses}>
            <i className='bx bxs-user-account'></i>
            Accounts
          </NavLink>
          <div className='admin-sidebar__tooltip'>Accounts</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/blogs' className={generateAdSideBarClasses}>
            <i className='bx bx-notepad'></i>
            Blogs
          </NavLink>
          <div className='admin-sidebar__tooltip'>Blogs</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/about' className={generateAdSideBarClasses}>
            <i className='bx bx-info-circle'></i>
            About us
          </NavLink>
          <div className='admin-sidebar__tooltip'>About us</div>
        </li>

        <li className='admin-sidebar__item'>
          <NavLink to='/admin/contacts' className={generateAdSideBarClasses}>
            <i className='bx bxs-contact'></i>
            Contacts
          </NavLink>
          <div className='admin-sidebar__tooltip'>Contacts</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/hiring' className={generateAdSideBarClasses}>
            <i className='bx bx-user-pin'></i>
            Hiring
          </NavLink>
          <div className='admin-sidebar__tooltip'>Hiring</div>
        </li>
        <li className='admin-sidebar__item'>
          <NavLink to='/admin/config' className={generateAdSideBarClasses}>
            <i className='bx bxs-cog'></i>
            App Config
          </NavLink>
          <div className='admin-sidebar__tooltip'>App Config</div>
        </li>
      </ul>
    </div>
  );
}

export default AdSideBar;
