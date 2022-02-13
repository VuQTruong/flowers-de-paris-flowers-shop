import React, { useState } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextButton(props) {
  // const { className, style, onClick } = props;
  const { onClick } = props;
  return (
    <button className='home-slide__btn home-slide__btn--next' onClick={onClick}>
      <i className='bx bxs-chevron-right'></i>
    </button>
  );
}

function PrevButton(props) {
  // const { className, style, onClick } = props;
  const { onClick } = props;
  return (
    <button className='home-slide__btn home-slide__btn--prev' onClick={onClick}>
      <i className='bx bxs-chevron-left'></i>
    </button>
  );
}

function HomeSlide() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: true,
    className: 'home-slide',
    dotsClass: 'home-slide__dots',
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    afterChange: (current, next) => setCurrentSlide(current),
  };

  return (
    <div className='slide-container'>
      <Slider {...settings}>
        <div className={`slide ${currentSlide === 0 ? 'active' : ''}`}>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_6_t9hsfd.jpg'
            alt='Slide 6'
            className='slide__img'
          />
          <div className='slide__typo slide__typo--left'>
            <h2 className='slide__title slide__animate slide__animate-delay--1'>
              Be my <span className='emphasize'>Valentine!</span>
            </h2>
            <h3 className='slide__subtitle  slide__animate slide__animate-delay--2'>
              Express your <span className='emphasize'>Feelings</span>
            </h3>
            <p className='slide__content  slide__animate slide__animate-delay--3'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Totam,
              ut. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            </p>
            <div className='slide__animate slide__animate-delay--4'>
              <button className='btn slide__btn'>Explore Now</button>
            </div>
          </div>
        </div>

        <div className={`slide ${currentSlide === 1 ? 'active' : ''}`}>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_2_yx53ea.jpg'
            alt='Slide 2'
            className='slide__img'
          />
          <div className='slide__typo slide__typo--left'>
            <h2 className='slide__title slide__animate slide__animate-delay--1'>
              It's Your <span className='emphasize'>Special</span> Day!
            </h2>
            <h3 className='slide__subtitle slide__animate slide__animate-delay--2'>
              Be <span className='emphasize'>Together</span> for{' '}
              <span className='emphasize'>Life</span>
            </h3>
            <p className='slide__content slide__animate slide__animate-delay--3'>
              A special collection specifically for your{' '}
              <span className='emphasize'>
                <strong>meaningful</strong>
              </span>{' '}
              day
            </p>
            <div className='slide__animate slide__animate-delay--4'>
              <button className='btn slide__btn'>Explore Now</button>
            </div>
          </div>
        </div>

        <div className={`slide ${currentSlide === 2 ? 'active' : ''}`}>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_3_ln9b3v.jpg'
            alt='Slide 3'
            className='slide__img'
          />
          <div className='slide__typo slide__typo--left'>
            <h2 className='slide__title slide__animate slide__animate-delay--1'>
              Best way to say you <span className='emphasize'>Care</span>
            </h2>
            <h3 className='slide__subtitle slide__animate slide__animate-delay--2'>
              Sending <span className='emphasize'>Love</span>
            </h3>
            <p className='slide__content slide__animate slide__animate-delay--3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              eum mollitia molestiae, reiciendis amet voluptatem.
            </p>
            <div className='slide__animate slide__animate-delay--4'>
              <button className='btn slide__btn'>Explore Now</button>
            </div>
          </div>
        </div>

        <div className={`slide ${currentSlide === 3 ? 'active' : ''}`}>
          <img
            src='https://res.cloudinary.com/flowersdeparis/image/upload/v1644770230/slides/slide_4_t7ump6.jpg'
            alt='Slide 4'
            className='slide__img'
          />
          <div className='slide__typo slide__typo--left'>
            <h2 className='slide__title slide__animate slide__animate-delay--1'>
              Let's us arrange a <span className='emphasize'>Smile</span> for
              you
            </h2>
            <h3 className='slide__subtitle slide__animate slide__animate-delay--2'>
              Sending <span className='emphasize'>Love</span>
            </h3>
            <p className='slide__content slide__animate slide__animate-delay--3'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam
              eum mollitia molestiae, reiciendis amet voluptatem.
            </p>
            <div className='slide__animate slide__animate-delay--4'>
              <button className='btn slide__btn'>Explore Now</button>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HomeSlide;
