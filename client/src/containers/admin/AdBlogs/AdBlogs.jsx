import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdBlogCard from '../../../components/Admin/AdBlogCard/AdBlogCard';
import AdBlogsFilter from '../../../components/Admin/AdBlogsFilter/AdBlogsFilter';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Paginator from '../../../components/Paginator/Paginator';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function AdBlogs() {
  const customNavigate = useCustomNavigate();

  const allBlogs = useSelector((state) => state.allBlogs);
  const { blogs, totalPages, currentPage, loading, error } = allBlogs;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Blogs Management</h2>
        <Link
          to='/admin/blogs/add'
          className='btn btn-primary admin-products__add-btn'
        >
          <i className='bx bxs-add-to-queue'></i>
          <span>Add new article</span>
        </Link>
      </div>

      <AdBlogsFilter />

      {loading && <Loading />}
      {!loading && error && (
        <MessageBox variant='danger' fullWidth>
          {error}
        </MessageBox>
      )}
      {!loading && blogs && (
        <React.Fragment>
          {blogs.length === 0 ? (
            <MessageBox variant='info' fullWidth>
              There are no blogs to show
            </MessageBox>
          ) : (
            <React.Fragment>
              {blogs.map((blog) => (
                <AdBlogCard key={blog._id} blog={blog} />
              ))}

              <Paginator
                className='products__paginator'
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={(value) => pageChangeHandler(value)}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default AdBlogs;
