import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import {
  dateWithoutWeekdayFormat,
  showLoadingModal,
} from '../../../utilities/helpers';
import swal from 'sweetalert2';
import Axios from '../../../config/axios';
import { adGetCategories } from '../../../features/categories/ad-get-categories';

function AdCategories() {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector(
    (state) => state.allCategories
  );

  useEffect(() => {
    dispatch(adGetCategories());
  }, [dispatch]);

  const setCategoryStatusHandler = async (categoryId) => {
    try {
      showLoadingModal('Updating category status...');

      await Axios.patch(`/categories/setactive/${categoryId}`);

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: `Category's status is set successfully`,
        })
        .then(() => {
          dispatch(adGetCategories());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const deleteCategoryHandler = (categoryId) => {
    try {
      swal
        .fire({
          icon: 'warning',
          title: 'Watch out!...',
          text: 'All products under this category will also be deleted permanently! Are you sure you want to remove this category?',
          showCancelButton: true,
          showConfirmButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            showLoadingModal('Deleting category...');

            await Axios.delete(`/categories/${categoryId}`);

            swal.close();
            swal
              .fire({
                icon: 'success',
                title: 'Yay!...',
                text: `Category is deleted successfully`,
              })
              .then(() => {
                dispatch(adGetCategories());
              });
          }
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
    <main className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Categories Management</h2>
        <Link to='add' className='btn btn-primary dashboard__btn'>
          <i className='bx bxs-add-to-queue'></i>
          <span>Add new category</span>
        </Link>
      </div>

      {loading && <Loading />}
      {!loading && error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && categories && (
        <div className='table__container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Category</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th>Status</th>
                <th>Set Status</th>
                <th>#</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td data-label='Cover'>
                    <div className='table__cell--center'>
                      <img
                        src={category.coverImage}
                        alt={category.name}
                        className='ad-categories__img'
                      />
                    </div>
                  </td>
                  <td data-label='Category'>
                    <Link
                      to={`edit/${category._id}`}
                      className='ad-products__name'
                    >
                      {category.name}
                    </Link>
                  </td>
                  <td data-label='Created On'>
                    {dateWithoutWeekdayFormat.format(
                      Date.parse(category.createdAt)
                    )}
                  </td>
                  <td data-label='Updated On'>
                    {dateWithoutWeekdayFormat.format(
                      Date.parse(category.updatedAt)
                    )}
                  </td>
                  <td data-label='Status'>
                    <p
                      className='order-details__status user-orders__status'
                      style={{
                        '--status-color': `${
                          category.isActive ? '#6bc839' : '#d9534f'
                        }`,
                      }}
                    >
                      {category.isActive ? 'Active' : 'Inactive'}
                    </p>
                  </td>
                  <td data-label='Set Status'>
                    <div className='table__cell--center'>
                      {!category.isActive ? (
                        <button
                          className='btn btn-primary ad-users__btn ad-users__btn--active'
                          onClick={() => setCategoryStatusHandler(category._id)}
                        >
                          Activate
                        </button>
                      ) : (
                        <button
                          className='btn btn-primary ad-users__btn ad-users__btn--hide'
                          onClick={() => setCategoryStatusHandler(category._id)}
                          disabled={
                            category.slug === 'bouquets' ||
                            category.slug === 'flower-baskets' ||
                            category.slug === 'gifts'
                          }
                        >
                          Deactivate
                        </button>
                      )}
                    </div>
                  </td>
                  <td data-label='#'>
                    <div className='table__cell--center'>
                      <button
                        className='btn btn-danger dashboard__table-btn'
                        onClick={() => deleteCategoryHandler(category._id)}
                        disabled={
                          category.slug === 'bouquets' ||
                          category.slug === 'flower-baskets' ||
                          category.slug === 'gifts'
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default AdCategories;
