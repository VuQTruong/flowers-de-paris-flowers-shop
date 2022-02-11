import React from 'react';

function ColorFilter() {
  const colorFilterHandler = (e) => {};
  const removeColorFilterHandler = () => {};

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Colors</h2>
      <main className='filter-item__content flex col'>
        <div className='filter-color__options'>
          <div className='filter-color'>
            {/* <Checkbox
          id='red'
          name='red'
          value='đỏ'
          data-index='0'
          onChange={colorFilterHandler}
          checked={colorString.includes('đỏ') ? true : false}
        /> */}
            <label
              htmlFor='red'
              style={{ '--filter-color-bg': 'orangered' }}
              className='filter__label-color'
            >
              Red
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='orange'
          name='orange'
          value='cam'
          data-index='1'
          onChange={colorFilterHandler}
          checked={colorString.includes('cam') ? true : false}
        /> */}
            <label
              htmlFor='orange'
              style={{ '--filter-color-bg': 'orange' }}
              className='filter__label-color'
            >
              Orange
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='yellow'
          name='yellow'
          value='vàng'
          data-index='2'
          onChange={colorFilterHandler}
          checked={colorString.includes('vàng') ? true : false}
        /> */}
            <label
              htmlFor='yellow'
              style={{ '--filter-color-bg': 'yellow' }}
              className='filter__label-color'
            >
              Yellow
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='green'
          name='green'
          value='lục'
          data-index='3'
          onChange={colorFilterHandler}
          checked={colorString.includes('lục') ? true : false}
        /> */}
            <label
              htmlFor='green'
              style={{ '--filter-color-bg': 'green' }}
              className='filter__label-color'
            >
              Green
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='blue'
          name='blue'
          value='lam'
          data-index='4'
          onChange={colorFilterHandler}
          checked={colorString.includes('lam') ? true : false}
        /> */}
            <label
              htmlFor='blue'
              style={{ '--filter-color-bg': 'blue' }}
              className='filter__label-color'
            >
              Blue
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='violet'
          name='violet'
          value='tím'
          data-index='5'
          onChange={colorFilterHandler}
          checked={colorString.includes('tím') ? true : false}
        /> */}
            <label
              htmlFor='violet'
              style={{ '--filter-color-bg': 'violet' }}
              className='filter__label-color'
            >
              Purple
            </label>
          </div>

          <div className='filter-color'>
            {/* <Checkbox
          id='white'
          name='white'
          value='trắng'
          data-index='6'
          onChange={colorFilterHandler}
          checked={colorString.includes('trắng') ? true : false}
        /> */}
            <label
              htmlFor='white'
              style={{ '--filter-color-bg': 'white' }}
              className='filter__label-color'
            >
              White
            </label>
          </div>
        </div>

        <button className='btn btn-primary' onClick={removeColorFilterHandler}>
          Clear
        </button>
      </main>
    </div>
  );
}

export default ColorFilter;
