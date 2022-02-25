import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdProductsFilter from '../../../components/Admin/AdProductsFilter/AdProductsFilter';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Paginator from '../../../components/Paginator/Paginator';
import useCustomNavigate from '../../../hooks/use-custom-navigate';
import { currencyFormat } from '../../../utilities/helpers';

function AdProducts() {
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

  const activateProduct = () => {};

  const deleteProduct = () => {};

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
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
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
                      <th>Price</th>
                      <th>Sale Off</th>
                      <th>Category</th>
                      <th className='ad-products__hide'>Status</th>
                      <th className='ad-products__delete'>#</th>
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
                          data-label='Price'
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
                        <td data-label='Hide' className='ad-products__hide'>
                          {product.isActive ? (
                            <button
                              className='btn btn-primary admin-users__btn admin-users__btn--active'
                              onClick={() =>
                                activateProduct(product._id, product.isActive)
                              }
                            >
                              Active
                            </button>
                          ) : (
                            <button
                              className='btn btn-primary admin-users__btn admin-users__btn--hide'
                              onClick={() =>
                                activateProduct(product._id, product.isActive)
                              }
                            >
                              Hidden
                            </button>
                          )}
                        </td>
                        <td data-label='#' className='ad-products__delete'>
                          <button
                            className='btn btn-danger admin-users__btn'
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
