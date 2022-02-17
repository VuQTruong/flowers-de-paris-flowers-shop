import React from 'react';
import CartItem from '../../../components/CartItem/CartItem';
import MessageBox from '../../../components/MessageBox/MessageBox';

function Cart() {
  //     const calculateTotalPrice = () => {
  //         let totalPrice = 0;
  //         cart.cartItems.forEach((item) => (totalPrice += item.price * item.qty));
  //         return totalPrice;
  //       };

  //       const calculateTotalProducts = () => {
  //         let totalProduct = 0;
  //         cart.cartItems.forEach((item) => (totalProduct += item.qty));
  //         return totalProduct;
  //       };

  //   return (
  //     <main className='container cart-panel flex'>
  //       <div className='cart-list'>
  //         <h2>Your cart</h2>
  //         <div className='divider'></div>
  //         {cart.cartItems.length > 0 ? (
  //           cart.cartItems.map((item, index) => (
  //             <div key={index}>
  //               <CartItem data={item} />
  //               {index !== cart.cartItems.length - 1 && (
  //                 <div className='divider'></div>
  //               )}
  //             </div>
  //           ))
  //         ) : (
  //           <MessageBox>Chưa có sản phẩm trong giỏ hàng</MessageBox>
  //         )}
  //       </div>

  //       <div className='cart-checkout flex col col-3'>
  //         <h2>Order Information</h2>
  //         <div className='divider'></div>
  //         <div className='cart-quantity flex'>
  //           <span style={{ fontWeight: 'bold' }}>Total products</span>
  //           <span style={{ fontStyle: 'italic' }}>
  //             {calculateTotalProducts()} products
  //           </span>
  //         </div>
  //         <div className='cart-total flex'>
  //           <span style={{ fontWeight: 'bold' }}>Total</span>
  //           <span className='cart-total__price product-price'>
  //             {currencyFormat.format(calculateTotalPrice())}
  //           </span>
  //         </div>
  //         <div className='divider'></div>
  //         {cart.cartItems.length === 0 ? (
  //           <button
  //             type='button'
  //             className='btn btn-disable'
  //             onClick={recipientInfoHandler}
  //             disabled
  //           >
  //             Order
  //           </button>
  //         ) : (
  //           <button
  //             type='button'
  //             className='btn btn-cta'
  //             onClick={recipientInfoHandler}
  //           >
  //             Order
  //           </button>
  //         )}
  //       </div>
  //     </main>
  //   );

  return <div className='container'>Cart Screen</div>;
}

export default Cart;
