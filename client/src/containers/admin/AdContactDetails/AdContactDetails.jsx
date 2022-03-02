import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getContact } from '../../../features/contact/get-contact';
import { Formik, Form } from 'formik';
import FormikControl from '../../../formik/FormikControl';
import * as Yup from 'yup';
import Axios from '../../../config/axios';
import { getImageId, showLoadingModal } from '../../../utilities/helpers';
import { resetCurrentContact } from '../../../features/contact/slice/current-contact-slice';
import swal from 'sweetalert2';
import GalleryModal from '../../../components/GalleryModal/GalleryModal';
import ImagesUploader from '../../../components/Admin/ImagesUploader/ImagesUploader';
import ImagePreviewBox from '../../../components/Admin/ImagePreviewBox/ImagePreviewBox';

const validationSchema = Yup.object({
  name: Yup.string().required('Name is missing'),
  description: Yup.string().required('Description is missing'),
  phone: Yup.string().required('Phone is missing'),
  address: Yup.string().required('Address is missing'),
});

function AdContactDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactId } = useParams();

  const isSubmitted = useRef(false);
  const newImageRef = useRef('');
  const [cover, setCover] = useState('');
  const [images, setImages] = useState([]);

  const { contact, loading, error } = useSelector(
    (state) => state.currentContact
  );

  const initialValues = {
    name: (contact && contact.name) || '',
    description: (contact && contact.description) || '',
    phone: (contact && contact.phone) || '',
    address: (contact && contact.address) || '',
  };

  useEffect(() => {
    if (contactId && !contact) {
      dispatch(getContact(contactId));
    }

    if (contact) {
      setCover(contact.coverImage);
      setImages([contact.coverImage]);
    }
  }, [contact, contactId, dispatch]);

  // !reset the currentContact in store and delete images on Cloudinary if changes are not saved
  useEffect(() => {
    return () => {
      // !delete recently uploaded image if not save
      if (!isSubmitted.current && newImageRef.current) {
        deleteImage(newImageRef.current);
      }

      dispatch(resetCurrentContact());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImage = async (image) => {
    const imageId = getImageId(image);
    await Axios.delete(`/files/cloud-images?folder=contacts&id=${imageId}`);
  };

  const onSubmitHandler = async (values) => {
    if (!cover) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: `Branch's image is missing`,
      });
      return;
    }

    try {
      showLoadingModal('Saving contact info...');

      const contactInfo = {
        name: values.name,
        description: values.description,
        phone: values.phone,
        address: values.address,
        coverImage: cover,
      };

      if (contactId) {
        await Axios.patch(`/contacts/${contact._id}`, contactInfo);
      } else {
        await Axios.post('/contacts/', contactInfo);
      }

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: contactId
            ? `Contact is updated successfully`
            : `Contact is created successfully`,
        })
        .then(() => {
          if (contact) {
            deleteImage(contact.coverImage);
          }

          navigate('/admin/contacts');
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
        <Link to='/admin/contacts' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-arrow-back'></i>
          <span>Back</span>
        </Link>
        <h2 className='dashboard__title'>
          {contactId ? 'Edit Contact' : 'Create new contact'}
        </h2>
      </div>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && !error && (
        <div className='container ad-contact-details__container'>
          <div className='ad-contact-details__image-uploader'>
            <ImagePreviewBox
              image={cover}
              className='ad-contact-details__preview-cover'
            />
            <ImagesUploader
              folderName='contacts'
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
            validationSchema={validationSchema}
            enableReinitialize
          >
            {(formik) => {
              return (
                <Form className='ad-contact-details__form'>
                  <FormikControl
                    control='input'
                    type='input'
                    name='name'
                    label='Branch Name'
                    placeholder='branch name'
                    labelClassName='ad-contact-details__form-label'
                    icon='bx bx-store'
                  />

                  <FormikControl
                    control='textarea'
                    name='description'
                    label='Description'
                    placeholder='description'
                    labelClassName='ad-contact-details__form-label'
                    icon='bx bx-message-square-dots'
                  />

                  <FormikControl
                    control='input'
                    type='input'
                    name='phone'
                    label='Phone number'
                    placeholder='phone number'
                    labelClassName='ad-contact-details__form-label'
                    icon='bx bx-phone'
                  />

                  <FormikControl
                    control='input'
                    type='input'
                    name='address'
                    label='Address'
                    placeholder='address'
                    labelClassName='ad-contact-details__form-label'
                    icon='bx bx-map-pin'
                  />

                  <button
                    className='btn btn-primary ad-contact-details__form-btn'
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

export default AdContactDetails;
