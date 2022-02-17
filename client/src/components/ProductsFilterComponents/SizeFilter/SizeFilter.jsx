import useCustomNavigate from '../../../hooks/use-custom-navigate';

function SizeFilter({ value, onChange }) {
  const options = [
    { key: 'All products', value: 'All' },
    { key: 'Small', value: 'S' },
    { key: 'Medium', value: 'M' },
    { key: 'Large', value: 'L' },
  ];

  const customNavigate = useCustomNavigate();

  const onChangeHandler = (e) => {
    const value = e.target.value;
    onChange(value);

    if (value === 'All') {
      customNavigate({}, ['page', 'size']);
    } else {
      customNavigate(
        {
          size: value,
        },
        ['page']
      );
    }
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
                checked={value === option.value}
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
