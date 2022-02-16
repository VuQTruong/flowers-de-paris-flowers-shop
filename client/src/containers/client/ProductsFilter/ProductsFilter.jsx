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
import {
  resetFilters,
  setColors,
  setPrice,
  setRating,
  setSize,
  setSortBy,
  setTags,
} from '../../../features/query/slice/query-slice';

function ProductsFilter() {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();
  const isFirstRun = useRef(true);

  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);

  const { loading } = useSelector((state) => state.allProducts);
  const { sortBy, price, tags, colors, size, rating, page } = useSelector(
    (state) => state.query
  );

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
        page,
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
  }, [colors, price, rating, size, sortBy, tags, page]);

  useEffect(() => {
    if (location.search) {
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);
    } else {
      dispatch(resetFilters());
    }

    isFirstRun.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const setFilters = (queryObj) => {
    // !sorting
    queryObj.sort && dispatch(setSortBy(queryObj.sort));

    // !price filter
    const priceObj = { low: null, high: null };
    queryObj['price[gt]'] && (priceObj.low = queryObj['price[gt]'] * 1);
    queryObj['price[lte]'] && (priceObj.high = queryObj['price[lte]'] * 1);
    dispatch(setPrice(priceObj));

    // !tags filter
    if (queryObj['tags']) {
      const tagsStr = queryObj['tags'].split(',').join(', ');
      dispatch(setTags(tagsStr));
    }

    // !colors filter
    if (queryObj['colors']) {
      const colorsArr = queryObj['colors'].split(',');
      dispatch(setColors(colorsArr));
    }

    // !size filter
    queryObj.size && dispatch(setSize(queryObj.size));

    // !rating filter
    queryObj['rating'] && dispatch(setRating(queryObj['rating'] * 1));
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

        <Sorting
          value={sortBy}
          onChange={(value) => dispatch(setSortBy(value))}
        />
        <PriceFilter
          value={price}
          onChange={(value) => dispatch(setPrice(value))}
        />
        <TagsFilter
          value={tags}
          onChange={(value) => dispatch(setTags(value))}
        />
        <ColorsFilter
          value={colors}
          onChange={(value) => dispatch(setColors(value))}
        />
        <SizeFilter
          value={size}
          onChange={(value) => dispatch(setSize(value))}
        />
        <RatingFilter
          value={rating}
          onChange={(value) => dispatch(setRating(value))}
        />
      </div>
    </div>
  );
}

export default ProductsFilter;
