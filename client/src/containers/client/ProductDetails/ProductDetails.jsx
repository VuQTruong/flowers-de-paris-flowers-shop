import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { currencyFormat, renderRatingStars } from '../../../utilities/helpers';
import ReactHtmlParser from 'react-html-parser';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';
import { getProductById } from '../../../features/products/get-product-by-id';

import ProductReviews from '../../../components/ProductReviews/ProductReviews';

function ProductDetails() {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentProduct = useSelector((state) => state.currentProduct);
  const { productId, product, loading } = currentProduct;

  const { userInfo } = useSelector((state) => state.currentUser);

  useEffect(() => {
    dispatch(getProductById(productId));
  }, [dispatch, productId]);

  const decreaseQty = () => {
    if (qty !== 1) {
      setQty(qty - 1);
    }
  };

  const increaseQty = () => {
    setQty(qty + 1);
  };

  const selectImageHandler = (index) => {
    setSelectedImage(index);
  };

  const addToCartHandler = () => {
    // dispatch(addToCart(product, qty));
  };

  return (
    <div className='container'>
      {loading ? (
        <Loading />
      ) : (
        <div className='product-details flex'>
          {/* Product Images */}
          <div className='product-images flex col col-5'>
            <div className='image-box'>
              <img src={product.images[selectedImage]} alt={product.name} />
            </div>
            <ol className='image-list flex'>
              {product.images.map((image, index) => (
                <li
                  key={index}
                  className={`image-item ${
                    index === selectedImage ? 'active' : ''
                  }`}
                  onClick={() => selectImageHandler(index)}
                >
                  <img src={image} alt={product.name} />
                </li>
              ))}
            </ol>
          </div>

          <div className='product-info col-7'>
            <h2 className='product-title'>{product.name}</h2>
            {product.discountAmount !== 0 ? (
              <React.Fragment>
                <span className='product-price inactive'>
                  <strike>{currencyFormat.format(product.price)}</strike>
                </span>

                <span className='product-price'>
                  {currencyFormat.format(product.discountAmount)}
                </span>
              </React.Fragment>
            ) : (
              <p className='product-price'>
                {currencyFormat.format(product.price * qty)}
              </p>
            )}

            <h3>Decriptions</h3>
            <div className='ck-content'>{ReactHtmlParser(product.summary)}</div>

            <div className='quantity-selector flex'>
              <button onClick={decreaseQty} className='btn btn-qty'>
                <i className='bx bx-minus'></i>
              </button>
              <input
                type='text'
                value={qty}
                className='quantity-value'
                readOnly
              ></input>
              <button onClick={increaseQty} className='btn btn-qty'>
                <i className='bx bx-plus'></i>
              </button>
            </div>

            <button
              type='button'
              className='btn btn-cta'
              onClick={addToCartHandler}
            >
              Add to cart
            </button>

            {product.tags.length !== 0 && (
              <React.Fragment>
                <h2>Tags</h2>
                <ul>
                  {product.tags.map((tag, index) => (
                    <Link
                      to={`/products?tag=${tag.tagSlug}`}
                      className={'product-review__prouct-tag'}
                      key={index}
                    >
                      <i className='bx bx-purchase-tag'></i>
                      <span>{tag.name}</span>
                    </Link>
                  ))}
                </ul>
              </React.Fragment>
            )}
          </div>

          {/* Product Description */}
          <div className='product-description'>
            <h2 className='product-description__title'>PRODUCT DETAILS</h2>

            <div className='ck-content'>
              {ReactHtmlParser(product.description)}
            </div>
          </div>

          {/* Product Reviews */}
          <div className='product-review col-12 col-sm-12'>
            <h2 className='product-review__title'>
              REVIEWS FROM OUR CUSTOMERS
            </h2>

            <div className='product-review__overview'>
              <div className='overview__rating-stars'>
                {renderRatingStars(product.averageRating)}
              </div>
              <div className='overview__rating-sub'>
                Rated {product.averageRating} over 5 stars{' '}
              </div>
              <div className='overview__num-reviews'>
                {product.numReviews > 1
                  ? `(${product.numReviews}) reviews`
                  : `(${product.numReviews}) review`}
              </div>
            </div>

            <div className='product-review__content'>
              {product.reviews.length === 0 && (
                <p className='review-card'>
                  Uh oh...! There are no comments on this product.
                </p>
              )}
              {product.reviews.map((review, index) => (
                <ReviewCard key={index} data={review} />
              ))}
            </div>

            {userInfo ? (
              <ProductReviews product={product} />
            ) : (
              <p className='product-review__signin'>
                <Link
                  to={`/signin?redirect=products/${product.category}/${product._id}`}
                  className='btn btn-primary'
                >
                  Please sign in to write a comment
                </Link>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
