import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { dateFormat, renderRatingStars } from '../../utilities/helpers';
import Avatar from 'react-avatar';
import Axios from '../../config/axios';
import swal from 'sweetalert2';

function ReviewCard(props) {
  const review = props.data;

  const [loading, setLoading] = useState(false);

  const currentUser = useSelector((state) => state.currentUser);
  const { userInfo } = currentUser;

  const deleteReviewHandler = async () => {
    try {
      setLoading(true);
      await Axios.delete(`/reviews/${review._id}`);

      setLoading(false);
      swal.fire({
        icon: 'success',
        title: 'Yay!...',
        text: 'The comment have been deleted successfully!',
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className='review-card'>
      <header className='review-card__header'>
        <div className='review-card__user-info'>
          <Avatar
            className='review-card__user-avatar'
            name={userInfo.name}
            round={true}
            size='30'
            textSizeRatio={3.5}
          />
          <p className='review-card__name'>{review.name}</p>
        </div>
        <div className='review-card__stars'>
          {renderRatingStars(review.rating)}
        </div>
      </header>

      <main className='review-card__body'>
        <div className='review-card__title'>{review.title}</div>
        <div className='review-card__content'>{review.content}</div>
        <div className='review-card__tags'>
          {review.tags.map((tag) => (
            <div
              className='product-review__tag active'
              style={{ cursor: 'default' }}
            >
              {tag}
            </div>
          ))}
        </div>
        <div className='review-card__date'>
          Reviewed on {dateFormat.format(Date.parse(review.createdAt))}
        </div>
      </main>

      {userInfo && (userInfo.isAdmin || userInfo._id === review.user) && (
        <button
          className='review-card__delete-btn'
          onClick={deleteReviewHandler}
          disabled={loading}
        >
          {loading ? (
            <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
          ) : (
            <i className='bx bx-trash'></i>
          )}
        </button>
      )}
    </div>
  );
}

export default ReviewCard;
