import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/Header/Header';

function ClientLayout() {
  return (
    <div className='page-container'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default ClientLayout;
