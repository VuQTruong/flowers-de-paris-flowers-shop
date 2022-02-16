import { useDispatch, useSelector } from 'react-redux';
import { setRating, setPage } from '../../../features/query/slice/query-slice';

function RatingFilter() {
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.query);

  const onClickHandler = (value) => {
    dispatch(setRating(value));
    dispatch(setPage(1));
  };

  return (
    <div className='filter-item'>
      <h2 className='filter-item__header'>Average Rating</h2>
      <main className='filter-item__content flex col'>
        <div
          className={`filter-rating ${rating === 0 ? 'active' : ''}`}
          onClick={() => onClickHandler(0)}
        >
          <span>All products</span>
        </div>

        <div
          className={`filter-rating ${rating === 5 ? 'active' : ''}`}
          onClick={() => onClickHandler(5)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <span>5 stars</span>
        </div>

        <div
          className={`filter-rating ${rating === 4 ? 'active' : ''}`}
          onClick={() => onClickHandler(4)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <span>4 stars</span>
        </div>

        <div
          className={`filter-rating ${rating === 3 ? 'active' : ''}`}
          onClick={() => onClickHandler(3)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
          <span>3 stars</span>
        </div>
      </main>
    </div>
  );
}

export default RatingFilter;
