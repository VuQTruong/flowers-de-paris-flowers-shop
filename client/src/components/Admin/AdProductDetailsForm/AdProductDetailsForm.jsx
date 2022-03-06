import React from 'react';
import { Formik, Form } from 'formik';
import FormikControl from '../../../formik/FormikControl';
import { useDispatch, useSelector } from 'react-redux';
import ChipInput from '../../ChipInput/ChipInput';
import { useEffect } from 'react';
import { adGetCategories } from '../../../features/categories/ad-get-categories';

function AdProductDetailsForm({
  initialValues,
  validationSchema,
  colors,
  setColors,
  tags,
  setTags,
  formRef,
}) {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.allCategories);

  useEffect(() => {
    dispatch(adGetCategories());
  }, [dispatch]);

  const colorOptions = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'violet',
    'white',
  ];

  const getCategories = () => {
    if (categories) {
      return categories.map((category) => {
        return {
          value: {
            id: category._id,
            slug: category.slug,
          },
          label: category.name,
        };
      });
    }

    return [];
  };

  const addColorChip = (e) => {
    if (!colors.includes(e.target.innerHTML)) {
      setColors([...colors, e.target.innerHTML]);
    }
  };

  const removeColorChip = (e) => {
    setColors(colors.filter((color) => color !== e.target.dataset.color));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize
      innerRef={formRef}
    >
      {(formik) => {
        return (
          <Form className='ad-product-details__form'>
            <FormikControl
              control='input'
              type='input'
              name='name'
              label='Product Name'
              placeholder='product name'
              labelClassName='ad-product-details__form-label'
              icon='bx bx-box'
            />

            <FormikControl
              control='reactselect'
              name='category'
              label='Category'
              placeholder='category'
              labelClassName='ad-product-details__form-label'
              icon='bx bx-home'
              options={getCategories()}
            />

            <FormikControl
              control='input'
              type='number'
              name='originalPrice'
              label='Price'
              placeholder='price'
              labelClassName='ad-product-details__form-label'
              icon='bx bx-dollar-circle'
            />

            <FormikControl
              control='input'
              type='number'
              name='saleOffPrice'
              label='Sale Off'
              placeholder='sale off price'
              labelClassName='ad-product-details__form-label'
              icon='bx bx-dollar-circle'
            />

            <div className='ad-product-details__chip-container'>
              <ChipInput
                label='Tags'
                placeholder='type and hit enter'
                chips={tags}
                onUpdate={(newTags) => setTags(newTags)}
                labelClassname='ad-product-details__form-label'
              />
            </div>

            <div className='ad-product-details__chip-container'>
              <ChipInput
                label='Colors'
                placeholder='select colors'
                readOnly
                chips={colors}
                onUpdate={(newColors) => setColors(newColors)}
                labelClassname='ad-product-details__form-label'
                icon='bx bx-palette'
              />

              <div className='ad-product-details__chip-input'>
                {colorOptions.map((option, index) => (
                  <div
                    className={`chip-input__chip ${
                      colors.includes(option) ? 'active' : ''
                    }`}
                    key={index}
                  >
                    <span onClick={addColorChip}>{option}</span>
                    <i
                      className='bx bx-x'
                      data-color={option}
                      onClick={removeColorChip}
                    ></i>
                  </div>
                ))}
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

export default AdProductDetailsForm;
