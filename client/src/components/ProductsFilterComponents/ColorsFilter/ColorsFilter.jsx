import { useDispatch, useSelector } from 'react-redux';
import { setColors, setPage } from '../../../features/query/slice/query-slice';

function ColorFilter() {
  const options = [
    { key: 'Red', value: 'red' },
    { key: 'Orange', value: 'orange' },
    { key: 'Yellow', value: 'yellow' },
    { key: 'Green', value: 'green' },
    { key: 'Blue', value: 'blue' },
    { key: 'Violet', value: 'violet' },
    { key: 'White', value: 'white' },
  ];

  const dispatch = useDispatch();
  const { colors } = useSelector((state) => state.query);

  const colorChangeHandler = (color) => {
    if (color === 'clear') {
      dispatch(setColors([]));
      return;
    }

    if (colors.includes(color)) {
      const newColors = colors.filter((item) => item !== color);
      dispatch(setColors(newColors));
    } else {
      dispatch(setColors([...colors, color]));
    }

    dispatch(setPage(1));
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
                  checked={colors.includes(option.value)}
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
