import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import {
  currencyFormat,
  renderRatingStars,
  roundHalf,
} from '../../../utilities/helpers';
import ReactHtmlParser from 'react-html-parser';
import ReviewCard from '../../../components/ReviewCard/ReviewCard';
import { getProductBySlug } from '../../../features/products/get-product-by-slug';

import { ReactComponent as Page404SVG } from '../../../assets/svgs/undraw_lost_re_xqjt.svg';
import ProductReviews from '../../../components/ProductReviews/ProductReviews';
import { addItemToCart } from '../../../features/cart/add-item';
import { unwrapResult } from '@reduxjs/toolkit';
import swal from 'sweetalert2';
import BreadCrumb from '../../../components/BreadCrumb/BreadCrumb';

function ProductDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productSlug } = useParams();

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [reviews, setReviews] = useState([]);

  const currentProduct = useSelector((state) => state.currentProduct);
  const { product, loading } = currentProduct;

  const { userInfo } = useSelector((state) => state.currentUser);

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getProductBySlug(productSlug));
  }, [dispatch, productSlug]);

  useEffect(() => {
    if (product) {
      setReviews(product.reviews);
    }
  }, [navigate, product]);

  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const selectImageHandler = (index) => {
    setSelectedImage(index);
  };

  const calculateAverageRating = () => {
    const totalRating = reviews.reduce((accumulator, review) => {
      return review.rating + accumulator;
    }, 0);

    if (reviews.length !== 0) {
      const rating = roundHalf(totalRating / reviews.length);
      return rating;
    } else {
      return 0;
    }
  };

  const addToCartHandler = async () => {
    try {
      const actionResult = await dispatch(addItemToCart({ product, quantity }));
      unwrapResult(actionResult);

      swal.fire({
        icon: 'success',
        title: `Yay!..`,
        text: `${product.name} is added to your cart!`,
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.message,
      });
    }
  };

  return (
    <div className='container product-details__container'>
      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {!product ? (
            <main className='container flex col center notfound__container'>
              <Page404SVG className='notfound__svg' />
              <h2 className='notfound__title'>
                Sorry! We cannot find this product
              </h2>
              <Link to='/' className='notfound__back-home'>
                <i className='bx bx-home'></i>
                Go back to Home page
              </Link>
            </main>
          ) : (
            <React.Fragment>
              <BreadCrumb />

              <div className='product-details flex'>
                {/* Product Images */}
                <div className='product-images flex col col-5'>
                  <div className='image-box'>
                    <img
                      src={product.images[selectedImage]}
                      alt={product.name}
                    />
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
                  {product.saleOffPrice !== 0 ? (
                    <React.Fragment>
                      <span className='product-price inactive'>
                        <strike>
                          {currencyFormat.format(product.originalPrice)}
                        </strike>
                      </span>

                      <span className='product-price'>
                        {currencyFormat.format(product.saleOffPrice)}
                      </span>
                    </React.Fragment>
                  ) : (
                    <p className='product-price'>
                      {currencyFormat.format(product.price * quantity)}
                    </p>
                  )}

                  <h3>Decriptions</h3>
                  <div className='ck-content'>
                    {ReactHtmlParser(product.summary)}
                  </div>

                  <div className='quantity-selector flex'>
                    <button onClick={decreaseQuantity} className='btn btn-qty'>
                      <i className='bx bx-minus'></i>
                    </button>
                    <input
                      type='text'
                      value={quantity}
                      className='quantity-value'
                      readOnly
                    ></input>
                    <button onClick={increaseQuantity} className='btn btn-qty'>
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
                            to={`/search?tags=${product.tagSlugs[index]}`}
                            className={'product-review__product-tag'}
                            key={index}
                          >
                            <i className='bx bx-purchase-tag'></i>
                            <span>{tag}</span>
                          </Link>
                        ))}
                      </ul>
                    </React.Fragment>
                  )}
                </div>

                {/* Product Description */}
                <div className='product-description'>
                  <h2 className='product-description__title'>
                    PRODUCT DETAILS
                  </h2>

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
                      {renderRatingStars(calculateAverageRating())}
                    </div>
                    <div className='overview__rating-sub'>
                      {reviews.length === 0
                        ? 'There are no ratings on this product'
                        : `Rated ${calculateAverageRating()} over 5 stars`}
                    </div>
                    <div className='overview__num-reviews'>
                      {reviews.length > 1
                        ? `(${reviews.length}) reviews`
                        : `(${reviews.length}) review`}
                    </div>
                  </div>

                  <div className='product-review__content'>
                    {reviews.length === 0 ? (
                      <p className='review-card'>
                        Uh oh...! There are no comments on this product.
                      </p>
                    ) : (
                      <React.Fragment>
                        {reviews.map((review, index) => (
                          <ReviewCard
                            key={index}
                            data={review}
                            onChange={(reviewId) => {
                              const newReviews = reviews.filter((review) => {
                                return review._id !== reviewId;
                              });

                              setReviews(newReviews);
                            }}
                          />
                        ))}
                      </React.Fragment>
                    )}
                  </div>

                  {userInfo ? (
                    <ProductReviews
                      product={product}
                      onChange={(newReview) =>
                        setReviews([newReview, ...reviews])
                      }
                    />
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
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default ProductDetails;
