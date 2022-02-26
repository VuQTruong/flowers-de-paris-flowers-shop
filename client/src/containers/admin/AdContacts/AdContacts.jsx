import React from 'react';

function AdContacts() {
  const saveHandler = () => {};

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Contacts Management</h2>
        <button
          className='btn btn-primary dashboard__btn'
          onClick={saveHandler}
        >
          <i className='bx bx-save'></i>
          <span>Save</span>
        </button>
      </div>

      <div className='dashboard__contact'></div>
    </div>
  );
}

export default AdContacts;
