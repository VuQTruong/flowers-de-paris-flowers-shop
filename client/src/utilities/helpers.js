import swal from 'sweetalert2';

export const dateFormat = new Intl.DateTimeFormat('en-EN', {
  weekday: 'long',
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
});

export const dateWithoutWeekdayFormat = new Intl.DateTimeFormat('en-EN', {
  year: 'numeric',
  month: 'numeric',
  day: '2-digit',
});

export const currencyFormat = new Intl.NumberFormat('en-EN', {
  style: 'currency',
  currency: 'CAD',
});

export const roundHalf = (num) => {
  return Math.round(num * 2) / 2;
};

export const showLoadingModal = (title) => {
  swal.fire({
    title: title,
    allowOutsideClick: false,
    didOpen: () => {
      swal.showLoading();
    },
  });
};

export const sortByOrder = (a, b) => {
  if (a.order < b.order) {
    return -1;
  }

  if (a.order > b.order) {
    return 1;
  }

  return 0;
};

export const getImageId = (image) => {
  return image.split('/').pop().split('.')[0];
};

export const renderRatingStars = (rating) => {
  let count = 0;
  let content = [];

  for (let i = 1; i <= rating; i++) {
    content.push(
      <span key={count++}>
        <i className='bx bxs-star'></i>
      </span>
    );
  }

  if (!Number.isInteger(rating)) {
    content.push(
      <span key={count++}>
        <i className='bx bxs-star-half'></i>
      </span>
    );
  }

  for (let i = 1; i <= 5 - rating; i++) {
    content.push(
      <span key={count++}>
        <i className='bx bx-star'></i>
      </span>
    );
  }

  return content;
};
