import React from 'react';
import { Link } from 'react-router-dom';
import { dateWithoutWeekdayFormat } from '../../utilities/helpers';

function BlogCard(props) {
  const { className, link, image, title, summary, date, imgRef } = props;

  return (
    <Link to={link} className={`blog-card ${className ? className : ''}`}>
      <div className='blog-card__img'>
        <img
          src={image || '/images/defaultImg.png'}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/images/defaultImg.png';
          }}
          alt='Blog Cover Img'
          ref={imgRef && imgRef}
        />
      </div>

      <div className='blog-card__content'>
        <h3 className='blog-card__title'>{title}</h3>
        <p className='blog-card__summary'>{summary}</p>
      </div>

      <p className='blog-card__date'>{dateWithoutWeekdayFormat.format(date)}</p>
    </Link>
  );
}

export default BlogCard;
