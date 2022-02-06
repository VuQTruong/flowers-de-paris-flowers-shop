import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import UserSideBar from '../../../components/UserSideBar/UserSideBar';

function UserLayout() {
  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  return userInfo ? (
    <main className='container user__container'>
      <UserSideBar />
      <Outlet />
    </main>
  ) : (
    <Navigate replace to='/warning/unauthorized' />
  );
}

export default UserLayout;
