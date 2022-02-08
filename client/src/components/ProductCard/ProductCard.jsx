import React from 'react';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../../utilities/helpers';
import Rating from '../Rating/Rating';

function ProductCard(props) {
  const product = props.data;

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
          {product.discountAmount !== 0 ? (
            <React.Fragment>
              <div className='product-card__price--origin inactive'>
                <strike>{currencyFormat.format(product.price)}</strike>
              </div>

              <div className='product-card__price--discount'>
                {currencyFormat.format(product.price - product.discountAmount)}
              </div>
            </React.Fragment>
          ) : (
            <div className='product-card__price--origin'>
              {currencyFormat.format(product.price)}
            </div>
          )}
        </div>
      </div>

      {product.discountAmount !== 0 && (
        <div className='product-card__sale-tag'>Sale</div>
      )}

      {/* <div
        className={`product-card__like ${isLiked ? 'active' : ''}`}
        onClick={likeHandler}
      >
        <i className='bx bxs-heart'></i>
      </div> */}
    </div>
  );
}

export default ProductCard;
