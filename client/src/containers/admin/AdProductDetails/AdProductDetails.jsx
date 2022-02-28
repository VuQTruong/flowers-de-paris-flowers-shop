import React from 'react';
import { Link, useParams } from 'react-router-dom';

function AdProductDetails() {
  const { productId } = useParams();

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <Link to='/admin/products' className='btn btn-primary dashboard__btn'>
          <i className='bx bx-arrow-back'></i>
          <span>Back</span>
        </Link>
        <h2 className='dashboard__title'>
          {productId ? 'Edit Product' : 'Create new product'}
        </h2>
      </div>
    </div>
  );
}

export default AdProductDetails;
