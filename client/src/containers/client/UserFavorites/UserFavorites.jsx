import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../components/Loading/Loading';
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
            <div className='user-fav__list'>
              <p>There are no favorites</p>
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
