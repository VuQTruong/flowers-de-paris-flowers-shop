import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSize, setPage } from '../../../features/query/slice/query-slice';

function SizeFilter() {
  const options = [
    { key: 'All products', value: 'All' },
    { key: 'Small', value: 'S' },
    { key: 'Medium', value: 'M' },
    { key: 'Large', value: 'L' },
  ];

  const dispatch = useDispatch();
  const { size } = useSelector((state) => state.query);

  const onChangeHandler = (e) => {
    dispatch(setSize(e.target.value));
    dispatch(setPage(1));
  };

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Size</h2>

      <div className='filter-item__content flex col'>
        {options.map((option) => {
          return (
            <div className='filter-size' key={option.value}>
              <input
                type='radio'
                id={option.value}
                name='size'
                value={option.value}
                onChange={onChangeHandler}
                checked={size === option.value}
              />
              <label
                htmlFor={option.value}
                data-size={option.value}
                className='filter__label-size'
              >
                {option.key}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SizeFilter;
