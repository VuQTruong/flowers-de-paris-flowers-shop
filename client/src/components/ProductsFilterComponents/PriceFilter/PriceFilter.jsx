function PriceFilter({ value, onChange }) {
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
            onClick={() => onChange({ low: null, high: null })}
          >
            All products
          </li>
          <li
            className={`filter-price__item ${
              value.low === 0 && value.high === 100 ? 'active' : ''
            }`}
            onClick={() => onChange({ low: 0, high: 100 })}
          >
            Below $100
          </li>
          <li
            className={`filter-price__item ${
              value.low === 100 && value.high === 200 ? 'active' : ''
            }`}
            onClick={() => onChange({ low: 100, high: 200 })}
          >
            From $100 to $200
          </li>
          <li
            className={`filter-price__item ${
              value.low === 200 && value.high === 300 ? 'active' : ''
            }`}
            onClick={() => onChange({ low: 200, high: 300 })}
          >
            From $200 to $300
          </li>
          <li
            className={`filter-price__item ${
              value.low === 300 && value.high === 500 ? 'active' : ''
            }`}
            onClick={() => onChange({ low: 300, high: 500 })}
          >
            From $300 to $500
          </li>
          <li
            className={`filter-price__item ${
              value.low === 500 && value.high === null ? 'active' : ''
            }`}
            onClick={() => onChange({ low: 500, high: null })}
          >
            Above $500
          </li>
        </ul>
      </main>
    </div>
  );
}

export default PriceFilter;
