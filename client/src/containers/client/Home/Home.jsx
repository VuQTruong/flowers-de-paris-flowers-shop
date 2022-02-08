import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { fetchProducts } from '../../../features/products/fetch-products';

function Home() {
  const dispatch = useDispatch();

  const allProducts = useSelector((state) => state.allProducts);
  const { products } = allProducts;

  useEffect(() => {
    dispatch(fetchProducts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className='container home__container'>
      {products && products.map((product) => <ProductCard data={product} />)}
    </main>
  );
}

export default Home;
