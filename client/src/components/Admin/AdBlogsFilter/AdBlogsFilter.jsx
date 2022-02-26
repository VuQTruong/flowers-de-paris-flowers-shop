import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import { adGetAllBlogs } from '../../../features/blogs/ad-get-all-blogs';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function AdBlogsFilter() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const customNavigate = useCustomNavigate();

  const [searchBy, setSearchBy] = useState('title');
  const [searchValue, setSearchValue] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [limit, setLimit] = useState(10);

  const setFilters = () => {};

  useEffect(() => {
    window.scroll(0, 0);

    if (location.search) {
      // ?set up filters based on search query
      const queryObj = Object.fromEntries([...searchParams]);
      setFilters(queryObj);

      dispatch(adGetAllBlogs(searchParams.toString()));
    } else {
      dispatch(adGetAllBlogs(location.search));
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
      case 'title':
        return (
          <React.Fragment>
            <option value='desc'>Z - A</option>
            <option value='asc'>A - Z</option>
          </React.Fragment>
        );
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
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </React.Fragment>
        );
    }
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
          onChange={(e) => searchByHandler(e)}
        >
          <option value='title'>Title</option>
          <option value='tags'>Tags</option>
        </select>
      </div>

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

      <div className='dashboard__sort-field flex'>
        <label htmlFor='sortField'>
          <i className='bx bx-list-ul'></i>Sort by
        </label>
        <select
          id='sortField'
          className='dashboard__select-input'
          onChange={(e) => sortByHandler(e)}
        >
          <option value='createdAt'>Created Date</option>
          <option value='title'>Title</option>
          <option value='views'>Views</option>
        </select>
      </div>

      <div className='dashboard__sort-order flex'>
        <label htmlFor='sortOrder'>
          <i className='bx bx-sort'></i>Order by
        </label>
        <select
          id='sortOrder'
          className='dashboard__select-input'
          onChange={(e) => sortOrderHandler(e)}
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

export default AdBlogsFilter;
