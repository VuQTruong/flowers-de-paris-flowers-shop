import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdAccountsFilter from '../../../components/Admin/AdAccountsFilter/AdAccountsFilter';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Paginator from '../../../components/Paginator/Paginator';
import useCustomNavigate from '../../../hooks/use-custom-navigate';
import swal from 'sweetalert2';
import { getAllUsers } from '../../../features/users/get-all-users';
import Axios from '../../../config/axios';

function AdAccounts() {
  const dispatch = useDispatch();
  const customNavigate = useCustomNavigate();

  const allUsers = useSelector((state) => state.allUsers);
  const { users, totalPages, currentPage, loading, error } = allUsers;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

  const setAdminHandler = async (userId) => {
    try {
      await Axios.patch(`/users/setAdmin/${userId}`);

      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: `User's administration is set successfully`,
        })
        .then(() => {
          dispatch(getAllUsers());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const setUserStatusHandler = async (userId) => {
    try {
      await Axios.patch(`/users/block/${userId}`);

      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: `User's status is set successfully`,
        })
        .then(() => {
          dispatch(getAllUsers());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const deleteUserHandler = (userId) => {
    try {
      swal
        .fire({
          icon: 'warning',
          title: 'Watch out!...',
          text: 'Are you sure you want to remove this user?',
          showCancelButton: true,
          showConfirmButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await Axios.delete(`/users/${userId}`);

            swal
              .fire({
                icon: 'success',
                title: 'Yay!...',
                text: `User is deleted successfully`,
              })
              .then(() => {
                dispatch(getAllUsers());
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
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Users Management</h2>
      </div>

      <AdAccountsFilter />

      {loading && <Loading />}
      {!loading && error && (
        <MessageBox variant='danger' fullWidth>
          {error}
        </MessageBox>
      )}
      {!loading && users && (
        <React.Fragment>
          <div className='table__container ad-users__table'>
            <table className='table'>
              <thead>
                <tr>
                  <th className='ad-users__id'>User Id</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Gender</th>
                  <th>Is Admin</th>
                  <th>Status</th>
                  <th>Set Admin</th>
                  <th>Set Status</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td data-label='User Id' className='ad-users__id'>
                      {user._id}
                    </td>
                    <td data-label='Username'>{user.name}</td>
                    <td data-label='Email'>{user.email}</td>
                    <td data-label='Phone Number' className='ad-users__phone'>
                      {user.phone}
                    </td>
                    <td data-label='Gender' className='ad-users__gender'>
                      <div className='table__cell--center'>
                        {user.gender ? user.gender : <span>&#8211;</span>}
                      </div>
                    </td>
                    <td data-label='Is Admin' className='ad-users__admin'>
                      <div className='table__cell--center'>
                        <input
                          type='checkbox'
                          name='setAdmin'
                          id='setAdmin'
                          checked={user.isAdmin}
                          readOnly
                        />
                      </div>
                    </td>
                    <td data-label='Status' className='ad-users__admin'>
                      {user.isActive ? (
                        <p
                          className='dashboard__status'
                          style={{ '--status-color': '#6bc839' }}
                        >
                          Active
                        </p>
                      ) : (
                        <p
                          className='dashboard__status'
                          style={{ '--status-color': '#d9534f' }}
                        >
                          Inactive
                        </p>
                      )}
                    </td>
                    <td data-label='Status' className='ad-users__admin'>
                      <div className='table__cell--center'>
                        {!user.isAdmin ? (
                          <button
                            className='btn btn-primary ad-users__btn ad-users__btn--active'
                            onClick={() => setAdminHandler(user._id)}
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            className='btn btn-primary ad-users__btn ad-users__btn--hide'
                            onClick={() => setAdminHandler(user._id)}
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                    <td data-label='Status' className='ad-users__admin'>
                      <div className='table__cell--center'>
                        {!user.isActive ? (
                          <button
                            className='btn btn-primary ad-users__btn ad-users__btn--active'
                            onClick={() => setUserStatusHandler(user._id)}
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            className='btn btn-primary ad-users__btn ad-users__btn--hide'
                            onClick={() => setUserStatusHandler(user._id)}
                          >
                            Deactivate
                          </button>
                        )}
                      </div>
                    </td>
                    <td data-label='#'>
                      <div className='table__cell--center'>
                        <button
                          className='btn btn-danger ad-users__delete'
                          onClick={() => deleteUserHandler(user._id)}
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

          <Paginator
            className='ad-users__paginator'
            onChange={(value) => pageChangeHandler(value)}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </React.Fragment>
      )}
    </div>
  );
}

export default AdAccounts;
