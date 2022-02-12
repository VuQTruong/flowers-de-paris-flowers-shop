import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../../utilities/helpers';
import Rating from '../Rating/Rating';
import { updateUserFavorites } from '../../features/users/updateUserFavorites';

function ProductCard(props) {
  const product = props.data;

  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const { userInfo } = useSelector((state) => state.currentUser);

  useEffect(() => {
    userInfo.favorites.includes(product._id) && setIsLiked(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeHandler = () => {
    let favorites = [...userInfo.favorites];

    if (favorites.includes(product._id)) {
      setIsLiked(false);
      favorites = favorites.filter((item) => item !== product._id);
    } else {
      setIsLiked(true);
      favorites.push(product._id);
    }

    // update user's favorites
    dispatch(updateUserFavorites(favorites));
  };

  return (
    <div className='product-card'>
      <Link
        to={`/products/${product.category.slug}/${product.slug}`}
        className='product-card__image'
      >
        <img src={product.images[0]} alt={product.name} />
      </Link>

      <div className='product-card__body'>
        <Link to={`/products/${product.category.slug}/${product.slug}`}>
          <h2>{product.name}</h2>
        </Link>
        <Rating
          rating={product.averageRating}
          numReviews={product.numReviews}
        />
        {product.size && (
          <div className='product-card__size'>
            Size <span className='product-card__size-icon'>{product.size}</span>
          </div>
        )}
        <div className='product-card__price'>
          {product.saleOffPrice !== 0 ? (
            <React.Fragment>
              <div className='product-card__price--origin inactive'>
                <strike>{currencyFormat.format(product.price)}</strike>
                <span className='product-card__discount-percentage'>
                  <i className='bx bxs-downvote'></i>
                  {product.discountPercentage}%
                </span>
              </div>

              <div className='product-card__price--discount'>
                {currencyFormat.format(product.saleOffPrice)}
              </div>
            </React.Fragment>
          ) : (
            <div className='product-card__price--origin'>
              {currencyFormat.format(product.price)}
            </div>
          )}
        </div>
      </div>

      {product.saleOffPrice !== 0 && (
        <div className='product-card__sale-tag'>Sale</div>
      )}

      <div
        className={`product-card__like ${isLiked ? 'active' : ''}`}
        onClick={likeHandler}
      >
        <i className='bx bxs-heart'></i>
      </div>
    </div>
  );
}

export default ProductCard;
