import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdProductsFilter from '../../../components/Admin/AdProductsFilter/AdProductsFilter';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Paginator from '../../../components/Paginator/Paginator';
import Axios from '../../../config/axios';
import { adGetAllProducts } from '../../../features/products/ad-get-all-products';
import useCustomNavigate from '../../../hooks/use-custom-navigate';
import { currencyFormat, showLoadingModal } from '../../../utilities/helpers';
import swal from 'sweetalert2';

function AdProducts() {
  const dispatch = useDispatch();
  const customNavigate = useCustomNavigate();

  const allProducts = useSelector((state) => state.allProducts);
  const { products, totalPages, currentPage, loading, error } = allProducts;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

  const setProductStatusHandler = async (productId) => {
    try {
      showLoadingModal('Updating product status...');

      await Axios.patch(`/products/setstatus/${productId}`);

      swal.close();
      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: `Product's status is set successfully`,
        })
        .then(() => {
          dispatch(adGetAllProducts());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const deleteProduct = async (productId) => {
    try {
      swal
        .fire({
          icon: 'warning',
          title: 'Watch out!...',
          text: 'Are you sure you want to remove this product?',
          showCancelButton: true,
          showConfirmButton: true,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            showLoadingModal('Deleting product...');

            await Axios.delete(`/products/${productId}`);

            swal.close();
            swal
              .fire({
                icon: 'success',
                title: 'Yay!...',
                text: `Product is deleted successfully`,
              })
              .then(() => {
                dispatch(adGetAllProducts());
              });
          }
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <main className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Products Management</h2>
        <Link
          to='/admin/products/add'
          className='btn btn-primary dashboard__btn'
        >
          <i className='bx bxs-add-to-queue'></i>
          <span>Add new product</span>
        </Link>
      </div>

      {/* Products Filter */}
      <AdProductsFilter />

      {/* Products Table */}
      {loading && <Loading />}
      {error && (
        <MessageBox variant='danger' fullWidth>
          {error}
        </MessageBox>
      )}
      {products && (
        <React.Fragment>
          {products.length === 0 ? (
            <MessageBox variant='info' fullWidth>
              There are no products to show
            </MessageBox>
          ) : (
            <React.Fragment>
              <div className='table__container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th className='ad-products__id'>Product Id</th>
                      <th>Cover Image</th>
                      <th>Product</th>
                      <th>Original Price</th>
                      <th>Sale Off</th>
                      <th>Category</th>
                      <th>Views</th>
                      <th>Status</th>
                      <th>Set Status</th>
                      <th>#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td data-label='Product Id' className='ad-products__id'>
                          {product._id}
                        </td>
                        <td data-label='Cover Image' className=''>
                          <img
                            src={product.coverImage}
                            alt={product.name}
                            className='ad-products__img'
                          />
                        </td>
                        <td data-label='Product'>
                          <Link
                            to={`/admin/products/edit/${product._id}`}
                            className='ad-products__name'
                          >
                            {product.name}
                          </Link>
                        </td>
                        <td
                          data-label='Original Price'
                          className='ad-products_price product-price product-price--small'
                        >
                          {currencyFormat.format(product.price)}
                        </td>
                        <td
                          data-label='Sale Off'
                          className='ad-products_price product-price product-price--small'
                        >
                          {product.discount !== 0
                            ? currencyFormat.format(product.saleOffPrice)
                            : '-'}
                        </td>

                        <td data-label='Category'>{product.category.name}</td>
                        <td data-label='Views'>
                          <div className='table__cell--center ad-products__views'>
                            <i className='bx bx-show'></i>
                            {product.views}
                          </div>
                        </td>

                        <td data-label='Status'>
                          <p
                            className='order-details__status user-orders__status'
                            style={{
                              '--status-color': `${
                                product.isActive ? '#6bc839' : '#d9534f'
                              }`,
                            }}
                          >
                            {product.isActive ? 'Active' : 'Inactive'}
                          </p>
                        </td>
                        <td data-label='Set Status'>
                          <div className='table__cell--center'>
                            {!product.isActive ? (
                              <button
                                className='btn btn-primary ad-users__btn ad-users__btn--active'
                                onClick={() =>
                                  setProductStatusHandler(product._id)
                                }
                              >
                                Activate
                              </button>
                            ) : (
                              <button
                                className='btn btn-primary ad-users__btn ad-users__btn--hide'
                                onClick={() =>
                                  setProductStatusHandler(product._id)
                                }
                              >
                                Deactivate
                              </button>
                            )}
                          </div>
                        </td>
                        <td data-label='#' className='ad-products__delete'>
                          <button
                            className='btn btn-danger ad-products__btn'
                            onClick={() =>
                              deleteProduct(product._id, product.images)
                            }
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Paginator
                className='products__paginator'
                totalPages={totalPages}
                currentPage={currentPage}
                onChange={(value) => pageChangeHandler(value)}
              />
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </main>
  );
}

export default AdProducts;
