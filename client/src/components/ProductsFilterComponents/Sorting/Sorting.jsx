import React from 'react';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function Sorting({ value, onChange }) {
  const customNavigate = useCustomNavigate();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    onChange(value);

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
            value={value}
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
