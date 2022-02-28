import axios from 'axios';
import React from 'react';
import swal from 'sweetalert2';

import { showLoadingModal } from '../../../utilities/helpers';

function ImagesUploader(props) {
  const { returnImages, multiFiles, className, folderName } = props;

  const uploadImagesHandler = (e) => {
    const files = Array.from(e.target.files);

    const formData = new FormData();
    formData.append('folder', 'categories');

    if (files.length !== 0) {
      files.forEach((image) => {
        formData.append('file', image);
        folderName && formData.append('cloudFolder', folderName);
      });

      showLoadingModal('Uploading images...');

      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/api/files/cloud-images`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            withCredentials: true,
          }
        )
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
    <div className={`image-uploader__container ${className && className}`}>
      <label
        htmlFor='imgUpload'
        className='btn btn-primary image-uploader__btn'
      >
        <i className='bx bx-upload'></i>
        Upload
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
