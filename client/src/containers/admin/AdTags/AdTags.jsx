import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MessageBox from '../../../components/MessageBox/MessageBox';
import { fetchTags } from '../../../features/reviews/fetch-tags';
import swal from 'sweetalert2';
import Axios from '../../../config/axios';
import { showLoadingModal } from '../../../utilities/helpers';

function AdTags() {
  const dispatch = useDispatch();

  const [newCommentTag, setNewCommentTag] = useState('');

  const { tags, loading, error } = useSelector((state) => state.commentTags);

  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const addCommentTagHandler = async () => {
    try {
      showLoadingModal('Adding new tag...');
      setNewCommentTag('');

      await Axios.post('/reviews/tags', {
        tag: newCommentTag,
      });

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: 'New tag is added successfully!',
        })
        .then(() => {
          dispatch(fetchTags());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const removeReviewTag = async (tagId) => {
    try {
      showLoadingModal('Deleting selected tag...');
      setNewCommentTag('');

      await Axios.delete(`/reviews/tags/${tagId}`);

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: 'Selected tag is deleted!',
        })
        .then(() => {
          dispatch(fetchTags());
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
        <h2 className='dashboard__title'>Tags Management</h2>
      </div>

      <section className='ad-tags__comment-tags'>
        <h3 className='ad-tags__title'>Comment Tags</h3>

        <div className='ad-tags__comment-tags-add'>
          <input
            type='text'
            className='ad-tags__comment-tags-input'
            placeholder='new tag ...'
            value={newCommentTag}
            onChange={(e) => setNewCommentTag(e.target.value)}
            onKeyUp={(e) => {
              if (e.code === 'Enter' || e.code === 'NumpadEnter') {
                addCommentTagHandler();
              }
            }}
          />
          <button
            className='ad-tags__comment-tags-btn'
            onClick={addCommentTagHandler}
          >
            <i className='bx bx-message-square-add'></i>
          </button>
        </div>

        <div className='ad-tags__comment-tags-list'>
          {loading && <i className='bx bx-loader-alt bx-spin'></i>}
          {!loading && error && (
            <MessageBox variant='danger'>{error}</MessageBox>
          )}
          {!loading && tags && (
            <ul>
              {tags.map((tag) => {
                return (
                  <li className={'ad-tags__comment-tags-tag'} key={tag._id}>
                    <span>{tag.tag}</span>
                    <i
                      className='bx bx-x'
                      onClick={() => removeReviewTag(tag._id)}
                    ></i>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}

export default AdTags;
