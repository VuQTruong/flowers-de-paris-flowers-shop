import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getAllContacts } from '../../../features/contact/get-all-contacts';
import { Link } from 'react-router-dom';
import ContactCard from '../../../components/ContactCard/ContactCard';

function AdContacts() {
  const dispatch = useDispatch();

  const { contacts, loading, error } = useSelector(
    (state) => state.allContacts
  );

  useEffect(() => {
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Contact Management</h2>
        <Link to='add' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-add-to-queue'></i>
          <span>Add new contact</span>
        </Link>
      </div>

      <div className='dashboard__contacts'>
        {loading && <Loading />}
        {error && <MessageBox variant='danger'>{error}</MessageBox>}
        {contacts && contacts.length === 0 && (
          <MessageBox variant='info' fullWidth>
            There are no contacts to show
          </MessageBox>
        )}

        {contacts && contacts.length !== 0 && (
          <div className='ad-contacts__contacts-list'>
            {contacts.map((contact) => {
              return (
                <ContactCard contact={contact} showEdit key={contact._id} />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdContacts;
