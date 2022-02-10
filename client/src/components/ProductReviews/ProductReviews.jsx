import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../formik/FormikControl';
import * as Yup from 'yup';
import TagInput from '../TagInput/TagInput';
import { useDispatch, useSelector } from 'react-redux';

import swal from 'sweetalert2';
import Axios from '../../config/axios';
import { fetchTags } from '../../features/reviews/fetch-tags';

const formInitialValues = {
  title: '',
  content: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(),
});

function ProductReviews(props) {
  const { product, onChange } = props;
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(3);
  const [tags, setTags] = useState([]);

  const commentTags = useSelector((state) => state.commentTags);
  const { tags: commentTagsOptions } = commentTags;

  useEffect(() => {
    if (!commentTagsOptions) {
      dispatch(fetchTags());
    }
  }, [commentTagsOptions, dispatch]);

  const addReviewTag = (e) => {
    setTags([...tags, e.target.innerHTML]);
  };

  const removeReviewTag = (e) => {
    setTags(tags.filter((tag) => tag !== e.target.dataset.tag));
  };

  const submitReviewHandler = async (values, { resetForm }) => {
    try {
      const reviewInfo = {
        ...values,
        rating,
        tags,
        product: product._id,
      };

      setLoading(true);
      const { data } = await Axios.post('/reviews', reviewInfo);

      // reset the form after submitting successfully
      resetForm();
      setTags([]);

      // update the list of reviews locally for instant view
      onChange(data.data.review);

      setLoading(false);

      swal.fire({
        icon: 'success',
        title: 'Awesome!...',
        text: 'Thank you for giving your feedback on this product!',
      });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
      setLoading(false);
    }
  };

  return (
    <div className='product-review__input'>
      <h2 className='product-review__header'>Product Review</h2>
      <div className='product-review__rating'>
        <div
          className={`product-review__rating-stars ${
            rating === 5 ? 'active' : ''
          }`}
          onClick={() => setRating(5)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
        </div>
        <div
          className={`product-review__rating-stars ${
            rating === 4 ? 'active' : ''
          }`}
          onClick={() => setRating(4)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
        </div>
        <div
          className={`product-review__rating-stars ${
            rating === 3 ? 'active' : ''
          }`}
          onClick={() => setRating(3)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
        </div>
        <div
          className={`product-review__rating-stars ${
            rating === 2 ? 'active' : ''
          }`}
          onClick={() => setRating(2)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
        </div>
        <div
          className={`product-review__rating-stars ${
            rating === 1 ? 'active' : ''
          }`}
          onClick={() => setRating(1)}
        >
          <i className='bx bxs-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
          <i className='bx bx-star'></i>
        </div>
      </div>

      <Formik
        initialValues={formInitialValues}
        validationSchema={validationSchema}
        onSubmit={submitReviewHandler}
      >
        {(formik) => {
          return (
            <Form className='product-review__form'>
              <FormikControl
                control='input'
                type='input'
                name='title'
                label='Title(*)'
                placeholder='comment title (required)'
                labelClassName='product-review__form-label'
                icon='bx bx-edit'
              />

              <FormikControl
                control='textarea'
                name='content'
                label='Comment'
                placeholder='review content (optional)'
                labelClassName='product-review__form-label'
                icon='bx bx-comment-detail'
              />

              <TagInput
                label='Tags'
                placeholder='type and press enter'
                tags={tags}
                onUpdate={(newTags) => setTags(newTags)}
                labelClassname='product-review__form-label'
              />

              <div className='product-review__tag-input'>
                {commentTagsOptions &&
                  commentTagsOptions.map((option, index) => (
                    <div
                      className={`product-review__tag ${
                        tags.includes(option.tag) ? 'active' : ''
                      }`}
                      key={index}
                    >
                      <span onClick={addReviewTag}>{option.tag}</span>
                      <i
                        className='bx bx-x'
                        data-tag={option.tag}
                        onClick={removeReviewTag}
                      ></i>
                    </div>
                  ))}
              </div>

              <button
                className='btn btn-primary product-review__btn-submit'
                type='submit'
                disabled={loading || !formik.isValid}
              >
                {loading ? (
                  <i className='bx bx-loader-alt bx-spin bx-rotate-90'></i>
                ) : (
                  'Submit'
                )}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default ProductReviews;
