import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminLayout() {
  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  return userInfo && userInfo.isAdmin ? (
    <main className='container'>
      <Outlet />
    </main>
  ) : (
    <Navigate replace to='/warning/forbidden' />
  );
}

export default AdminLayout;
