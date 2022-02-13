import React from 'react';
import HomeSlide from '../../../components/HomeSlide/HomeSlide';
import HeartIcon from '../../../assets/icons/heart-bullet.png';
import DividerImg from '../../../assets/quote-images/divider.png';
import FeatureImg_1 from '../../../assets/features/feature_1.jpg';
import FeatureImg_2 from '../../../assets/features/feature_2.jpg';

function Home() {
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

      {/* Quote */}
      <section className='home-quote home-quote--bg-2'>
        <img src={DividerImg} alt='' className='home-quote__divider' />
        <p className='home-quote__content'>
          &ldquo; Let's make beautiful flowers a part of your life. &rdquo;
        </p>
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
