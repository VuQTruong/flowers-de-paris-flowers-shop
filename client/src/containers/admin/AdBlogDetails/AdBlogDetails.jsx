import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdBlogDetailsForm from '../../../components/Admin/AdBlogDetailsForm/AdBlogDetailsForm';
import Article from '../../../components/Article/Article';
import BlogCard from '../../../components/BlogCard/BlogCard';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import Axios from '../../../config/axios';
import { adGetArticle } from '../../../features/blogs/ad-get-article';
import { resetCurrentArticle } from '../../../features/blogs/slice/current-article';
import { getImageId, showLoadingModal } from '../../../utilities/helpers';
import swal from 'sweetalert2';

function AdBlogDetails() {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newImageRef = useRef();
  const isSubmitted = useRef(false);
  const [isValid, setIsValid] = useState(true);
  const [preview, setPreview] = useState(false);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [tags, setTags] = useState([]);
  const [content, setContent] = useState('');
  const [cover, setCover] = useState('');

  const { article, loading, error } = useSelector(
    (state) => state.currentArticle
  );

  useEffect(() => {
    if (articleId && !article) {
      dispatch(adGetArticle(articleId));
    }

    if (article) {
      setTitle(article.title);
      setAuthor(article.author);
      setSummary(article.summary);
      setTags(article.tags);
      setContent(article.content);
      setCover(article.coverImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article, articleId, dispatch]);

  // !clear up effect
  useEffect(() => {
    return () => {
      // !delete recently uploaded images if article info is not saved/updated
      if (!isSubmitted.current && newImageRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        deleteImage(newImageRef.current);
      }

      dispatch(resetCurrentArticle());
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
      await Axios.delete(`/files/cloud-images?folder=blogs&id=${imageId}`);
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

  const contentHandler = (e, editor) => {
    setContent(editor.getData());
  };

  const validateInput = () => {
    if (!title || !author || !cover || !summary || !content) {
      setIsValid(false);
      return false;
    }

    return true;
  };

  const onSubmitHandler = async () => {
    try {
      if (!validateInput()) {
        return;
      }

      showLoadingModal('Saving article info...');

      const articleInfo = {
        title: title,
        author: author,
        tags: tags,
        summary: summary,
        content: content,
        coverImage: cover,
      };

      if (articleId) {
        await Axios.patch(`/blogs/${article._id}`, articleInfo);
      } else {
        await Axios.post('/blogs', articleInfo);
      }

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: articleId
            ? `Product is updated successfully`
            : `Product is created successfully`,
        })
        .then(() => {
          if (article) {
            deleteImage(article.coverImage);
          }

          navigate('/admin/blogs');
        });
      isSubmitted.current = true;
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
        <Link to='/admin/blogs' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-arrow-back'></i>
          <span>Back</span>
        </Link>
        <h2 className='dashboard__title'>
          {articleId ? 'Edit Article' : 'Create new article'}
        </h2>
      </div>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && !error && (
        <div className='container ad-blog-details__container'>
          <div className='ad-blog-details__info'>
            <div className='ad-blog-details__image'>
              <BlogCard
                link='#'
                image={cover}
                title={title || 'Blog Title'}
                summary={
                  summary ||
                  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus voluptates in dolor sint cupiditate, magnam aliquam. Tempora, consequatur sint. Delectus. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus voluptates in dolor sint cupiditate, magnam aliquam.'
                }
                date={(article && Date.parse(article.createdAt)) || new Date()}
              />
            </div>

            <AdBlogDetailsForm
              title={title}
              setTitle={setTitle}
              author={author}
              setAuthor={setAuthor}
              summary={summary}
              setSummary={setSummary}
              tags={tags}
              setTags={setTags}
              isValid={isValid}
              newImageRef={newImageRef}
              deleteImage={deleteImage}
              setCover={setCover}
            />
          </div>

          <div className='ad-blog-details__content'>
            {!isValid && !content && (
              <p className='form__error'>Content is missing</p>
            )}
            <TextEditor
              className='ad-blog-details__editor'
              placeholder='Content'
              value={content}
              onEditorChange={contentHandler}
            />

            <div className='ad-blog-details__btn-group'>
              <button
                className='btn btn-primary ad-blog-details__preview-btn'
                onClick={() => setPreview(true)}
              >
                Preview
              </button>
              <button
                className='btn btn-primary ad-blog-details__preview-btn'
                onClick={() => setPreview(false)}
              >
                Hide
              </button>
            </div>

            {preview && (
              <div className='ad-blog-details__preview'>
                <Article
                  title={title}
                  author={author}
                  coverImage={cover}
                  tags={tags}
                  summary={summary}
                  content={content}
                  date={new Date().toLocaleDateString()}
                  views={0}
                />
              </div>
            )}
          </div>

          <button
            className='btn btn-primary ad-blog-details__form-btn'
            onClick={onSubmitHandler}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
}

export default AdBlogDetails;
