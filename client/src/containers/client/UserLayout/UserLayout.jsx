import React from 'react';
import { Outlet } from 'react-router-dom';

function UserLayout() {
  return (
    <div>
      <h2>My Account</h2>
      <Outlet />
    </div>
  );
}

export default UserLayout;
