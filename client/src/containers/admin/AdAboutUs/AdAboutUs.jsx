import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState } from 'react';
import { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import TextEditor from '../../../components/TextEditor/TextEditor';
import { createAbout } from '../../../features/about/create-about';
import { getAbout } from '../../../features/about/get-about';
import { updateAbout } from '../../../features/about/update-about';
import swal from 'sweetalert2';

function AdAboutUs() {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(false);
  const [aboutUsContent, setAboutUsContent] = useState('');

  const { aboutInfo, loading, error } = useSelector((state) => state.about);

  useEffect(() => {
    if (!aboutInfo) {
      dispatch(getAbout());
    } else {
      setAboutUsContent(aboutInfo.content);
    }
  }, [aboutInfo, dispatch]);

  const saveHandler = async () => {
    if (!aboutInfo) {
      const actionResult = dispatch(createAbout(aboutUsContent));
      await unwrapResult(actionResult);

      swal.fire({
        icon: 'success',
        title: 'Yay!...',
        text: 'About Us content is created successfully',
      });
    } else {
      const actionResult = dispatch(
        updateAbout({
          id: aboutInfo._id,
          content: aboutUsContent,
        })
      );
      await unwrapResult(actionResult);

      swal.fire({
        icon: 'success',
        title: 'Yay!...',
        text: 'About Us content is updated successfully',
      });
    }
  };

  return (
    <main className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>About us</h2>
        <button
          className='btn btn-primary dashboard__btn'
          onClick={saveHandler}
        >
          <i className='bx bx-save'></i>
          <span>Save</span>
        </button>
      </div>

      {loading && <Loading />}
      {!loading && error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && aboutInfo ? (
        <div className='container ad-about__panel'>
          <TextEditor
            className='ad-about__editor'
            placeholder='About us ...'
            value={aboutUsContent}
            onEditorChange={(e, editor) => setAboutUsContent(editor.getData())}
          />

          <div className='ad-about__btn-group'>
            <button
              className='btn btn-primary ad-about__preview-btn'
              onClick={() => setPreview(true)}
            >
              Preview
            </button>
            <button
              className='btn btn-primary ad-about__preview-btn'
              onClick={() => setPreview(false)}
            >
              Hide
            </button>
          </div>

          {preview && (
            <div className='ad-about__preview ck-content'>
              {ReactHtmlParser(aboutUsContent)}
            </div>
          )}
        </div>
      ) : (
        <div className='container ad-about__panel'>
          <TextEditor
            className='ad-about__editor'
            placeholder='About us ...'
            value={aboutUsContent}
            onEditorChange={(e, editor) => setAboutUsContent(editor.getData())}
          />
        </div>
      )}
    </main>
  );
}

export default AdAboutUs;
