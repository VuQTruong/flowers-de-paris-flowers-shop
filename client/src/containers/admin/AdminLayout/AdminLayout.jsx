import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import AdHeader from '../../../components/Admin/AdHeader/AdHeader';
import AdSideBar from '../../../components/Admin/AdSideBar/AdSideBar';

function AdminLayout() {
  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  return userInfo && userInfo.isAdmin ? (
    <div className='page-container'>
      <AdHeader />
      <div className='admin-layout__content'>
        <AdSideBar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate replace to='/warning/forbidden' />
  );
}

export default AdminLayout;
