import React, { useState } from 'react';
import ColorsFilter from '../../../components/ProductsFilterComponents/ColorsFilter/ColorsFilter';
import PriceFilter from '../../../components/ProductsFilterComponents/PriceFilter/PriceFilter';
import RatingFilter from '../../../components/ProductsFilterComponents/RatingFilter/RatingFilter';
import SizeFilter from '../../../components/ProductsFilterComponents/SizeFilter/SizeFilter';
import Sorting from '../../../components/ProductsFilterComponents/Sorting/Sorting';
import TagsFilter from '../../../components/ProductsFilterComponents/TagsFilter/TagsFilter';

function ProductsFilter() {
  const [color, setColor] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [colorString, setColorString] = useState('');
  const [size, setSize] = useState('all');
  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);

  return (
    <div>
      <button
        className='btn btn-primary filter-btn'
        onClick={() => setToggleFilterPanel(true)}
      >
        Filters
      </button>
      <div className={`filter-panel ${toggleFilterPanel ? 'active' : ''}`}>
        {/* Toggle Filter Panel on Mobile Mode */}
        <button
          className='btn btn-primary close-filter-btn'
          onClick={() => setToggleFilterPanel(false)}
        >
          Close
        </button>

        <Sorting />
        <PriceFilter />
        <TagsFilter />
        <ColorsFilter />
        <SizeFilter />
        <RatingFilter />
      </div>
    </div>
  );
}

export default ProductsFilter;
