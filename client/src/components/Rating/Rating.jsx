import React from 'react';
import { renderRatingStars } from '../../utilities/helpers';

function Rating({ rating, numReviews }) {
  return (
    <div className='flex'>
      <div className='rating-stars'>{renderRatingStars(rating)}</div>
      <span className='rating-reviews'>
        {numReviews > 1 ? `(${numReviews}) reviews` : `(${numReviews}) review`}
      </span>
    </div>
  );
}

export default Rating;
