import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import GalleryModal from '../../../components/GalleryModal/GalleryModal';
import ImagesUploader from '../../../components/Admin/ImagesUploader/ImagesUploader';
import ImagePreviewBox from '../../../components/Admin/ImagePreviewBox/ImagePreviewBox';
import AdProductDetailsForm from '../../../components/Admin/AdProductDetailsForm/AdProductDetailsForm';
import { adGetProductById } from '../../../features/products/ad-get-product-by-id';
import * as Yup from 'yup';
import { resetCurrentProduct } from '../../../features/products/slices/current-product-slice';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { getImageId, showLoadingModal } from '../../../utilities/helpers';
import Axios from '../../../config/axios';
import swal from 'sweetalert2';

const validationSchema = Yup.object({
  name: Yup.string().required('Product name is missing'),
  category: Yup.mixed().required('Category is missing'),
  originalPrice: Yup.number().required('Product price is missing'),
  saleOffPrice: Yup.number(),
});

function AdProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef();
  const newImagesRef = useRef([]);
  const isSubmitted = useRef(false);
  const [isValid, setIsValid] = useState(true);

  const [cover, setCover] = useState('');
  const [images, setImages] = useState([]);
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [colors, setColors] = useState([]);
  const [tags, setTags] = useState([]);

  const { product, loading, error } = useSelector(
    (state) => state.currentProduct
  );

  const initialValues = {
    name: (product && product.name) || '',
    category:
      (product && {
        id: product.category._id,
        slug: product.categorySlug,
      }) ||
      null,
    originalPrice: (product && product.originalPrice) || 0,
    saleOffPrice: (product && product.saleOffPrice) || 0,
  };

  // !watch for the change of category to update the current state (cover, currentImages)
  useEffect(() => {
    if (productId && !product) {
      dispatch(adGetProductById(productId));
    }

    if (product) {
      setCover(product.coverImage);
      setImages(product.images);

      setSummary(product.summary);
      setDescription(product.description);
      setColors(product.colors);
      setTags(product.tags);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, productId, dispatch]);

  // !reset the currentProduct in store and delete images on Cloudinary if changes are not saved
  useEffect(() => {
    return () => {
      // !delete recently uploaded images if product info is not saved/updated
      if (!isSubmitted.current && newImagesRef.current) {
        newImagesRef.current.forEach((image) => {
          deleteImage(image);
        });
      }

      dispatch(resetCurrentProduct());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImage = async (image) => {
    try {
      // !the image is from another source other than cloudinary, we don't have to manage it
      if (!image.includes('res.cloudinary.com')) {
        return;
      }

      const imageId = getImageId(image);
      await Axios.delete(`/files/cloud-images?folder=products&id=${imageId}`);

      setImages(images.filter((img) => img !== image));
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text:
          (error.response && error.response.data.message) ||
          'Something went wrong!',
      });
    }
  };

  const setCoverImage = (image) => {
    setCover(image);
  };

  const validateInput = (formik) => {
    formik.validateForm();
    const values = formik.values;

    if (
      !summary ||
      !description ||
      !values.name ||
      !values.category ||
      !values.originalPrice
    ) {
      if (!values.name) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Product name is missing',
        });
      }

      if (!values.category) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Category is missing',
        });
      }

      if (!values.originalPrice) {
        swal.fire({
          icon: 'error',
          title: 'Oops!...',
          text: 'Price is missing',
        });
      }

      setIsValid(false);
      return false;
    }

    return true;
  };

  const onSubmitHandler = async () => {
    const values = formRef.current.values;

    if (!validateInput(formRef.current)) {
      return;
    }

    try {
      showLoadingModal('Saving product info...');

      const productInfo = {
        name: values.name,
        category: values.category.id,
        categorySlug: values.category.slug,
        images: images,
        coverImage: cover,
        originalPrice: values.originalPrice,
        saleOffPrice: values.saleOffPrice,
        summary: summary,
        description: description,
        colors: colors,
        tags: tags,
      };

      if (productId) {
        await Axios.patch(`/products/${product._id}`, productInfo);
      } else {
        await Axios.post('/products', productInfo);
      }

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: productId
            ? `Product is updated successfully`
            : `Product is created successfully`,
        })
        .then(() => {
          if (product) {
            deleteImage(product.coverImage);
          }

          navigate('/admin/products');
        });
      isSubmitted.current = true;
    } catch (error) {
      console.log(error);
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <Link to='/admin/products' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-arrow-back'></i>
          <span>Back</span>
        </Link>
        <h2 className='dashboard__title'>
          {productId ? 'Edit Product' : 'Create new product'}
        </h2>
      </div>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && !error && (
        <div className='container'>
          <div className='ad-product-details__container'>
            <div className='ad-product-details__image-uploader'>
              <ImagePreviewBox
                image={cover}
                className='ad-product-details__preview-cover'
              />
              <ImagesUploader
                folderName='products'
                multiFiles
                returnImages={(values) => {
                  // !store recently uploaded images to clear up in case the product information is not saved
                  newImagesRef.current = [...newImagesRef.current, ...values];

                  // !if in add mode, set the first image as the cover
                  if (!productId) {
                    setCover(values[0]);
                  }

                  // !set images to be saved
                  setImages([...images, ...values]);
                }}
              />
              <GalleryModal
                images={images}
                showButtons
                setCoverImage={setCoverImage}
                deleteImage={deleteImage}
              />
            </div>

            <AdProductDetailsForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              colors={colors}
              setColors={setColors}
              tags={tags}
              setTags={setTags}
              formRef={formRef}
            />
          </div>

          <div className='ad-product-details__editor-container'>
            <label className='ad-product-details__form-label'>Summary</label>
            <div className='ad-product-details__form-editor'>
              <TextEditor
                placeholder='Summary ...'
                value={summary}
                onEditorChange={(e, editor) => setSummary(editor.getData())}
              />

              {!isValid && !summary && (
                <div className='form__error'>Summary is missing</div>
              )}
            </div>
          </div>

          <div className='ad-product-details__editor-container'>
            <label className='ad-product-details__form-label'>
              Description
            </label>
            <div className='ad-product-details__form-editor'>
              <TextEditor
                placeholder='Description ...'
                value={description}
                onEditorChange={(e, editor) => setDescription(editor.getData())}
              />

              {!isValid && !description && (
                <div className='form__error'>Description is missing</div>
              )}
            </div>
          </div>

          <button
            className='btn btn-primary ad-product-details__form-btn'
            onClick={onSubmitHandler}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default AdProductDetails;
