import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

function BreadCrumb() {
  const location = useLocation();
  const [crumbs, setCrumbs] = useState([]);

  const { products } = useSelector((state) => state.allProducts);
  const { product } = useSelector((state) => state.currentProduct);

  useEffect(() => {
    const pathnameItems = location.pathname.split('/');

    const crumbsArray = [{ name: 'Home', path: '/' }];

    if (pathnameItems.length === 2) {
      crumbsArray.push({ name: 'All Products', path: location.pathname });
    } else if (pathnameItems.length === 3) {
      if (products) {
        crumbsArray.push({
          name: products[0].category.name,
          path: location.pathname,
        });
      }
    } else if (pathnameItems.length === 4) {
      if (product) {
        pathnameItems.pop();

        crumbsArray.push({
          name: product.category.name,
          path: pathnameItems.join('/'),
        });

        crumbsArray.push({
          name: product.name,
          path: location.pathname,
        });
      }
    }

    setCrumbs([...crumbsArray]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, products, product]);

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
                <span className='breadcrumb__link inactive'>{crumb.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default BreadCrumb;
