import React from 'react';

function Rating({ rating, numReviews }) {
  const renderRating = () => {
    let count = 0;
    let content = [];

    for (let i = 1; i <= rating; i++) {
      content.push(
        <span key={count++}>
          <i className='bx bxs-star'></i>
        </span>
      );
    }

    if (!Number.isInteger(rating)) {
      content.push(
        <span key={count++}>
          <i className='bx bxs-star-half'></i>
        </span>
      );
    }

    for (let i = 1; i <= 5 - rating; i++) {
      content.push(
        <span key={count++}>
          <i className='bx bx-star'></i>
        </span>
      );
    }

    return content;
  };

  return (
    <div className='flex'>
      <div className='rating-stars'>{renderRating()}</div>
      <span className='rating-reviews'>
        {numReviews > 1 ? `(${numReviews}) reviews` : `(${numReviews}) review`}
      </span>
    </div>
  );
}

export default Rating;
