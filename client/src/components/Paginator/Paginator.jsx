import React from 'react';

function Paginator(props) {
  const { className, onChange, totalPages, currentPage } = props;

  const onPageClickHandler = (e) => {
    onChange(e.target.innerText);
  };

  const nextPageHandler = () => {
    onChange(currentPage + 1);
  };

  const prevPageHandler = () => {
    onChange(currentPage - 1);
  };

  const renderPaginator = () => {
    let nodes = [];
    const pagesLeft = totalPages - currentPage;

    if (pagesLeft <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        let node = (
          <button
            key={i}
            className={`paginator__btn paginator__btn--page ${
              i === currentPage ? 'active' : ''
            }`}
            onClick={onPageClickHandler}
          >
            {i}
          </button>
        );
        nodes.push(node);
      }
    } else {
      for (let i = currentPage; i <= currentPage + 2; i++) {
        let node = (
          <button
            key={i}
            className={`paginator__btn paginator__btn--page ${
              i === currentPage ? 'active' : ''
            }`}
            onClick={onPageClickHandler}
          >
            {i}
          </button>
        );
        nodes.push(node);
      }

      let node = (
        <button key='0' className='paginator__btn paginator__btn--dots'>
          ...
        </button>
      );
      nodes.push(node);

      for (let i = totalPages - 1; i <= totalPages; i++) {
        let node = (
          <button
            key={i}
            className={`paginator__btn paginator__btn--page ${
              i === currentPage ? 'active' : ''
            }`}
            onClick={onPageClickHandler}
          >
            {i}
          </button>
        );
        nodes.push(node);
      }
    }

    return nodes;
  };

  return (
    <div className={`paginator ${className}`}>
      <button
        className={`paginator__btn paginator__btn--navigate paginator__btn--prev ${
          currentPage === 1 ? 'disable' : ''
        }`}
        disable={currentPage === 1 ? 'true' : 'false'}
        onClick={prevPageHandler}
      >
        <i className='bx bx-chevrons-left'></i>
      </button>

      {renderPaginator()}

      <button
        className={`paginator__btn paginator__btn--navigate paginator__btn--next ${
          currentPage === totalPages ? 'disable' : ''
        }`}
        disable={currentPage === totalPages ? 'true' : 'false'}
        onClick={nextPageHandler}
      >
        <i className='bx bx-chevrons-right'></i>
      </button>
    </div>
  );
}

export default Paginator;
