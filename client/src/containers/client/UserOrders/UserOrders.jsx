import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAllOrders } from '../../../features/orders/get-all-orders';
import {
  currencyFormat,
  dateWithoutWeekdayFormat,
} from '../../../utilities/helpers';
import { Link } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';

function UserOrders() {
  const dispatch = useDispatch();

  const { orders, loading, error } = useSelector((state) => state.allOrders);

  useEffect(() => {
    window.scroll(0, 0);

    dispatch(getAllOrders());
  }, [dispatch]);

  const generateProducts = (orderItems) => {
    let productsStr = [];

    orderItems.forEach((item) => {
      productsStr.push(item.name);
    });

    return productsStr.join(', ');
  };

  return (
    <section className='user-orders__container'>
      <h3 className='user-fav__title'>My Orders</h3>

      {loading && <Loading />}
      {error && <MessageBox variant='danger'>{error}</MessageBox>}
      {orders && (
        <section className='table__container user-orders__table'>
          <table className='table'>
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Date</th>
                <th className='user-orders__order-items'>Products</th>
                <th>Total Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.orderId}>
                    <td data-label='Order Id'>{order.orderId}</td>
                    <td data-label='Date'>
                      {dateWithoutWeekdayFormat.format(
                        Date.parse(order.createdAt)
                      )}
                    </td>
                    <td
                      data-label='Products'
                      className='user-orders__order-items'
                    >
                      <p>{generateProducts(order.orderItems)}</p>
                    </td>
                    <td data-label='Total Price'>
                      <p className='order-details__price'>
                        {currencyFormat.format(order.totalPrice)}
                      </p>
                    </td>
                    <td data-label='Status'>
                      <p
                        className='order-details__status user-orders__status'
                        style={{
                          '--status-color': `${
                            order.status === 'Pending'
                              ? '#f0ad4e'
                              : order.status === 'Delivered'
                              ? '#6bc839'
                              : order.status === 'Cancelled' && '#d9534f'
                          }`,
                        }}
                      >
                        {order.status}
                      </p>
                    </td>
                    <td data-label='' className='user-orders__table-details'>
                      <Link
                        to={`/user/orders/${order.orderId}`}
                        className='btn btn-primary '
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      )}
    </section>
  );
}

export default UserOrders;
