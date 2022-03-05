import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import Paginator from '../../../components/Paginator/Paginator';
import ProductCard from '../../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../../features/products/get-all-products';
import useCustomNavigate from '../../../hooks/use-custom-navigate';

function Search() {
  const customNavigate = useCustomNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { categories } = useSelector((state) => state.allCategories);

  const allProducts = useSelector((state) => state.allProducts);
  const { products, totalPages, currentPage, totalProducts, loading } =
    allProducts;

  const [tag, setTag] = useState('');
  const [color, setColor] = useState('');

  const [searchName, setSearchName] = useState('');
  const [sortField, setSortField] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [category, setCategory] = useState('all');

  // !dispatch action whenever the query string is changed
  useEffect(() => {
    window.scroll(0, 0);

    if (location.search) {
      // ?get search name
      const queryObj = Object.fromEntries([...searchParams]);
      setSearchName(queryObj.name);
      setTag(queryObj.tags);
      setColor(queryObj.colors);

      // ?set up filters
      setFilters(queryObj);

      dispatch(getAllProducts(searchParams.toString() + '&limit=14'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, location.search]);

  const renderCategoryOptions = () => {
    let options = [];

    let option = (
      <option key='0' value='all'>
        All
      </option>
    );
    options.push(option);

    if (categories && categories.length !== 0) {
      categories.forEach((item, index) => {
        let option = (
          <option key={index + 1} value={item.slug}>
            {item.name}
          </option>
        );
        options.push(option);
      });
    }

    return options;
  };

  const renderSortOrder = () => {
    switch (sortField) {
      case 'name':
        return (
          <React.Fragment>
            <option value='desc'>Z - A</option>
            <option value='asc'>A - Z</option>
          </React.Fragment>
        );
      case 'createdAt':
        return (
          <React.Fragment>
            <option value='desc'>Newest first</option>
            <option value='asc'>Oldest first</option>
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            <option value='desc'>Descending</option>
            <option value='asc'>Ascending</option>
          </React.Fragment>
        );
    }
  };

  const setFilters = (queryObj) => {
    queryObj.category ? setCategory(queryObj.category) : setCategory('all');

    if (queryObj.sort) {
      if (queryObj.sort.includes('-')) {
        setSortField(queryObj.sort.replace('-', ''));
        setSortOrder('desc');
      } else {
        setSortField(queryObj.sort);
        setSortOrder('asc');
      }
    }
  };

  const submitHandler = () => {
    const queryArr = [];
    queryArr.push(`name=${searchName}`);

    if (category !== 'all') {
      queryArr.push(`category=${category}`);
    }

    if (sortOrder === 'desc') {
      queryArr.push(`sort=-${sortField}`);
    } else if (sortOrder === 'asc') {
      queryArr.push(`sort=${sortField}`);
    }

    const queryStr = queryArr.join('&');
    navigate(`${location.pathname}?${queryStr}`);
  };

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

  return (
    <main className='container search__container'>
      <div className='search__status'>
        <MessageBox variant='info' fullWidth>
          Search results for&nbsp;
          <strong>{searchName ? searchName : tag ? tag : color}</strong>:&nbsp;
          <strong>
            {totalProducts} {totalProducts < 1 ? 'result' : 'results'}
          </strong>
        </MessageBox>
      </div>
      <div className='search__filter'>
        <div className='search__search-by flex'>
          <label htmlFor='sortField'>
            <i className='bx bx-target-lock'></i>Category
          </label>
          <select
            id='sortField'
            className='search__select-input'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {renderCategoryOptions()}
          </select>
        </div>

        <div className='search__sort-field flex'>
          <label htmlFor='sortField'>
            <i className='bx bx-list-ul'></i>Sort by
          </label>
          <select
            id='sortField'
            className='search__select-input'
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
            }}
          >
            <option value='createdAt'>Date</option>
            <option value='price'>Price</option>
            <option value='name'>Name</option>
          </select>
        </div>

        <div className='search__sort-order flex'>
          <label htmlFor='sortOrder'>
            <i className='bx bx-sort'></i>Order
          </label>
          <select
            id='sortOrder'
            className='search__select-input'
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
            }}
          >
            {renderSortOrder()}
          </select>
        </div>

        <button className='btn btn-primary search__btn' onClick={submitHandler}>
          Apply
        </button>
      </div>

      <div className='search__results product-panel'>
        {loading ? (
          <Loading />
        ) : (
          <React.Fragment>
            {products && products.length !== 0 ? (
              <React.Fragment>
                <div className='product-panel__list flex'>
                  {products.map((product) => (
                    <ProductCard data={product} key={product._id} />
                  ))}
                </div>

                <Paginator
                  className='search__paginator'
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onChange={(value) => pageChangeHandler(value)}
                />
              </React.Fragment>
            ) : (
              <MessageBox variant='info'>
                Uh oh!...There are no products with this name: {searchName}
              </MessageBox>
            )}
          </React.Fragment>
        )}
      </div>
    </main>
  );
}

export default Search;
