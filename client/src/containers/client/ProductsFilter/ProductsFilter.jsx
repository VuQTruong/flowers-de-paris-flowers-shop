import React, { useState } from 'react';
import { useEffect } from 'react';
import ColorsFilter from '../../../components/ProductsFilterComponents/ColorsFilter/ColorsFilter';
import PriceFilter from '../../../components/ProductsFilterComponents/PriceFilter/PriceFilter';
import RatingFilter from '../../../components/ProductsFilterComponents/RatingFilter/RatingFilter';
import SizeFilter from '../../../components/ProductsFilterComponents/SizeFilter/SizeFilter';
import Sorting from '../../../components/ProductsFilterComponents/Sorting/Sorting';
import TagsFilter from '../../../components/ProductsFilterComponents/TagsFilter/TagsFilter';
import querySerialize from '../../../utilities/querySerialize';

function ProductsFilter() {
  const [sortBy, setSortBy] = useState('-createdAt');
  const [price, setPrice] = useState({ low: null, high: null });
  const [tags, setTags] = useState('');
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState('All');
  const [rating, setRating] = useState(0);

  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);

  useEffect(() => {
    const query = querySerialize();

    console.log(query);
  }, [sortBy, price, tags, colors, size, rating]);

  const toggleFilterPanelHandler = (value) => {
    setToggleFilterPanel(value);

    if (value === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  return (
    <div>
      <button
        className='btn btn-primary filter-btn'
        onClick={() => toggleFilterPanelHandler(true)}
      >
        Filters
      </button>
      <div className={`filter-panel ${toggleFilterPanel ? 'active' : ''}`}>
        {/* Toggle Filter Panel on Mobile Mode */}
        <button
          className='btn btn-primary close-filter-btn'
          onClick={() => toggleFilterPanelHandler(false)}
        >
          Close
        </button>

        <Sorting value={sortBy} onChange={(value) => setSortBy(value)} />
        <PriceFilter value={price} onChange={(value) => setPrice(value)} />
        <TagsFilter value={tags} onChange={(value) => setTags(value)} />
        <ColorsFilter value={colors} onChange={(value) => setColors(value)} />
        <SizeFilter value={size} onChange={(value) => setSize(value)} />
        <RatingFilter value={rating} onChange={(value) => setRating(value)} />
      </div>
    </div>
  );
}

export default ProductsFilter;
