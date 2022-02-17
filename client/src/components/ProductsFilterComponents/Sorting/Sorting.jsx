import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSortBy } from '../../../features/query/slice/query-slice';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function Sorting() {
  const dispatch = useDispatch();
  const customNavigate = useCustomNavigate();

  const { sortBy } = useSelector((state) => state.query);

  const onChangeHandler = (e) => {
    const value = e.target.value;
    dispatch(setSortBy(value));
    customNavigate(
      {
        sort: value,
      },
      ['page']
    );
  };

  return (
    <div className='filter-item'>
      <main className='filter-item__content flex col'>
        <div className='filter__sort-field flex'>
          <label htmlFor='sortField' className='filter__sort-title'>
            <i className='bx bx-list-ul'></i>Sort by
          </label>
          <select
            id='sortField'
            className='filter__select-input'
            value={sortBy}
            onChange={onChangeHandler}
          >
            <option value='-createdAt'>New Products</option>
            <option value='-price'>Price: high-low</option>
            <option value='price'>Price: low-high</option>
          </select>
        </div>
      </main>
    </div>
  );
}

export default Sorting;
