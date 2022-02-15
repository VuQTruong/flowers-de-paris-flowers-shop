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
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPathname = useRef(location.pathname);

  const [sortBy, setSortBy] = useState('-createdAt');
  const [price, setPrice] = useState({ low: null, high: null });
  const [tags, setTags] = useState('');
  const [colors, setColors] = useState([]);
  const [size, setSize] = useState('All');
  const [rating, setRating] = useState(0);

  const [toggleFilterPanel, setToggleFilterPanel] = useState(false);

  const { loading } = useSelector((state) => state.allProducts);

  // !deserialize search query
  useEffect(() => {
    if (searchParams.toString()) {
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);

      let queryStr = searchParams.toString();

      console.log('dispatch with query');
      if (categorySlug) {
        queryStr = `categorySlug=${categorySlug}&${queryStr}`;
        dispatch(getAllProducts(queryStr));
      } else {
        dispatch(getAllProducts(queryStr));
      }
    } else {
      if (categorySlug) {
        const queryStr = `categorySlug=${categorySlug}`;
        dispatch(getAllProducts(queryStr));
      } else {
        dispatch(getAllProducts());
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // !serialize search query
  useEffect(() => {
    // !reset the filters if the pathname is changed (e.g. change to another category)
    if (currentPathname.current !== location.pathname) {
      resetFilters();
      console.log('reset');
      currentPathname.current = location.pathname;
    } else {
      const queryStr = querySerialize({
        sortBy,
        price,
        tags,
        colors,
        size,
        rating,
      });

      if (!loading) {
        if (queryStr) {
          console.log('navigate with query');
          // ?when the filters' value is changed and a new queryStr is generated
          // ?if the queryStr is the same, which make the url is the same
          // ?navigate will not be called
          navigate(`${location.pathname}?${queryStr}`);
        } else {
          console.log('navigate without query');
          navigate(location.pathname);
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy, price, tags, colors, size, rating, navigate]);

  const toggleFilterPanelHandler = (value) => {
    setToggleFilterPanel(value);

    if (value === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const resetFilters = () => {
    setSortBy('-createdAt');
    setPrice({ low: null, high: null });
    setTags('');
    setColors([]);
    setSize('All');
    setRating(0);
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
    queryObj.size && setSize(queryObj.size);

    // !rating filter
    queryObj['rating'] && setRating(queryObj['rating'] * 1);
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
