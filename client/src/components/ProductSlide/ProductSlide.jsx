import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ProductCard from '../ProductCard/ProductCard';

function NextButton(props) {
  const { onClick } = props;
  return (
    <button
      className='product-slide__btn product-slide__btn--next'
      onClick={onClick}
    >
      <i className='bx bxs-chevron-right'></i>
    </button>
  );
}

function PrevButton(props) {
  const { onClick } = props;
  return (
    <button
      className='product-slide__btn product-slide__btn--prev'
      onClick={onClick}
    >
      <i className='bx bxs-chevron-left'></i>
    </button>
  );
}

function ProductSlide({ products }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    className: 'product-slide__content',
    nextArrow: <NextButton />,
    prevArrow: <PrevButton />,
    responsive: [
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <ProductCard data={product} key={product._id} />
      ))}
    </Slider>
  );
}

export default ProductSlide;
