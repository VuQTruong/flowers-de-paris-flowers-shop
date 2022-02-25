import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { adGetAllProducts } from '../../../features/products/ad-get-all-products';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function AdProductsFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const customNavigate = useCustomNavigate();

  const [searchBy, setSearchBy] = useState('name');
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [limit, setLimit] = useState(10);

  const { categories } = useSelector((state) => state.allCategories);

  const setFilters = (queryObj) => {
    // !search
    if (queryObj.name) {
      setSearchBy('name');
      setSearchValue(queryObj.name);
    }

    if (queryObj.category) {
      setSearchBy('category');
      setSearchValue(queryObj.category);
    }

    if (queryObj['tags']) {
      const tagsStr = queryObj['tags'].split(',').join(', ');
      setSearchBy('tags');
      setSearchValue(tagsStr);
    }

    // !sort
    if (queryObj.sort) {
      const sortFieldValue = queryObj.sort;
      setSortField(sortFieldValue.replace('-', ''));

      sortFieldValue.startsWith('-')
        ? setSortOrder('desc')
        : setSortOrder('asc');
    }

    // !products limit
    queryObj.limit && setLimit(queryObj.limit);
  };

  useEffect(() => {
    window.scroll(0, 0);

    if (location.search) {
      // ?set up filters based on search query
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);

      dispatch(adGetAllProducts(searchParams.toString()));
    } else {
      dispatch(adGetAllProducts(location.search));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search]);

  const searchByHandler = (e) => {
    const value = e.target.value;
    const prevSearchBy = searchBy;
    setSearchBy(value);
    setSearchValue('');

    customNavigate({}, [prevSearchBy]);
  };

  const searchHandler = () => {
    if (searchValue) {
      const queryObj = {};
      queryObj[searchBy] = searchValue.split(', ').join(',');

      customNavigate(queryObj);
      setSearchValue('');
    } else {
      customNavigate({}, [searchBy]);
    }
  };

  const sortByHandler = (e) => {
    const value = e.target.value;
    setSortField(value);

    if (sortOrder === 'asc') {
      customNavigate(
        {
          sort: value,
        },
        ['page']
      );
    } else if (sortOrder === 'desc') {
      customNavigate(
        {
          sort: `-${value}`,
        },
        ['page']
      );
    }
  };

  const sortOrderHandler = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    if (value === 'asc') {
      customNavigate(
        {
          sort: sortField,
        },
        ['page']
      );
    } else if (value === 'desc') {
      customNavigate(
        {
          sort: `-${sortField}`,
        },
        ['page']
      );
    }
  };

  const productsLimitHandler = (e) => {
    const value = e.target.value;
    setLimit(value);

    customNavigate(
      {
        limit: value,
      },
      ['page']
    );
  };

  const renderSortOrder = () => {
    switch (sortField) {
      case 'name':
        return (
          <React.Fragment>
            <option value='desc'>Z - A</option>
            <option value='asc'>A - Z</option>
          </React.Fragment>
        );
      case 'createdAt':
        return (
          <React.Fragment>
            <option value='desc'>Newest first</option>
            <option value='asc'>Oldest first</option>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <option value='desc'>Decending</option>
            <option value='asc'>Ascending</option>
          </React.Fragment>
        );
    }
  };

  const renderCategoryOptions = () => {
    let options = [];

    let option = (
      <option key='0' value='all'>
        All
      </option>
    );
    options.push(option);

    if (categories && categories.length !== 0) {
      categories.forEach((item, index) => {
        let option = (
          <option key={index + 1} value={item.slug}>
            {item.name}
          </option>
        );
        options.push(option);
      });
    }

    return options;
  };

  return (
    <div className='dashboard__filter flex'>
      <div className='dashboard__search-by flex'>
        <label htmlFor='sortField'>
          <i className='bx bx-target-lock'></i>Search by
        </label>
        <select
          id='sortField'
          className='dashboard__select-input'
          value={searchBy}
          onChange={(e) => searchByHandler(e)}
        >
          <option value='name'>Name</option>
          <option value='category'>Category</option>
          <option value='tags'>Tags</option>
        </select>
      </div>

      {searchBy !== 'category' && (
        <div className='dashboard__search'>
          <input
            type='text'
            className='dashboard__search-input'
            placeholder='Search ...'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                searchHandler();
              }
            }}
          />
          <button className='dashboard__search-btn' onClick={searchHandler}>
            <i className='bx bx-search-alt'></i>
          </button>
        </div>
      )}

      {searchBy === 'category' && (
        <div className='dashboard__search'>
          <select
            id='sortOrder'
            className='dashboard__search-input'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          >
            {renderCategoryOptions()}
          </select>
          <button className='dashboard__search-btn' onClick={searchHandler}>
            <i className='bx bx-search-alt'></i>
          </button>
        </div>
      )}

      <div className='dashboard__sort-field flex'>
        <label htmlFor='sortField'>
          <i className='bx bx-list-ul'></i>Sort By
        </label>
        <select
          id='sortField'
          className='dashboard__select-input'
          value={sortField}
          onChange={(e) => {
            sortByHandler(e);
          }}
        >
          <option value='createdAt'>Created Date</option>
          <option value='price'>Price</option>
          <option value='name'>Alphabet</option>
        </select>
      </div>

      <div className='dashboard__sort-order flex'>
        <label htmlFor='sortOrder'>
          <i className='bx bx-sort'></i>Order by
        </label>
        <select
          id='sortOrder'
          className='dashboard__select-input'
          value={sortOrder}
          onChange={(e) => {
            sortOrderHandler(e);
          }}
        >
          {renderSortOrder()}
        </select>
      </div>

      <div className='dashboard__limit flex'>
        <label htmlFor='productsLimit'>
          <i className='bx bx-list-ul'></i>Products per page
        </label>
        <input
          type='text'
          className='dashboard__limit-input'
          placeholder='Search ...'
          value={limit}
          onChange={(e) => productsLimitHandler(e)}
        />
      </div>
    </div>
  );
}

export default AdProductsFilter;
