import React from 'react';
import { Link } from 'react-router-dom';

function BreadCrumb({ crumbs }) {
  const isLast = (index) => {
    return index === crumbs.length - 1;
  };

  return (
    <nav>
      <ul className='breadcrumb flex'>
        {crumbs.map((crumb, index) => {
          return (
            <li key={index} className='breadcrumb__item flex'>
              {!isLast(index) ? (
                <React.Fragment>
                  <Link to={crumb.path} className='breadcrumb__link'>
                    {crumb.name}
                  </Link>

                  <span className='breadcrumb__divider'>
                    <i className='bx bxs-chevrons-right'></i>
                  </span>
                </React.Fragment>
              ) : (
                <span className='breadcrumb__link'>{crumb.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BreadCrumb;
