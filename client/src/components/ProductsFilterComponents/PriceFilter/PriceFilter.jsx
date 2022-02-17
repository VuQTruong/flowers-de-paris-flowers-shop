import useCustomNavigate from '../../../hooks/use-custom-navigate';

function PriceFilter({ value, onChange }) {
  const customNavigate = useCustomNavigate();

  const onClickHandler = (price) => {
    onChange(price);

    if (price.low && price.high) {
      customNavigate(
        {
          'price[gt]': price.low,
          'price[lte]': price.high,
        },
        ['page']
      );
    } else if (price.low) {
      customNavigate(
        {
          'price[gt]': price.low,
        },
        ['price[lte]', 'page']
      );
    } else if (price.high) {
      customNavigate(
        {
          'price[lte]': price.high,
        },
        ['price[gt]', 'page']
      );
    } else {
      customNavigate({}, ['price[gt]', 'price[lte]']);
    }
  };

  return (
    <div className='filter-item filter-price'>
      <h2 className='filter-item__header'>Price</h2>
      <main className='filter-item__content flex col'>
        <p>Price Range</p>
        <ul className='filter-price'>
          <li
            className={`filter-price__item ${
              value.low === null && value.high === null ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: null, high: null })}
          >
            All products
          </li>
          <li
            className={`filter-price__item ${
              value.low === null && value.high === 100 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: null, high: 100 })}
          >
            Below $100
          </li>
          <li
            className={`filter-price__item ${
              value.low === 100 && value.high === 200 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 100, high: 200 })}
          >
            From $100 to $200
          </li>
          <li
            className={`filter-price__item ${
              value.low === 200 && value.high === 300 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 200, high: 300 })}
          >
            From $200 to $300
          </li>
          <li
            className={`filter-price__item ${
              value.low === 300 && value.high === 500 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 300, high: 500 })}
          >
            From $300 to $500
          </li>
          <li
            className={`filter-price__item ${
              value.low === 500 && value.high === null ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 500, high: null })}
          >
            Above $500
          </li>
        </ul>
      </main>
    </div>
  );
}

export default PriceFilter;
