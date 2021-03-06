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

    if (totalPages <= 7) {
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
      let node;
      if (currentPage - 3 < 1 || currentPage + 3 > totalPages) {
        // render the first three pages
        for (let i = 1; i <= 3; i++) {
          node = (
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

        node = (
          <button key='0' className='paginator__btn paginator__btn--dots'>
            ...
          </button>
        );
        nodes.push(node);

        // render the last three pages
        for (let i = totalPages - 2; i <= totalPages; i++) {
          node = (
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
        node = (
          <React.Fragment>
            <button
              key={1}
              className='paginator__btn paginator__btn--page'
              onClick={onPageClickHandler}
            >
              1
            </button>
            <button key='0' className='paginator__btn paginator__btn--dots'>
              ...
            </button>
          </React.Fragment>
        );
        nodes.push(node);

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          node = (
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

        node = (
          <React.Fragment>
            <button
              key={totalPages + 1}
              className='paginator__btn paginator__btn--dots'
            >
              ...
            </button>
            <button
              key={totalPages}
              className='paginator__btn paginator__btn--page'
              onClick={onPageClickHandler}
            >
              {totalPages}
            </button>
          </React.Fragment>
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
        onClick={prevPageHandler}
      >
        <i className='bx bx-chevrons-left'></i>
      </button>

      {renderPaginator()}

      <button
        className={`paginator__btn paginator__btn--navigate paginator__btn--next ${
          currentPage === totalPages ? 'disable' : ''
        }`}
        onClick={nextPageHandler}
      >
        <i className='bx bx-chevrons-right'></i>
      </button>
    </div>
  );
}

export default Paginator;
