import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BlogCard from '../../../components/BlogCard/BlogCard';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { getAllBlogs } from '../../../features/blogs/get-all-blogs';
import { dateWithoutWeekdayFormat } from '../../../utilities/helpers';

function Blogs() {
  const dispatch = useDispatch();

  const allBlogs = useSelector((state) => state.allBlogs);
  const { blogs, loading, error } = allBlogs;

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const renderBlogList = () => {
    const blogCards = [];

    for (let i = 1; i < blogs.length; i++) {
      blogCards.push(
        <BlogCard
          link={`/blogs/${blogs[i].slug}`}
          image={blogs[i].coverImage}
          title={blogs[i].title}
          summary={blogs[i].summary}
          date={Date.parse(blogs[i].createdAt)}
          key={blogs[i]._id}
        />
      );
    }

    return blogCards;
  };

  return (
    <main className='container blogs__container'>
      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {blogs && blogs.length !== 0 && (
        <React.Fragment>
          <Link to={`/blogs/${blogs[0].slug}`} className='blogs__hero'>
            <div className='blogs__hero-img'>
              <img src={blogs[0].coverImage} alt='Cover' />
            </div>
            <div className='blogs-hero__content'>
              <h3 className='blogs-hero__title'>{blogs[0].title}</h3>
              <p className='blogs-hero__summary'>{blogs[0].summary}</p>
              <div className='blogs-hero__info'>
                <div className='blogs-hero__info-item'>
                  <i className='bx bxs-user'></i>
                  <span>Author: {blogs[0].author}</span>
                </div>
                <div className='blogs-hero__info-item'>
                  <i className='bx bx-calendar'></i>
                  <span>
                    Posted on:{' '}
                    {dateWithoutWeekdayFormat.format(
                      Date.parse(blogs[0].createdAt)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </Link>
          <div className='blogs__list'>
            <h2 className='blogs__list-title'>All Articles</h2>
            <div className='blogs__list-content'>{renderBlogList()}</div>
          </div>
        </React.Fragment>
      )}
    </main>
  );
}

export default Blogs;
