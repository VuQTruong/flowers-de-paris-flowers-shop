import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ColorsFilter from '../../../components/ProductsFilterComponents/ColorsFilter/ColorsFilter';
import PriceFilter from '../../../components/ProductsFilterComponents/PriceFilter/PriceFilter';
import RatingFilter from '../../../components/ProductsFilterComponents/RatingFilter/RatingFilter';
import SizeFilter from '../../../components/ProductsFilterComponents/SizeFilter/SizeFilter';
import Sorting from '../../../components/ProductsFilterComponents/Sorting/Sorting';
import TagsFilter from '../../../components/ProductsFilterComponents/TagsFilter/TagsFilter';
import querySerialize from '../../../utilities/querySerialize';
import { getAllProducts } from '../../../features/products/get-all-products';

function ProductsFilter() {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const isFirstRun = useRef(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [sortBy, setSortBy] = useState('-createdAt');
  const [price, setPrice] = useState({ low: null, high: null });
  const [tags, setTags] = useState('');
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState('All');
  const [rating, setRating] = useState(0);

  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);

  const { loading } = useSelector((state) => state.allProducts);

  const toggleFilterPanelHandler = (value) => {
    setToggleFilterPanel(value);

    if (value === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  useEffect(() => {
    // !if this is the first run, don't do anything and wait
    // !because the filters may be changed depending on location.search
    if (!isFirstRun.current) {
      const queryStr = querySerialize({
        sortBy,
        price,
        tags,
        colors,
        size,
        rating,
      });

      if (!loading) {
        if (categorySlug) {
          dispatch(getAllProducts(`categorySlug=${categorySlug}&${queryStr}`));
        } else {
          dispatch(getAllProducts(queryStr));
        }

        navigate(`${location.pathname}?${queryStr}`);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colors, price, rating, size, sortBy, tags]);

  useEffect(() => {
    if (location.search) {
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);
    } else {
      resetFilters();
    }

    isFirstRun.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

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
    queryObj.size && setSize(queryObj.size);

    // !rating filter
    queryObj['rating'] && setRating(queryObj['rating'] * 1);
  };

  const resetFilters = () => {
    setSortBy('-createdAt');
    setPrice({ low: null, high: null });
    setTags('');
    setColors([]);
    setSize('All');
    setRating(0);
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
