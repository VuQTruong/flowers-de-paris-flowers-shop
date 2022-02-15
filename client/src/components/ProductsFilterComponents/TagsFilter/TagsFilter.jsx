import { useEffect, useState } from 'react';

function TagsFilter({ value, onChange }) {
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (value !== tags) {
      setTags(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className='btn btn-primary' onClick={() => onChange(tags)}>
          Apply
        </button>
      </main>
    </div>
  );
}

export default TagsFilter;
