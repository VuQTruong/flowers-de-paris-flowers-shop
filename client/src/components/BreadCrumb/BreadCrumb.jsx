import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getCategoryBySlug } from '../../features/categories/get-category-by-slug';
import { resetCurrentCategory } from '../../features/categories/slices/current-category-slice';

function BreadCrumb() {
  const dispatch = useDispatch();
  const location = useLocation();

  const [crumbs, setCrumbs] = useState([]);

  const { category } = useSelector((state) => state.currentCategory);
  const { product } = useSelector((state) => state.currentProduct);

  // !listen for location change
  // !send request to get category info if category changed
  useEffect(() => {
    const pathnameItems = location.pathname.split('/');

    if (pathnameItems.length === 3) {
      dispatch(getCategoryBySlug(pathnameItems[2]));
    }
  }, [dispatch, location]);

  // !update crumbs object
  useEffect(() => {
    const pathnameItems = location.pathname.split('/');

    const crumbsArray = [{ name: 'Home', path: '/' }];

    if (pathnameItems.length === 2) {
      crumbsArray.push({ name: 'All Products', path: location.pathname });
    } else if (pathnameItems.length === 3) {
      if (category) {
        crumbsArray.push({
          name: category.name,
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
  }, [location, category, product]);

  // !clear category when component unmount
  useEffect(() => {
    return () => {
      dispatch(resetCurrentCategory());
    };
  }, [dispatch]);

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
