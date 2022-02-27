import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { adGetAllOrders } from '../../../features/orders/ad-get-all-orders';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function AdOrderFilters() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const customNavigate = useCustomNavigate();

  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [limit, setLimit] = useState(10);

  const setFilters = (queryObj) => {
    // !search
    if (queryObj.orderId) {
      setSearchValue(queryObj.orderId);
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

      dispatch(adGetAllOrders(searchParams.toString()));
    } else {
      dispatch(adGetAllOrders(location.search));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search]);

  const searchHandler = () => {
    if (searchValue) {
      const queryObj = {};
      queryObj.orderId = searchValue;

      customNavigate(queryObj);
      setSearchValue('');
    } else {
      customNavigate({}, ['orderId']);
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

  const resultsLimitHandler = (e) => {
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
      case 'createdAt':
        return (
          <React.Fragment>
            <option value='desc'>Newest First</option>
            <option value='asc'>Oldest First</option>
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

  return (
    <div className='dashboard__filter flex'>
      <div className='dashboard__search'>
        <input
          type='text'
          className='dashboard__search-input'
          placeholder='Enter Order Id ...'
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
          <option value='totalPrice'>Price</option>
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
          <i className='bx bx-list-ul'></i>Results per page
        </label>
        <input
          type='text'
          className='dashboard__limit-input'
          placeholder='Limit ...'
          value={limit}
          onChange={(e) => resultsLimitHandler(e)}
        />
      </div>
    </div>
  );
}

export default AdOrderFilters;
