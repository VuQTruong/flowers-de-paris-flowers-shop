import React from 'react';
import { Link } from 'react-router-dom';

function ContactCard({ contact, showEdit }) {
  return (
    <div className='contact-card__container'>
      <div className='contact-card__item-panel'>
        <img
          src={contact.coverImage}
          alt={contact.name}
          className='contact-card__item-img'
        />
        <div className='contact-card__item-info'>
          <p className='contact-card__branch-name'>
            <strong>{contact.name}</strong>
          </p>
          <p>
            <strong>Description:</strong>
            {contact.description}
          </p>
          <p>
            <strong>Address:</strong>
            {contact.address}
          </p>
          <p>
            <strong>Phone:</strong>
            {contact.phone}
          </p>

          {showEdit && (
            <Link
              to={`edit/${contact._id}`}
              className='btn btn-primary contact-card__btn-edit'
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactCard;
