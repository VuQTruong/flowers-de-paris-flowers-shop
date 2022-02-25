import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { dateWithoutWeekdayFormat } from '../../../utilities/helpers';

function AdCategories() {
  const { categories, loading, error } = useSelector(
    (state) => state.allCategories
  );

  return (
    <main className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Category Management</h2>
        <button className='btn btn-primary dashboard__btn'>
          <i className='bx bxs-add-to-queue'></i>
          <span>Add new category</span>
        </button>
      </div>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {categories && (
        <div className='table__container'>
          <table className='table'>
            <thead>
              <tr>
                <th>Cover</th>
                <th>Category</th>
                <th>Created On</th>
                <th>Updated On</th>
                <th>#</th>
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
                  <td data-label='Category'>{category.name}</td>
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
                  <td data-label='#'>
                    <div className='table__cell--center'>
                      <button className='btn btn-primary'>Update</button>
                    </div>
                  </td>
                  <td data-label='#'>
                    <div className='table__cell--center'>
                      <button className='btn btn-danger'>Delete</button>
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
