import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ImagesUploader from '../../../components/Admin/ImagesUploader/ImagesUploader';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getCategory } from '../../../features/categories/get-category';
import { Formik, Form } from 'formik';
import FormikControl from '../../../formik/FormikControl';
import { resetCurrentCategory } from '../../../features/categories/slices/current-category-slice';
import GalleryModal from '../../../components/GalleryModal/GalleryModal';
import ImagePreviewBox from '../../../components/Admin/ImagePreviewBox/ImagePreviewBox';
import Axios from '../../../config/axios';
import { getImageId, showLoadingModal } from '../../../utilities/helpers';
import swal from 'sweetalert2';

function AdCategoryDetails() {
  const { categoryId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSubmitted = useRef(false);
  const newImageRef = useRef('');
  const [cover, setCover] = useState('');
  const [images, setImages] = useState([]);

  const { category, loading, error } = useSelector(
    (state) => state.currentCategory
  );

  const initialValues = {
    name: (category && category.name) || '',
  };

  // !watch for the change of category to update the current state (cover, currentImages)
  useEffect(() => {
    if (categoryId && !category) {
      dispatch(getCategory(categoryId));
    }

    if (category) {
      setCover(category.coverImage);
      setImages([category.coverImage]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoryId, dispatch]);

  // !reset the currentCategory in store and delete images on Cloudinary if changes are not saved
  useEffect(() => {
    return () => {
      // !delete recently uploaded image if not save
      if (!isSubmitted.current && newImageRef.current) {
        deleteImage(newImageRef.current);
      }

      dispatch(resetCurrentCategory());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImage = async (image) => {
    const imageId = getImageId(image);
    await Axios.delete(`/files/cloud-images?folder=categories&id=${imageId}`);
  };

  const onSubmitHandler = async (values) => {
    try {
      showLoadingModal('Saving category info...');

      const categoryInfo = {
        name: values.name,
        coverImage: cover,
      };

      if (categoryId) {
        await Axios.patch(`/categories/${category._id}`, categoryInfo);
      } else {
        await Axios.post('/categories/', categoryInfo);
      }

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: categoryId
            ? `Category is updated successfully`
            : `Category is created successfully`,
        })
        .then(() => {
          if (category) {
            deleteImage(category.coverImage);
          }

          navigate('/admin/categories');
        });
      isSubmitted.current = true;
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <main className='dashboard__container'>
      <div className='dashboard__header'>
        <Link to='/admin/categories' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-arrow-back'></i>
          <span>Back</span>
        </Link>
        <h2 className='dashboard__title'>
          {categoryId ? 'Edit Category' : 'Create new category'}
        </h2>
      </div>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && !error && (
        <div className='container ad-category-details__container'>
          <div className='ad-category-details__image-uploader'>
            <ImagePreviewBox
              image={cover}
              className='ad-category-details__preview-cover'
            />
            <ImagesUploader
              folderName='categories'
              returnImages={async (images) => {
                // !delete the previous uploaded image before setting new one
                if (newImageRef.current) {
                  await deleteImage(cover);
                }

                // !store recently uploaded image to clear up in case the category information is not saved
                newImageRef.current = images[0];

                // !set image to be saved
                setCover(images[0]);
                setImages([...images]);
              }}
            />
            <GalleryModal images={images} />
          </div>

          <Formik
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form className='ad-category-details__form'>
                  <FormikControl
                    control='input'
                    type='input'
                    name='name'
                    label='Category Name'
                    placeholder='category name'
                    labelClassName='ad-category-details__form-label'
                    icon='bx bxs-category'
                  />

                  <button
                    className='btn btn-primary ad-category-details__form-btn'
                    type='submit'
                  >
                    Save
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
    </main>
  );
}

export default AdCategoryDetails;
