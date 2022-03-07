import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactCard from '../../../components/ContactCard/ContactCard';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getAllContacts } from '../../../features/contact/get-all-contacts';

function Contacts() {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector(
    (state) => state.allContacts
  );

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getAllContacts());
  }, [dispatch]);

  return (
    <div className='container contacts__container'>
      <div className='contacts__header'>
        <h1 className='contacts__title'>Contacts</h1>
      </div>

      {loading && <Loading />}
      {!loading && error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && contacts && (
        <div className='contacts__content'>
          {contacts.map((contact) => {
            return <ContactCard contact={contact} key={contact._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Contacts;
