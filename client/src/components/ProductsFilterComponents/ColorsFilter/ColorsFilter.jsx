import useCustomNavigate from '../../../hooks/use-custom-navigate';

function ColorFilter({ value, onChange }) {
  const options = [
    { key: 'Red', value: 'red' },
    { key: 'Orange', value: 'orange' },
    { key: 'Yellow', value: 'yellow' },
    { key: 'Green', value: 'green' },
    { key: 'Blue', value: 'blue' },
    { key: 'Violet', value: 'violet' },
    { key: 'White', value: 'white' },
  ];

  const customNavigate = useCustomNavigate();

  const colorChangeHandler = (color) => {
    if (color === 'clear') {
      onChange([]);
      customNavigate({}, ['page', 'colors']);
      return;
    }

    if (value.includes(color)) {
      const newColors = value.filter((item) => item !== color);
      onChange(newColors);
      customNavigate(
        {
          colors: newColors.join(','),
        },
        ['page']
      );
    } else {
      onChange([...value, color]);
      customNavigate(
        {
          colors: [...value, color].join(','),
        },
        ['page']
      );
    }
  };

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Colors</h2>
      <main className='filter-item__content flex col'>
        <div className='filter-color__options'>
          {options.map((option, index) => {
            return (
              <div className='filter-color' key={option.value}>
                <input
                  type='checkbox'
                  name={option.value}
                  id={option.value}
                  value={option.value}
                  data-index={index}
                  onChange={(e) => colorChangeHandler(e.target.value)}
                  checked={value.includes(option.value)}
                />
                <label
                  htmlFor={option.value}
                  style={{ '--filter-color-bg': `${option.value}` }}
                  className='filter__label-color'
                >
                  {option.key}
                </label>
              </div>
            );
          })}
        </div>

        <button
          className='btn btn-primary'
          onClick={() => colorChangeHandler('clear')}
        >
          Clear
        </button>
      </main>
    </div>
  );
}

export default ColorFilter;
