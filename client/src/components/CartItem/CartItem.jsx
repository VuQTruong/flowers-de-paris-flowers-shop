import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { currencyFormat } from '../../utilities/helpers';

function CartItem(props) {
  const product = props.data;
  const dispatch = useDispatch();
  const [qty, setQty] = useState(product.qty);

  const decreaseQty = () => {
    if (qty !== 1) {
      setQty(qty - 1);
      //   dispatch(addToCart(product, qty - 1));
    }
    // else {
    //   deleteProductHandler();
    // }
  };

  const increaseQty = () => {
    setQty(qty + 1);
    // dispatch(addToCart(product, qty + 1));
  };

  const deleteProductHandler = () => {
    // dispatch(deleteItemFromCart(product._id));
  };
  return (
    <div className='cart-item'>
      <img
        src={product.images[0]}
        alt={product.name}
        className='cart-item__image'
      />
      <Link
        to={`/products/${product.category}/${product._id}`}
        target='_blank'
        className='cart-item__link'
      >
        {product.name}
      </Link>
      <div className='cart-item__qty flex'>
        <button onClick={decreaseQty} className='btn btn-qty'>
          <i className='bx bx-minus'></i>
        </button>
        <input
          type='text'
          value={qty}
          className='quantity-value'
          readOnly
        ></input>
        <button onClick={increaseQty} className='btn btn-qty'>
          <i className='bx bx-plus'></i>
        </button>
      </div>
      <span className='cart-item__price product-price'>
        {currencyFormat.format(product.price * qty)}
      </span>
      <button
        type='button'
        className='btn cart-item__delete-btn'
        onClick={deleteProductHandler}
      >
        <i className='bx bx-trash'></i>
      </button>
    </div>
  );
}

export default CartItem;
