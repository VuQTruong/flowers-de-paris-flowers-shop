import { useDispatch, useSelector } from 'react-redux';
import { setPrice, setPage } from '../../../features/query/slice/query-slice';

function PriceFilter() {
  const dispatch = useDispatch();
  const { price } = useSelector((state) => state.query);

  const onClickHandler = (price) => {
    dispatch(setPrice(price));
    dispatch(setPage(1));
  };

  return (
    <div className='filter-item filter-price'>
      <h2 className='filter-item__header'>Price</h2>
      <main className='filter-item__content flex col'>
        <p>Price Range</p>
        <ul className='filter-price'>
          <li
            className={`filter-price__item ${
              price.low === null && price.high === null ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: null, high: null })}
          >
            All products
          </li>
          <li
            className={`filter-price__item ${
              price.low === null && price.high === 100 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: null, high: 100 })}
          >
            Below $100
          </li>
          <li
            className={`filter-price__item ${
              price.low === 100 && price.high === 200 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 100, high: 200 })}
          >
            From $100 to $200
          </li>
          <li
            className={`filter-price__item ${
              price.low === 200 && price.high === 300 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 200, high: 300 })}
          >
            From $200 to $300
          </li>
          <li
            className={`filter-price__item ${
              price.low === 300 && price.high === 500 ? 'active' : ''
            }`}
            onClick={() => onClickHandler({ low: 300, high: 500 })}
          >
            From $300 to $500
          </li>
          <li
            className={`filter-price__item ${
              price.low === 500 && price.high === null ? 'active' : ''
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
