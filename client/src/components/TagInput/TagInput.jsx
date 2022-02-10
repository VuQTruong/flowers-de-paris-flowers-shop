import React, { useState } from 'react';

/* Usage */
/*
    <TagInput
        label=''
        placeholder=''
        tags={tags}
        onUpdate={(newTagsArray) => setTags(newTagsArray)}
        labelClassname='label className to modify label's styles'
        inputClassname=''
        icon=''
    />

    !an array state that manage the tags
    const [tags, setTags] = useState([]);
*/

function TagInput(props) {
  const { label, placeholder, tags, onUpdate, labelClassname, icon } = props;

  const [tagInput, setTagInput] = useState('');

  const removeTag = (tagName) => {
    const newTagsArray = tags.filter((tag) => tag !== tagName);
    onUpdate(newTagsArray);
  };

  const editTags = (e) => {
    if (e.key === 'Enter' && tagInput !== '') {
      if (tagInput !== '' && !tags.includes(tagInput)) {
        const newTagsArray = [...tags, tagInput];
        onUpdate(newTagsArray);
      }
      setTagInput('');
    }

    if (e.key === 'Backspace' && tagInput === '') {
      if (tags.length !== 0) {
        const newTagsArray = [...tags];
        newTagsArray.pop();
        onUpdate(newTagsArray);
      }
    }
  };

  const onKeyPressHandler = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className='tag-input__control flex-start'>
      <label htmlFor='tag' className={labelClassname}>
        {label}
      </label>
      <div
        className={`tag-input__input-box ${
          labelClassname ? labelClassname : ''
        }`}
      >
        <i className={icon ? icon : 'bx bx-purchase-tag'}></i>
        <ul className='tag-input__tag-list'>
          {tags.map((tag, index) => (
            <li className={`tag-input__tag-item`} key={index}>
              <span>{tag}</span>
              <i
                className='bx bx-x'
                data-tag={tag}
                onClick={() => removeTag(tag)}
              ></i>
            </li>
          ))}
        </ul>

        <input
          name='tag'
          id='tag'
          placeholder={placeholder}
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyUp={editTags}
          onKeyPress={onKeyPressHandler}
          autoComplete='off'
          className='tag-input__input'
        />
      </div>
    </div>
  );
}

export default TagInput;
