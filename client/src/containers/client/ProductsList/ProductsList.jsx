import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Paginator from '../../../components/Paginator/Paginator';

function ProductsList() {
  const allProducts = useSelector((state) => state.allProducts);
  const { products, loading } = allProducts;

  const pageHandler = (page) => {};

  return (
    <main className='container'>
      <div className='products__container'>
        <div className='products__filter-panel'>
          <ProductsFilter />
        </div>

        <div className='products__panel'>
          {loading || !products ? (
            <Loading />
          ) : (
            <React.Fragment>
              {products && products.length === 0 ? (
                <p>There are no products on this category</p>
              ) : (
                <React.Fragment>
                  <div className='products__list'>
                    {products.map((product) => (
                      <ProductCard key={product._id} data={product} />
                    ))}
                  </div>

                  <Paginator
                    className='products__paginator'
                    onChange={(page) => pageHandler(page)}
                    totalPages={20}
                    currentPage={3}
                  />
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProductsList;
