import React from 'react';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';

function UserSideBar() {
  const { userInfo } = useSelector((state) => state.currentUser);

  return (
    <aside className='user-sidebar__container'>
      <section className='user-sidebar__avatar'>
        <Avatar
          className='header-info__user-avatar'
          name={userInfo.name}
          round={true}
          size='30'
          textSizeRatio={3.5}
        />
      </section>
    </aside>
  );
}

export default UserSideBar;
