import React from 'react';

function Sorting({ value, onChange }) {
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
            onChange={(e) => onChange(e.target.value)}
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
