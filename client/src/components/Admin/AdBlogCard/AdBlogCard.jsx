import React from 'react';
import { Link } from 'react-router-dom';
import { dateWithoutWeekdayFormat } from '../../../utilities/helpers';
import swal from 'sweetalert2';
import Axios from '../../../config/axios';
import { useDispatch } from 'react-redux';
import { adGetAllBlogs } from '../../../features/blogs/ad-get-all-blogs';

function AdBlogCard({ blog }) {
  const dispatch = useDispatch();

  const setBlogStatusHandler = async (blogId) => {
    try {
      await Axios.patch(`/blogs/setactive/${blogId}`);

      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: `Article's status is set successfully`,
        })
        .then(() => {
          dispatch(adGetAllBlogs());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const deleteHandler = (blogId) => {
    try {
      swal
        .fire({
          icon: 'warning',
          title: 'Watch out!...',
          text: 'Are you sure you want to remove this article?',
          showCancelButton: true,
          showConfirmButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await Axios.delete(`/blogs/${blogId}`);

            swal
              .fire({
                icon: 'success',
                title: 'Yay!...',
                text: `Article is deleted successfully`,
              })
              .then(() => {
                dispatch(adGetAllBlogs());
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
    <div>
      <div className='ad-blog-card'>
        <section className='ad-blog-card__header'>
          <div className='ad-blog-card__header-img'>
            <img
              src={blog.coverImage}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = '/images/defaultImg.png';
              }}
              alt='Blog Cover'
            />
          </div>
          <div className='ad-blog-card__header-title'>{blog.title}</div>
        </section>

        <section className='ad-blog-card__summary'>{blog.summary}</section>

        <section className='ad-blog-card__status'>
          {blog.isActive ? (
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
        </section>

        <section className='ad-blog-card__stat'>
          <div className='ad-blog-card__stat-item'>
            <i className='bx bx-calendar'></i>
            <span>
              {dateWithoutWeekdayFormat.format(Date.parse(blog.createdAt))}
            </span>
          </div>

          <div className='ad-blog-card__stat-item'>
            <i className='bx bx-show'></i>
            <span>{blog.views}</span>
          </div>
        </section>

        <section className='ad-blog-card__buttons'>
          <Link
            to={`/admin/blogs/edit/${blog._id}`}
            className='btn btn-primary ad-blog-card__btn'
          >
            Edit
          </Link>
          <button
            className={`btn btn-primary ad-blog-card__btn ad-blog-card__active-btn ${
              !blog.isActive ? '' : 'inactive'
            }`}
            onClick={() => setBlogStatusHandler(blog._id)}
          >
            {!blog.isActive ? 'Activate' : 'Deactivate'}
          </button>
          <button
            className='btn btn-danger ad-blog-card__btn'
            onClick={() => deleteHandler(blog._id)}
          >
            Delete
          </button>
        </section>
      </div>
    </div>
  );
}

export default AdBlogCard;
