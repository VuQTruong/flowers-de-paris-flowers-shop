import React from 'react';
import { ReactComponent as DefaultPhotoSVG } from '../../../assets/svgs/undraw_photos_re_pvh3.svg';

function ImagePreviewBox({ image, className }) {
  return (
    <div className={`${className && className}`}>
      <div className='img-preview-box__container'>
        <div className='img-preview-box__preview-content'>
          {image ? (
            <img
              src={image}
              alt='cover Img'
              className='img-preview-box__preview-img'
            />
          ) : (
            <div className='img-preview-box__cover-img'>
              <DefaultPhotoSVG className='img-preview-box__default-img' />
              <span>Cover Image</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImagePreviewBox;
