import React, { useEffect, useState } from 'react';
import HomeSlide from '../../../components/HomeSlide/HomeSlide';
import HeartIcon from '../../../assets/icons/heart-bullet.png';
import DividerImg from '../../../assets/quote-images/divider.png';
import FeatureImg_1 from '../../../assets/features/feature_1.jpg';
import FeatureImg_2 from '../../../assets/features/feature_2.jpg';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Axios from '../../../config/axios';
import swal from 'sweetalert2';
import ProductSlide from '../../../components/ProductSlide/ProductSlide';
import BlogCard from '../../../components/BlogCard/BlogCard';

function Home() {
  const [productsArr, setProductsArr] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { layout } = useSelector((state) => state.config);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchProducts = async () => {
      try {
        const fetchPromises = layout.map((feature) => {
          return Axios.get(
            `/products?category=${feature.categorySlug}&limit=5`
          );
        });

        const promiseResults = await Promise.all(fetchPromises);

        const results = [];
        for (let result of promiseResults) {
          results.push(result.data.data.products);
        }

        setProductsArr(results);
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: error.response.data.message,
        });
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await Axios.get('/blogs?limit=3');

        setBlogs(data.data.blogs);
      } catch (error) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: error.response.data.message,
        });
      }
    };

    if (layout) {
      fetchProducts();
      fetchBlogs();
    }
  }, [layout]);

  const renderFeature = (feature, index) => {
    return (
      <section
        className={`product-slideshow ${
          feature.reverseLayout ? 'product-slideshow--reverse' : ''
        }`}
        key={feature._id}
      >
        <div className='product-cover'>
          <img
            src={feature.coverImage}
            alt='Bouquet Cover'
            className='product-cover__img'
          />
          <div className='product-cover__content'>
            <h2 className='product-cover__title'>{feature.category}</h2>
            {feature.title && <p>{feature.title}</p>}
            <Link
              to={`/products/${feature.categorySlug}`}
              className='btn btn-primary product-cover__btn'
            >
              See more
            </Link>
          </div>
        </div>
        <div className='product-slide'>
          {productsArr.length !== 0 && (
            <ProductSlide products={productsArr[index]} />
          )}
        </div>
      </section>
    );
  };

  const renderRestFeatures = () => {
    let features = [];

    for (let i = 2; i < layout.length; i++) {
      features.push(renderFeature(layout[i], i));
    }

    return features;
  };

  const renderBlogCards = () => {
    let blogCards = [];

    for (let i = 0; i < blogs.length; i++) {
      blogCards.push(
        <BlogCard
          key={blogs[i]._id}
          link={`/blogs/${blogs[i].slug}`}
          image={blogs[i].coverImage}
          title={blogs[i].title}
          summary={blogs[i].summary}
          date={Date.parse(blogs[i].createdAt)}
        />
      );
    }

    return blogCards;
  };

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
              Express Feelings To Your Beloved
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
      {layout && layout.length !== 0 && renderFeature(layout[0], 0)}

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
      {layout && layout.length !== 0 && renderFeature(layout[1], 1)}

      {/* Quote */}
      <section className='home-quote home-quote--bg-2'>
        <img src={DividerImg} alt='' className='home-quote__divider' />
        <p className='home-quote__content'>
          &ldquo; Let's make beautiful flowers a part of your life. &rdquo;
        </p>
      </section>

      {/* Product slides */}
      {layout && layout.length !== 0 && renderRestFeatures()}

      {/* Blog Section */}
      <section className='home-blog'>
        <h2 className='home-blog__title'>Discorver Our Blog</h2>

        {blogs && blogs.length !== 0 && (
          <div className='home-blog__content'>{renderBlogCards()}</div>
        )}
      </section>
    </main>
  );
}

export default Home;
