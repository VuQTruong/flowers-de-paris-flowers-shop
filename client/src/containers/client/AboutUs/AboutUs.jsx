import React, { useEffect } from 'react';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { getAbout } from '../../../features/about/get-about';
import 'ckeditor5-custom-build/build/ckeditor';

function AboutUs() {
  const dispatch = useDispatch();
  const aboutUs = useSelector((state) => state.about);
  const { aboutInfo, loading, error } = aboutUs;

  useEffect(() => {
    window.scroll(0, 0);
    dispatch(getAbout());
  }, [dispatch]);

  return (
    <div className='container about-us__container'>
      <div className='about-us__header'>
        <h1 className='about-us__title'>About Us</h1>
      </div>

      {loading && <Loading />}
      {!loading && error && <MessageBox variant='danger'>{error}</MessageBox>}
      {!loading && aboutInfo && (
        <div className='about-us__content ck-content'>
          {ReactHtmlParser(aboutInfo.content)}
        </div>
      )}
    </div>
  );
}

export default AboutUs;
