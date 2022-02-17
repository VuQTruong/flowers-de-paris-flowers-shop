import { useEffect, useState } from 'react';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function TagsFilter({ value, onChange }) {
  const customNavigate = useCustomNavigate();

  const [tags, setTags] = useState('');

  useEffect(() => {
    if (value !== tags) {
      setTags(value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const onApplyHandler = () => {
    onChange(tags);

    if (tags) {
      customNavigate(
        {
          tags: tags,
        },
        ['page']
      );
    } else {
      customNavigate({}, ['page', 'tags']);
    }
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
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className='btn btn-primary' onClick={onApplyHandler}>
          Apply
        </button>
      </main>
    </div>
  );
}

export default TagsFilter;
