import React, { useState } from 'react';
import Slider from 'react-slick';
import ReactHtmlParser from 'react-html-parser';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

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

  const { slides } = useSelector((state) => state.config);

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
        {slides.map((slide, index) => {
          return (
            <div
              key={slide._id}
              className={`slide ${currentSlide === index ? 'active' : ''}`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className='slide__img'
              />
              <div className='slide__typo slide__typo--left'>
                <h2 className='slide__title slide__animate slide__animate-delay--1'>
                  {ReactHtmlParser(slide.title)}
                </h2>
                {slide.subTitle && (
                  <h3 className='slide__subtitle  slide__animate slide__animate-delay--2'>
                    {ReactHtmlParser(slide.subTitle)}
                  </h3>
                )}
                {slide.content && (
                  <p className='slide__content  slide__animate slide__animate-delay--3'>
                    {ReactHtmlParser(slide.content)}
                  </p>
                )}
                {slide.url && (
                  <div className='slide__animate slide__animate-delay--4'>
                    <Link to={slide.url} className='btn slide__btn'>
                      Explore Now
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default HomeSlide;
