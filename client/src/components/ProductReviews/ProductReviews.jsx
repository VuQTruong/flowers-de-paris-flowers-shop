import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../formik/FormikControl';
import * as Yup from 'yup';
import TagInput from '../TagInput/TagInput';

import swal from 'sweetalert2';
import Axios from '../../config/axios';

const formInitialValues = {
  title: '',
  content: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string(),
});

function ProductReviews(props) {
  const { product } = props;

  const [rating, setRating] = useState(3);
  const [tags, setTags] = useState([]);

  const reviewTagOptions = ['Affordable price', 'Quick delivery', 'Friendly'];

  const addReviewTag = (e) => {
    setTags([...tags, e.target.innerHTML]);
  };

  const removeReviewTag = (e) => {
    setTags(tags.filter((tag) => tag !== e.target.dataset.tag));
  };

  const submitReviewHandler = async (values) => {
    try {
      const reviewInfo = {
        ...values,
        rating,
        tags,
        product: product._id,
      };

      await Axios.post('/reviews', reviewInfo);

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
        <Form className='product-review__form'>
          <FormikControl
            control='input'
            type='input'
            name='title'
            label='Title'
            placeholder='comment title'
            labelClassName='product-review__form-label'
            icon='bx bx-edit'
          />

          <FormikControl
            control='textarea'
            name='content'
            label='Comment'
            placeholder='place holder'
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
            {reviewTagOptions.map((option, index) => (
              <div
                className={`product-review__tag ${
                  tags.includes(option) ? 'active' : ''
                }`}
                key={index}
              >
                <span onClick={addReviewTag}>{option}</span>
                <i
                  className='bx bx-x'
                  data-tag={option}
                  onClick={removeReviewTag}
                ></i>
              </div>
            ))}
          </div>

          <button className='btn btn-primary' type='submit'>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default ProductReviews;
