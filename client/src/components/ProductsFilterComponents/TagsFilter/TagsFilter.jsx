import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTags, setPage } from '../../../features/query/slice/query-slice';

function TagsFilter() {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.query);

  const [localTags, setLocalTags] = useState('');

  useEffect(() => {
    if (tags !== localTags) {
      setLocalTags(tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags]);

  const onApplyHandler = () => {
    dispatch(setTags(localTags));
    dispatch(setPage(1));
  };

  return (
    <div className='filter-item filter-flower'>
      <h2 className='filter-item__header'>Type of Flowers</h2>
      <main className='filter-item__content flex col'>
        <input
          type='text'
          name='filter-tag'
          id='filter-tag'
          className='filter-tag__input'
          placeholder='eg. rose, sunflower'
          value={localTags}
          onChange={(e) => setLocalTags(e.target.value)}
        />
        <button className='btn btn-primary' onClick={onApplyHandler}>
          Apply
        </button>
      </main>
    </div>
  );
}

export default TagsFilter;
