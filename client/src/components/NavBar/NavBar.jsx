import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function NavBar() {
  const { categories } = useSelector((state) => state.allCategories);

  return (
    <nav className='header-nav'>
      <ul className='header-category flex'>
        <li className='dropdown'>
          <Link to='/products' className='header-category-link'>
            Shop
          </Link>
          <ul className='dropdown-menu'>
            {categories &&
              categories.map((category) => {
                return (
                  <li key={category.slug} className='dropdown-item'>
                    <Link to={`/products/${category.slug}`}>
                      {category.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </li>

        <li>
          <Link to='/blogs' className='header-category-link'>
            Blog
          </Link>
        </li>

        <li>
          <Link to='/about' className='header-category-link'>
            About us
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
