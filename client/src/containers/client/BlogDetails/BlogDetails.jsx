import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { dateWithoutWeekdayFormat } from '../../../utilities/helpers';
import { EmailShareButton, FacebookShareButton } from 'react-share';
import Article from '../../../components/Article/Article';
import { useParams } from 'react-router-dom';
import { getArticle } from '../../../features/blogs/get-article';
import 'ckeditor5-custom-build/build/ckeditor';

function BlogDetails() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const pageUrl = window.location.href;

  const currentArticle = useSelector((state) => state.currentArticle);
  const { article, loading, error } = currentArticle;

  useEffect(() => {
    dispatch(getArticle(slug));
  }, [dispatch, slug]);

  return (
    <div className='container'>
      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {article && (
        <React.Fragment>
          <div className='blog-details__content'>
            <Article
              title={article.title}
              author={article.author}
              coverImage={article.coverImage}
              tags={article.tags}
              summary={article.summary}
              content={article.content}
              date={dateWithoutWeekdayFormat.format(
                Date.parse(article.createdAt)
              )}
              views={article.views}
            />

            <div className='blog-details__share'>
              <h3>Share this article</h3>
              <div className='blog-details__share-icons'>
                <FacebookShareButton url={pageUrl}>
                  <i className='bx bxl-facebook'></i>
                </FacebookShareButton>
                <EmailShareButton url={pageUrl}>
                  <i className='bx bx-mail-send'></i>
                </EmailShareButton>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default BlogDetails;
