import React, { useState } from 'react';

function PriceFilter() {
  const [price, setPrice] = useState(0);

  const priceFilterHandler = () => {};

  return (
    <div className='filter-item filter-price'>
      <h2 className='filter-item__header'>Price</h2>
      <main className='filter-item__content flex col'>
        <p>Price Range</p>
        <ul className='filter-price'>
          <li
            className={`filter-price__item ${price === 0 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(0)}
          >
            All products
          </li>
          <li
            className={`filter-price__item ${price === 1 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(1, 0, 300000)}
          >
            Below $100
          </li>
          <li
            className={`filter-price__item ${price === 2 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(2, 300000, 500000)}
          >
            From $100 to $200
          </li>
          <li
            className={`filter-price__item ${price === 3 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(3, 500000, 800000)}
          >
            From $200 to $300
          </li>
          <li
            className={`filter-price__item ${price === 4 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(4, 800000, 1000000)}
          >
            From $300 to $500
          </li>
          <li
            className={`filter-price__item ${price === 5 ? 'active' : ''}`}
            onClick={() => priceFilterHandler(5, 1000000)}
          >
            Above $500
          </li>
        </ul>
      </main>
    </div>
  );
}

export default PriceFilter;
