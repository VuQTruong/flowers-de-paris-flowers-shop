import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminLayout() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  );
}

export default AdminLayout;
