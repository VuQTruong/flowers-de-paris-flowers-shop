import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import Axios from '../../../config/axios';

import swal from 'sweetalert2';
import OrderDetails from '../../../components/OrderDetails/OrderDetails';

function ConfirmOrder() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.currentUser);

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scroll(0, 0);

    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await Axios.get(`/orders/${orderId}`);

        setOrder(data.data.order);
      } catch (error) {
        swal
          .fire({
            icon: 'info',
            title: 'Uh oh!...',
            text: error.response.data.message,
          })
          .then(() => {
            navigate('/user/orders');
          });
        setError(error.response.data.message);
      }

      setLoading(false);
    };

    if (!userInfo) {
      swal
        .fire({
          icon: 'warning',
          title: 'Oops!...',
          text: 'Please sign in to access this page',
        })
        .then(() => {
          navigate(`/signin?redirect=orders/${orderId}`);
        });
    } else {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <main className='container order-confirm__container'>
      {(loading || error) && <Loading />}
      {order && !error && (
        <React.Fragment>
          <h2 className='order-confirm__title'>Order confirmation</h2>

          <OrderDetails order={order} />
        </React.Fragment>
      )}
    </main>
  );
}

export default ConfirmOrder;
