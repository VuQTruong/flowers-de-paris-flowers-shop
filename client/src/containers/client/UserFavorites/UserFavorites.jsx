import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import ProductCard from '../../../components/ProductCard/ProductCard';
import Axios from '../../../config/axios';

function UserFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserFavorites = async () => {
      const { data } = await Axios.get('/users/favourites');
      setFavorites(data.data.favorites);
      setLoading(false);
    };

    fetchUserFavorites();
  }, []);

  return (
    <section className='user-fav__container'>
      <h3 className='user-fav__title'>My Favorites</h3>

      {loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          {favorites.length === 0 ? (
            <div className='user-fav__message'>
              <MessageBox>
                Sorry, you don't have any favorite items yet!{' '}
              </MessageBox>
              <Link to={'/products'} className='btn btn-primary'>
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className='user-fav__list'>
              {favorites.map((product) => (
                <ProductCard key={product._id} data={product} />
              ))}
            </div>
          )}
        </React.Fragment>
      )}
    </section>
  );
}

export default UserFavorites;
