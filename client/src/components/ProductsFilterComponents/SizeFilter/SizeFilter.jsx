import React from 'react';

function SizeFilter() {
  const sizeFilterHandler = (e) => {};

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Size</h2>
      <main className='filter-item__content flex col'>
        <div className='filter-size'>
          {/* <RadioButton
        id='all'
        name='size'
        value='all'
        checked={size === 'all'}
        onChange={sizeFilterHandler}
      /> */}
          <label htmlFor='all' data-size='All' className='filter__label-size'>
            All products
          </label>
        </div>
        <div className='filter-size'>
          {/* <RadioButton
        id='small'
        name='size'
        value='S'
        checked={size === 'S'}
        onChange={sizeFilterHandler}
      /> */}
          <label htmlFor='small' data-size='S' className='filter__label-size'>
            Small
          </label>
        </div>

        <div className='filter-size'>
          {/* <RadioButton
        id='medium'
        name='size'
        value='M'
        checked={size === 'M'}
        onChange={sizeFilterHandler}
      /> */}
          <label htmlFor='medium' data-size='M' className='filter__label-size'>
            Medium
          </label>
        </div>

        <div className='filter-size'>
          {/* <RadioButton
        id='large'
        name='size'
        value='L'
        checked={size === 'L'}
        onChange={sizeFilterHandler}
      /> */}
          <label htmlFor='large' data-size='L' className='filter__label-size'>
            Large
          </label>
        </div>
      </main>
    </div>
  );
}

export default SizeFilter;
