import React from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import Paginator from '../../../components/Paginator/Paginator';
import MessageBox from '../../../components/MessageBox/MessageBox';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function ProductsList() {
  const customNavigate = useCustomNavigate();

  const allProducts = useSelector((state) => state.allProducts);
  const { products, totalPages, currentPage, loading } = allProducts;

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

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
                <MessageBox fullWidth>
                  Uh oh!...There are no products meeting your requirements
                </MessageBox>
              ) : (
                <React.Fragment>
                  <div className='products__list'>
                    {products.map((product) => (
                      <ProductCard key={product._id} data={product} />
                    ))}
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
        </div>
      </div>
    </main>
  );
}

export default ProductsList;
