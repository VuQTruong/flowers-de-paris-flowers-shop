import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import ProductCard from '../../../components/ProductCard/ProductCard';
import ProductsFilter from '../ProductsFilter/ProductsFilter';
import { getProductsByCategorySlug } from '../../../features/products/get-products-by-category-slug';
import Paginator from '../../../components/Paginator/Paginator';

function ProductsList() {
  const dispatch = useDispatch();
  const { categorySlug } = useParams();

  const allProducts = useSelector((state) => state.allProducts);
  const { products, loading } = allProducts;

  useEffect(() => {
    dispatch(getProductsByCategorySlug(categorySlug));
  }, [categorySlug, dispatch]);

  const pageHandler = (page) => {};

  return (
    <main className='container'>
      <div className='products__container'>
        <div className='products__filter-panel'>
          <ProductsFilter />
        </div>

        <div className='products__panel'>
          {loading ? (
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
                    currentPage={4}
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
