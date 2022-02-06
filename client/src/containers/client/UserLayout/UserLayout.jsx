import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../../../components/UserSideBar/UserSideBar';

function UserLayout() {
  return (
    <div className='container user__container'>
      <UserSideBar />
      <Outlet />
    </div>
  );
}

export default UserLayout;
