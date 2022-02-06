import React from 'react';
import { Outlet } from 'react-router-dom';
import UserSideBar from '../../../components/UserSideBar/UserSideBar';

function UserLayout() {
  return (
    <main className='container user__container'>
      <UserSideBar />
      <Outlet />
    </main>
  );
}

export default UserLayout;
