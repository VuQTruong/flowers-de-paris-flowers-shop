import React, { useEffect } from 'react';
import HomeSlide from '../../../components/HomeSlide/HomeSlide';
import HeartIcon from '../../../assets/icons/heart-bullet.png';
import DividerImg from '../../../assets/quote-images/divider.png';
import FeatureImg_1 from '../../../assets/features/feature_1.jpg';
import FeatureImg_2 from '../../../assets/features/feature_2.jpg';

import { Link } from 'react-router-dom';

function Home() {
  // Todo: Plan for improvement - Making the home page customizable
  // ?Create APIs that manage the configuration which define what slide images are and the categories to be shown
  // ?The format may in this form:
  // config = {
  //   slides: [{
  //     image: 'img-url',
  //     title: 'title',
  //     subTitile: 'sub-title',
  //     content: 'content',
  //     url: 'url-to-the-feature-if-there-is-one'
  //   }, ...],
  //   features: [{
  //     category: 'category-name', // for fetching products belong to the category
  //     categorySlug: 'slug',  //for linking to the category page
  //     summary: 'category-summary',
  //     reverseLayout: true/false // to place the cover image to left (defaul) or right
  //   }, ...]
  // }

  useEffect(() => {
    const fetchCategoriesData = async () => {};

    fetchCategoriesData();
  }, []);

  return (
    <main className='container home__container'>
      <HomeSlide className='home__home-slide' />

      <section className='home-features'>
        <div className='home-feature__item'>
          <img
            src={FeatureImg_1}
            alt='Feature 1'
            className='home-feature__img'
          />
          <div className='home-feature__content'>
            <h2 className='home-feature__title'>
              Sending <span className='emphasize'>Flowers</span>
            </h2>
            <h2 className='home-feature__subtitle'>
              Showing <span className='emphasize'>Love</span>
            </h2>
          </div>
        </div>

        <div className='home-feature__item'>
          <img
            src={FeatureImg_2}
            alt='Feature 2'
            className='home-feature__img'
          />
          <ul className='home-feature__content'>
            <li className='home-feature__list-item'>
              <img src={HeartIcon} alt='Heart Icon' />
              Express Feelings To Your Loved Ones
            </li>
            <li className='home-feature__list-item'>
              <img src={HeartIcon} alt='Heart Icon' />
              Beautiful Selective Flowers
            </li>
            <li className='home-feature__list-item'>
              <img src={HeartIcon} alt='Heart Icon' />
              Meaningful Gifts
            </li>
          </ul>
        </div>
      </section>

      {/* Product slides */}
      <section className='product-slideshow'>
        <div className='product-cover'>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644772905/features/bouquet-cover_pu0vj2.jpg'
            alt='Bouquet Cover'
            className='product-cover__img'
          />
          <div className='product-cover__content'>
            <h2 className='product-cover__title'>Bouquets</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, impedit.
            </p>
            <Link
              to='/products/bouquets'
              className='btn btn-primary product-cover__btn'
            >
              See more
            </Link>
          </div>
        </div>
        {/* {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <div className='product-slide'>{bouquets && <ProductSlide products={bouquets} />}</div>
        )} */}
      </section>

      {/* Quote */}
      <section className='home-quote home-quote--bg-1'>
        <img src={DividerImg} alt='' className='home-quote__divider' />
        <p className='home-quote__content'>
          &ldquo; Enough light flowers will rise,
        </p>
        <p className='home-quote__content'>Enough wind pinwheel will wheel,</p>
        <p className='home-quote__content'>
          Enough love happiness will fulfill. &rdquo;
        </p>
      </section>

      {/* Product slides */}
      <section className='product-slideshow product-slideshow--reverse'>
        <div className='product-cover'>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644772905/features/flowerbasket-cover_urfquj.jpg'
            alt='Flower Baskets Cover'
            className='product-cover__img'
          />
          <div className='product-cover__content'>
            <h2 className='product-cover__title'>Flower Baskets</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, impedit.
            </p>
            <Link
              to='/products/flowerbaskets'
              className='btn btn-primary  product-cover__btn'
            >
              See more
            </Link>
          </div>
        </div>
        {/* {loading ? (
          <Loading className='product-slide' />
        ) : error ? (
          <MessageBox variant='danger' className='product-slide'>
            {error}
          </MessageBox>
        ) : (
          <div className='product-slide'>
            {flowerbaskets && <ProductSlide products={flowerbaskets} />}
          </div>
        )} */}
      </section>

      {/* Quote */}
      <section className='home-quote home-quote--bg-2'>
        <img src={DividerImg} alt='' className='home-quote__divider' />
        <p className='home-quote__content'>
          &ldquo; Let's make beautiful flowers a part of your life. &rdquo;
        </p>
      </section>

      {/* Product slides */}
      <section className='product-slideshow'>
        <div className='product-cover'>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644772905/features/gift-cover_enp08u.jpg'
            alt='Gifts Cover'
            className='product-cover__img'
          />
          <div className='product-cover__content'>
            <h2 className='product-cover__title'>Gifts</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Pariatur, impedit.
            </p>
            <Link
              to='/products/gifts'
              className='btn btn-primary product-cover__btn'
            >
              See more
            </Link>
          </div>
        </div>
        {/* {loading ? (
          <Loading />
        ) : error ? (
          <MessageBox variant='danger'>{error}</MessageBox>
        ) : (
          <div className='product-slide'>{gifts && <ProductSlide products={gifts} />}</div>
        )} */}
      </section>

      {/* Blog Section */}
      <section className='home-blog'>
        <h2 className='home-blog__title'>Discorver Our Blog</h2>

        {/* {blogsLoading ? (
          <Loading />
        ) : blogsError ? (
          <MessageBox variant='danger'>{blogsError}</MessageBox>
        ) : (
          <div className='home-blog__content'>{renderBlogCards()}</div>
        )} */}
      </section>
    </main>
  );
}

export default Home;
