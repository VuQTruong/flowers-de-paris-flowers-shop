import React, { useState } from 'react';
import MessageBox from '../MessageBox/MessageBox';

function GalleryModal(props) {
  const { images, showButtons, className, setCoverImage, deleteImage } = props;

  const [openModal, setOpenModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const renderThumbnails = (images) => {
    const imageNodes = [];

    if (images.length <= 5) {
      for (let i = 0; i < images.length; i++) {
        let node = (
          <li
            key={i}
            className='image-gallery__item'
            data-image={i}
            onClick={openModalHandler}
          >
            <img
              className='image-gallery__img'
              src={images[i]}
              alt='Img Item'
            />
          </li>
        );
        imageNodes.push(node);
      }
    } else {
      for (let i = 0; i < 5; i++) {
        let node;

        if (i !== 4) {
          node = (
            <li
              key={i}
              className='image-gallery__item'
              data-image={i}
              onClick={openModalHandler}
            >
              <img
                className='image-gallery__img'
                src={images[i]}
                alt='Img Item'
              />
            </li>
          );
        } else {
          node = (
            <li
              key={i}
              className='image-gallery__item'
              data-image={i}
              onClick={openModalHandler}
            >
              <img
                className='image-gallery__img'
                src={images[i]}
                alt='Img Item'
              />
              <div className='image-gallery__more'>
                <div className='image-gallery__quantity'>
                  +{images.length - 5}
                </div>
                <div className='image-gallery__subtitle'>
                  {images.length - 5 === 1 ? 'photo' : 'photos'}
                </div>
              </div>
            </li>
          );
        }
        imageNodes.push(node);
      }
    }

    return imageNodes;
  };

  const openModalHandler = (e) => {
    /**
     * * NOTE: Using .closest() to get the closest ancestor of the clicked element
     * * Since there are nested elements inside the <li>, there'are chances we click on them instead
     * * Therefore, we need this method to ALWAYS select the <li> if we click on others by accident
     */
    const el = e.target.closest('.image-gallery__item');

    setCurrentImg(el.dataset.image * 1);
    setOpenModal(true);
  };

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      setOpenModal(false);
    }
  });

  const prevBtnHandler = () => {
    const prevImg = currentImg - 1;

    if (prevImg === -1) {
      setCurrentImg(images.length - 1);
    } else {
      setCurrentImg(prevImg);
    }
  };

  const nextBtnHandler = () => {
    const nextImg = currentImg + 1;

    if (nextImg === images.length) {
      setCurrentImg(0);
    } else {
      setCurrentImg(nextImg);
    }
  };

  return (
    <div className={`image-gallery ${className && className}`}>
      {!images || images.length === 0 ? (
        <MessageBox variant='info'>Upload image to preview</MessageBox>
      ) : (
        <React.Fragment>
          <ul className='image-gallery__list'>{renderThumbnails(images)}</ul>
          <span style={{ textAlign: 'center' }}>
            <em>(Click on the thumbnail to open the full size)</em>
          </span>
          <div className={`modal-image ${openModal && 'active'}`}>
            <div className='modal-image__slide'>
              <div className='modal-image__view'>
                <button
                  className='image-slide__btn image-slide__btn--prev'
                  onClick={prevBtnHandler}
                >
                  <i className='bx bxs-chevron-left'></i>
                </button>

                <img
                  className='image-slide__content'
                  src={images[currentImg]}
                  alt='slide img'
                />

                <button
                  className='image-slide__btn image-slide__btn--next'
                  onClick={nextBtnHandler}
                >
                  <i className='bx bxs-chevron-right'></i>
                </button>
              </div>

              {/* todo: Add a list of thumbnails */}
              <div className='modal-image__list'></div>
            </div>

            {showButtons && (
              <div className='modal-image__buttons'>
                <button
                  className='btn btn-primary'
                  onClick={() => setCoverImage && setCoverImage(currentImg)}
                >
                  Set as cover image
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => {
                    if (deleteImage) {
                      deleteImage(currentImg);

                      if (currentImg === images.length - 1) {
                        setCurrentImg(0);
                      }
                    }
                  }}
                >
                  Remove
                </button>
              </div>
            )}

            <button
              className='modal-image__close-btn'
              onClick={() => setOpenModal(false)}
            >
              <i className='bx bx-x'></i>
            </button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default GalleryModal;
