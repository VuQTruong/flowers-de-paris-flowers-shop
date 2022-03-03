import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';
import { BASE_URL } from '../../../constants';

import { showLoadingModal } from '../../../utilities/helpers';

function ImagesUploader(props) {
  const { returnImages, multiFiles, className, folderName, title } = props;

  const uploadImagesHandler = (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    folderName && formData.append('cloudFolder', folderName);

    if (files.length !== 0) {
      files.forEach((image) => {
        formData.append('file', image);
      });

      showLoadingModal('Uploading images...');

      axios
        .post(`${BASE_URL}api/files/cloud-images`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true,
        })
        .then(({ data }) => {
          swal.close();

          returnImages(data.data.images);

          swal.fire({
            icon: 'success',
            title: 'Yay!...',
            text: 'Upload Images Successfully!',
          });
        })
        .catch((error) => {
          console.log(error);
          swal.fire({
            icon: 'error',
            title: 'Oops!...',
            text: error.response.data.message,
          });
        });
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: 'Files not found',
      });
    }
  };

  return (
    <div className={`image-uploader__container ${className ? className : ''}`}>
      <label
        htmlFor='imgUpload'
        className='btn btn-primary image-uploader__btn'
      >
        <i className='bx bx-upload'></i>
        {title ? title : 'Upload'}
      </label>
      <input
        type='file'
        multiple={multiFiles ? true : false}
        name='imgUpload'
        id='imgUpload'
        onChange={uploadImagesHandler}
      />
    </div>
  );
}

export default ImagesUploader;
