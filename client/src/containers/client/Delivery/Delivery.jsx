import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FormikControl from '../../../formik/FormikControl';
import CheckoutSteps from '../../../components/CheckoutSteps/CheckoutSteps';
import * as Yup from 'yup';
import { Country, State, City } from 'country-state-city';
import * as cityAndProvince from 'sub-vn';
import { saveDeliveryInfo } from '../../../features/cart/slice/delivery-slice';
import swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';

const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]*$/, 'Name must contain letters only')
    .required('Name is required'),
  phone: Yup.string().matches(/^[0-9]+$/, 'Invalid phone number'),
  country: Yup.mixed().required('Country is missing'),
  province: Yup.mixed().required('State/Province is missing'),
  city: Yup.mixed().required('City/District is missing'),
  address: Yup.string().required('Address is missing'),
});

function Delivery() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.currentUser);
  const { deliveryInfo } = useSelector((state) => state.delivery);

  const initialValues = {
    name: (deliveryInfo && deliveryInfo.name) || '',
    phone: (deliveryInfo && deliveryInfo.phone) || '',
    country: (deliveryInfo && deliveryInfo.country) || {
      code: 'VN',
      name: 'Vietnam',
    },
    province: (deliveryInfo && deliveryInfo.province) || null,
    city: (deliveryInfo && deliveryInfo.city) || null,
    ward: (deliveryInfo && deliveryInfo.ward) || null,
    address: (deliveryInfo && deliveryInfo.address) || '',
    postalCode: (deliveryInfo && deliveryInfo.postalCode) || '',
  };

  useEffect(() => {
    window.scroll(0, 0);

    if (!userInfo) {
      swal
        .fire({
          icon: 'warning',
          title: 'Oops!...',
          text: 'Please sign in to access this page',
        })
        .then(() => {
          navigate('/signin?redirect=delivery');
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountries = () => {
    return Country.getAllCountries().map((country) => {
      return {
        value: {
          code: country.isoCode,
          name: country.name,
        },
        label: country.name,
      };
    });
  };

  const getProvinces = (values) => {
    if (!values.country) {
      return;
    }

    if (values.country.code === 'VN') {
      return cityAndProvince.getProvinces().map((prov) => {
        return {
          value: {
            code: prov.code,
            name: prov.name,
          },
          label: prov.name,
        };
      });
    } else {
      return State.getStatesOfCountry(values.country.code).map((province) => {
        return {
          value: {
            code: province.isoCode,
            name: province.name,
          },
          label: province.name,
        };
      });
    }
  };

  const getCities = (values) => {
    if (!values.country || !values.province) return;

    if (values.country.code === 'VN') {
      return cityAndProvince
        .getDistrictsByProvinceCode(values.province.code)
        .map((dist) => {
          return {
            value: {
              code: dist.code,
              name: dist.name,
            },
            label: dist.name,
          };
        });
    } else {
      return City.getCitiesOfState(
        values.country.code,
        values.province.code
      ).map((city) => {
        return {
          value: {
            code: '',
            name: city.name,
          },
          label: city.name,
        };
      });
    }
  };

  const getWards = (values) => {
    if (!values.city) return;

    return cityAndProvince
      .getWardsByDistrictCode(values.city.code)
      .map((ward) => {
        return {
          value: {
            code: ward.code,
            name: ward.name,
          },
          label: ward.name,
        };
      });
  };

  const onSubmitHandler = async (values) => {
    const deliveryInfo = {
      name: values.name,
      phone: values.phone,
      country: values.country,
      province: values.province,
      city: values.city,
      ward: values.ward,
      address: values.address,
      postalCode: values.postalCode,
    };

    if (values.country.code !== 'VN') {
      delete deliveryInfo.ward;
    }

    const actionResult = await dispatch(
      saveDeliveryInfo({
        deliveryInfo,
      })
    );
    unwrapResult(actionResult);

    swal
      .fire({
        icon: 'success',
        title: `Awesome!...`,
        text: `Your beautiful  flowers are just one more step away to your beloved!`,
      })
      .then(() => {
        navigate('/payment');
      });
  };

  return (
    <main className='delivery__panel'>
      <div className='delivery__content'>
        <CheckoutSteps step1 step2 />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmitHandler}
          enableReinitialize
        >
          {(formik) => {
            return (
              <Form className='delivery__form'>
                <FormikControl
                  control='input'
                  type='input'
                  name='name'
                  label='Recipient'
                  placeholder='recipient name'
                  labelClassName='delivery__form-label'
                  icon='bx bx-user'
                />

                <FormikControl
                  control='input'
                  type='input'
                  name='phone'
                  label='Phone Number'
                  placeholder='phone number'
                  labelClassName='delivery__form-label'
                  icon='bx bx-phone'
                />

                <FormikControl
                  control='reactselect'
                  name='country'
                  label='Country'
                  placeholder='country'
                  labelClassName='delivery__form-label'
                  icon='bx bx-home'
                  options={getCountries()}
                />

                <FormikControl
                  control='reactselect'
                  name='province'
                  label='State/Province'
                  placeholder='state/province'
                  labelClassName='delivery__form-label'
                  icon='bx bx-home'
                  options={getProvinces(formik.values)}
                />

                <FormikControl
                  control='reactselect'
                  name='city'
                  label='City/District'
                  placeholder='city/district'
                  labelClassName='delivery__form-label'
                  icon='bx bx-home'
                  options={getCities(formik.values)}
                />

                {formik.values.country && formik.values.country.code === 'VN' && (
                  <React.Fragment>
                    <FormikControl
                      control='reactselect'
                      name='ward'
                      label='Ward'
                      placeholder='ward'
                      labelClassName='delivery__form-label'
                      icon='bx bx-home'
                      options={getWards(formik.values)}
                    />
                  </React.Fragment>
                )}

                <FormikControl
                  control='input'
                  type='input'
                  name='address'
                  label='Address'
                  placeholder='address'
                  labelClassName='delivery__form-label'
                  icon='bx bx-home'
                />

                <FormikControl
                  control='input'
                  type='input'
                  name='postalCode'
                  label='PostalCode'
                  placeholder='postal code'
                  labelClassName='delivery__form-label'
                  icon='bx bx-envelope'
                />

                <button className='btn btn-primary delivery__btn' type='submit'>
                  Deliver to this address
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </main>
  );
}

export default Delivery;
