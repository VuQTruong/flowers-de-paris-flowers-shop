import React, { useState } from 'react';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../../config/axios';
import { dateFormat, getImageId } from '../../utilities/helpers';
import ImagesUploader from '../Admin/ImagesUploader/ImagesUploader';
import swal from 'sweetalert2';
import { updateAvatar } from '../../features/users/update-avatar';

function UserBriefInfo() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.currentUser);

  const [showAvatar, setShowAvatar] = useState(false);

  const deleteImage = async (image) => {
    try {
      // !the image is from another source other than cloudinary, we don't have to manage it
      if (!image.includes('res.cloudinary.com')) {
        return;
      }

      const imageId = getImageId(image);
      await Axios.delete(`/files/cloud-images?folder=users&id=${imageId}`);
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

  window.addEventListener('keyup', (e) => {
    if (e.code === 'Escape') {
      setShowAvatar(false);
    }
  });

  return (
    <section className='brief-info__container'>
      {!userInfo.avatar && (
        <Avatar
          className='brief-info__user-avatar'
          name={userInfo.name}
          round={true}
          size='100'
          textSizeRatio={3}
        />
      )}

      {userInfo.avatar && (
        <img
          src={userInfo.avatar}
          alt='User Avatar'
          className='brief-info__user-avatar-img'
          onClick={() => setShowAvatar(true)}
        />
      )}

      <div className={`modal-image ${showAvatar && 'active'}`}>
        <div className='modal-image__view'>
          <img
            className='image-slide__content'
            src={userInfo.avatar}
            alt='User Avatar'
          />
        </div>

        <button
          className='modal-image__close-btn'
          onClick={() => setShowAvatar(false)}
        >
          <i className='bx bx-x'></i>
        </button>
      </div>

      <ImagesUploader
        title='change'
        className='brief-info__btn-avatar'
        withoutIcon
        folderName='users'
        returnImages={async (images) => {
          // !delete previous avatar berfore updating new one
          if (userInfo.avatar) {
            deleteImage(userInfo.avatar);
          }

          // !update user's avatar
          dispatch(updateAvatar(images[0]));
        }}
      />

      <p className='brief-info__username'>{userInfo.name}</p>
      <p className='brief-info__joined-info'>
        Joined on
        <span className='joined-date'>
          {dateFormat.format(Date.parse(userInfo.createdAt))}
        </span>
      </p>
      <p className='brief-info__divider'>🔥🔥🔥🔥🔥🔥🔥</p>
    </section>
  );
}

export default UserBriefInfo;
