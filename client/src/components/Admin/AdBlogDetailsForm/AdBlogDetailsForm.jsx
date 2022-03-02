import React from 'react';
import ChipInput from '../../ChipInput/ChipInput';
import ImagesUploader from '../ImagesUploader/ImagesUploader';

function AdBlogForm(props) {
  const {
    title,
    setTitle,
    author,
    setAuthor,
    summary,
    setSummary,
    tags,
    setTags,
    isValid,
    newImageRef,
    deleteImage,
    setCover,
  } = props;

  return (
    <form className='ad-blog-details__form'>
      <div className='form-v2__control'>
        <label
          className='form-v2__label ad-blog-details__form-label'
          htmlFor='title'
        >
          Title
        </label>
        <div className='form-v2__input-box'>
          <i className='bx bx-box'></i>
          <input
            type='input'
            name='title'
            placeholder='title'
            className='form-v2__input--text'
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>

          {!isValid && !title && (
            <p className='form__error'>Title is missing</p>
          )}
        </div>
      </div>

      <div className='form-v2__control'>
        <label
          className='form-v2__label ad-blog-details__form-label'
          htmlFor='author'
        >
          Author
        </label>
        <div className='form-v2__input-box'>
          <i className='bx bx-user'></i>
          <input
            type='input'
            name='author'
            placeholder='author'
            className='form-v2__input--text'
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          ></input>

          {!isValid && !author && (
            <p className='form__error'>Author is missing</p>
          )}
        </div>
      </div>

      <div className='ad-blog-details__chip-container'>
        <ChipInput
          label='Tags'
          placeholder='type and hit enter'
          chips={tags}
          onUpdate={(newTags) => setTags(newTags)}
          labelClassname='ad-blog-details__form-label'
        />
      </div>

      <div className='form-v2__control flex-start'>
        <label
          className='form-v2__label ad-blog-details__form-label'
          htmlFor='summary'
        >
          Summary
        </label>
        <div className='form-v2__input-box flex-start'>
          <i className='bx bx-edit' style={{ top: '0.75em' }}></i>
          <textarea
            placeholder='summary'
            className='form-v2__input--textarea'
            name='summary'
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>

          {!isValid && !summary && (
            <p className='form__error'>Summary is missing</p>
          )}
        </div>
      </div>

      <div className='ad-blog-details__form-control'>
        <label htmlFor='imgUpload' className='ad-blog-details__form-label'>
          Cover Image
        </label>
        <ImagesUploader
          className='ad-blog-details__btn-upload'
          folderName='blogs'
          returnImages={async (values) => {
            // !delete the previous uploaded image before setting new one
            if (newImageRef.current) {
              await deleteImage(newImageRef.current);
            }

            // !store recently uploaded image to clear up in case the article information is not saved
            newImageRef.current = values[0];

            // !set image to be saved
            setCover(values[0]);
          }}
        />
      </div>
    </form>
  );
}

export default AdBlogForm;
