import React, { useState } from 'react';
import { useEffect } from 'react';
import { useParams, useLocation, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import ColorsFilter from '../../../components/ProductsFilterComponents/ColorsFilter/ColorsFilter';
import PriceFilter from '../../../components/ProductsFilterComponents/PriceFilter/PriceFilter';
import RatingFilter from '../../../components/ProductsFilterComponents/RatingFilter/RatingFilter';
// import SizeFilter from '../../../components/ProductsFilterComponents/SizeFilter/SizeFilter';
import Sorting from '../../../components/ProductsFilterComponents/Sorting/Sorting';
import TagsFilter from '../../../components/ProductsFilterComponents/TagsFilter/TagsFilter';
import { getAllProducts } from '../../../features/products/get-all-products';
import { getProductsByCategorySlug } from '../../../features/products/get-products-by-category-slug';

function ProductsFilter() {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);
  const [sortBy, setSortBy] = useState('-createdAt');
  const [price, setPrice] = useState({ low: null, high: null });
  const [tags, setTags] = useState('');
  const [colors, setColors] = useState([]);
  const [rating, setRating] = useState(0);
  // const [size, setSize] = useState('All');

  const toggleFilterPanelHandler = (value) => {
    setToggleFilterPanel(value);

    if (value === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const setFilters = (queryObj) => {
    // !sorting
    queryObj.sort && setSortBy(queryObj.sort);

    // !price filter
    const priceObj = { low: null, high: null };
    queryObj['price[gt]'] && (priceObj.low = queryObj['price[gt]'] * 1);
    queryObj['price[lte]'] && (priceObj.high = queryObj['price[lte]'] * 1);
    setPrice(priceObj);

    // !tags filter
    if (queryObj['tags']) {
      const tagsStr = queryObj['tags'].split(',').join(', ');
      setTags(tagsStr);
    }

    // !colors filter
    if (queryObj['colors']) {
      const colorsArr = queryObj['colors'].split(',');
      setColors(colorsArr);
    }

    // !size filter
    // queryObj.size && setSize(queryObj.size);

    // !rating filter
    queryObj['rating'] && setRating(queryObj['rating'] * 1);
  };

  // !dispatch action whenever the query string is changed
  useEffect(() => {
    window.scroll(0, 0);

    if (location.search) {
      // ?set up filters based on search query
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);

      // ?fetch products based on search query
      if (categorySlug) {
        dispatch(
          getAllProducts(`category=${categorySlug}&${searchParams.toString()}`)
        );
      } else {
        dispatch(getAllProducts(searchParams.toString()));
      }
    } else {
      // !reset filters
      setSortBy('-createdAt');
      setPrice({ low: null, high: null });
      setTags('');
      setColors([]);
      setRating(0);

      if (categorySlug) {
        dispatch(getProductsByCategorySlug(categorySlug));
      } else {
        dispatch(getAllProducts(location.search));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location]);

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
        {/* <SizeFilter value={size} onChange={(value) => setSize(value)} /> */}
        <RatingFilter value={rating} onChange={(value) => setRating(value)} />
      </div>
    </div>
  );
}

export default ProductsFilter;
