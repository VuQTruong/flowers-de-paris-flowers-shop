import React, { useState } from 'react';

function RatingFilter() {
  const [rating, setRating] = useState(0);

  const ratingFilterHandler = (ratingValue) => {};

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Average Rating</h2>
      <main className='filter-item__content flex col'>
        <div
          className={`filter-rating ${rating === 0 ? 'active' : ''}`}
          onClick={() => ratingFilterHandler(0)}
        >
          <span>All products</span>
        </div>

        <div
          className={`filter-rating ${rating === 5 ? 'active' : ''}`}
          onClick={() => ratingFilterHandler(5)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <span>from 5 stars</span>
        </div>

        <div
          className={`filter-rating ${rating === 4 ? 'active' : ''}`}
          onClick={() => ratingFilterHandler(4)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <span>from 4 stars</span>
        </div>

        <div
          className={`filter-rating ${rating === 3 ? 'active' : ''}`}
          onClick={() => ratingFilterHandler(3)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
          <span>from 3 stars</span>
        </div>
      </main>
    </div>
  );
}

export default RatingFilter;
