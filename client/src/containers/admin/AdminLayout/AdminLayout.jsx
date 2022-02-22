import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function AdminLayout() {
  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return userInfo && userInfo.isAdmin ? (
    <main className='container'>
      <Outlet />
    </main>
  ) : (
    <Navigate replace to='/warning/forbidden' />
  );
}

export default AdminLayout;
