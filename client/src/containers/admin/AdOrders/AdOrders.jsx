import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AdOrderFilters from '../../../components/Admin/AdOrdersFilter/AdOrderFilters';
import Loading from '../../../components/Loading/Loading';
import MessageBox from '../../../components/MessageBox/MessageBox';
import OrderDetails from '../../../components/OrderDetails/OrderDetails';
import Paginator from '../../../components/Paginator/Paginator';
import useCustomNavigate from '../../../hooks/use-custom-navigate';
import {
  currencyFormat,
  dateWithoutWeekdayFormat,
} from '../../../utilities/helpers';
import Axios from '../../../config/axios';
import swal from 'sweetalert2';
import { adGetAllOrders } from '../../../features/orders/ad-get-all-orders';

function AdOrders() {
  const dispatch = useDispatch();
  const customNavigate = useCustomNavigate();

  const orderDetails = useRef();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const allOrders = useSelector((state) => state.allOrders);
  const { orders, totalPages, currentPage, loading, error } = allOrders;

  useEffect(() => {
    if (!selectedOrder) {
      window.scroll(0, 0);
    } else {
      orderDetails.current.scrollIntoView();
    }
  }, [selectedOrder]);

  const pageChangeHandler = (value) => {
    customNavigate({
      page: value,
    });
  };

  const generateProducts = (orderItems) => {
    let productsStr = [];

    orderItems.forEach((item) => {
      productsStr.push(item.name);
    });

    return productsStr.join(', ');
  };

  const setPaymentStatus = async (orderId) => {
    try {
      const date = new Date();
      await Axios.patch(`/orders/ad/${orderId}`, {
        isPaid: true,
        paidAt: date.toISOString(),
      });

      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: 'Payment status is updated successfully',
        })
        .then(() => {
          dispatch(adGetAllOrders());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  const setOrderStatus = async (e, orderId) => {
    try {
      const updateInfo = {
        status: e.target.value,
      };

      if (e.target.value === 'Delivered') {
        updateInfo.isDelivered = true;
      }

      await Axios.patch(`/orders/ad/${orderId}`, updateInfo);

      swal
        .fire({
          icon: 'success',
          title: 'Yay!...',
          text: 'Order status is updated successfully',
        })
        .then(() => {
          dispatch(adGetAllOrders());
        });
    } catch (error) {
      swal.fire({
        icon: 'error',
        title: 'Oops!...',
        text: error.response.data.message,
      });
    }
  };

  return (
    <div className='dashboard__container'>
      <div className='dashboard__header'>
        <h2 className='dashboard__title'>Orders Management</h2>
      </div>

      <AdOrderFilters />

      {loading && <Loading />}
      {error && (
        <MessageBox variant='danger' fullWidth>
          {error}
        </MessageBox>
      )}
      {orders && (
        <React.Fragment>
          {orders.length === 0 ? (
            <MessageBox variant='info' fullWidth>
              There are no orders to show
            </MessageBox>
          ) : (
            <React.Fragment>
              <div className='table__container'>
                <table className='table'>
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Date</th>
                      <th>Products</th>
                      <th>Total Price</th>
                      <th>Payment Status</th>
                      <th>Status</th>
                      <th>Set Payment</th>
                      <th>Set Status</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td data-label='Order Id'>{order.orderId}</td>
                        <td data-label='Date' className=''>
                          {dateWithoutWeekdayFormat.format(
                            Date.parse(order.createdAt)
                          )}
                        </td>
                        <td data-label='Products'>
                          <p>{generateProducts(order.orderItems)}</p>
                        </td>
                        <td
                          data-label='Total Price'
                          className='ad-products_price product-price product-price--small'
                        >
                          {currencyFormat.format(order.price)}
                        </td>

                        <td data-label='Payment Status'>
                          <p
                            className='order-details__status user-orders__status'
                            style={{
                              '--status-color': `${
                                order.isPaid ? '#6bc839' : '#d9534f'
                              }`,
                            }}
                          >
                            {order.isPaid
                              ? `Paid on ${dateWithoutWeekdayFormat.format(
                                  Date.parse(order.paidAt)
                                )}`
                              : 'Not paid'}
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
                        <td data-label='Set Payment'>
                          {order.isPaid ? (
                            <button
                              className='btn btn-primary dashboard__table-btn'
                              disabled
                            >
                              N/A
                            </button>
                          ) : (
                            <button
                              className='btn btn-primary dashboard__table-btn '
                              onClick={() => setPaymentStatus(order._id)}
                            >
                              Set Paid
                            </button>
                          )}
                        </td>
                        <td data-label='Set Status'>
                          <select
                            id='setStatus'
                            className='dashboard__select-input ad-orders__select-status'
                            value={order.status}
                            onChange={(e) => setOrderStatus(e, order._id)}
                          >
                            <option value='Pending'>Pending</option>
                            <option value='Delivered'>Delivered</option>
                            <option value='Cancelled'>Cancelled</option>
                          </select>
                        </td>
                        <td
                          data-label=''
                          className='user-orders__table-details'
                        >
                          <div className='table__cell--center'>
                            <button
                              className='btn btn-primary dashboard__table-btn'
                              onClick={() => setSelectedOrder(order)}
                            >
                              Details
                            </button>
                          </div>
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

              {selectedOrder && (
                <section
                  ref={orderDetails}
                  className='container ad-order-details__container'
                >
                  <div className='ad-order-details__header'>
                    <h3 className='ad-order-details__title'>Order details</h3>
                    <button
                      className='btn btn-primary'
                      onClick={() => setSelectedOrder(null)}
                    >
                      Hide
                    </button>
                  </div>
                  <OrderDetails order={selectedOrder} hideShoppingBtn />
                </section>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default AdOrders;
