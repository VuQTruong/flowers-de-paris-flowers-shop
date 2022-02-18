import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItemToCart } from '../../features/cart/add-item';
import { removeItemFromCart } from '../../features/cart/remove-item';
import { currencyFormat } from '../../utilities/helpers';
import swal from 'sweetalert2';

function CartItem(props) {
  const product = props.data;

  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const decreaseQuantity = () => {
    if (quantity !== 1) {
      setQuantity(quantity - 1);
      dispatch(addItemToCart({ product, quantity: quantity - 1 }));
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(addItemToCart({ product, quantity: quantity + 1 }));
  };

  const deleteProductHandler = () => {
    swal
      .fire({
        icon: 'warning',
        title: 'Watch out!...',
        text: `Are you sure you want to remove ${product.name} from your cart?`,
        showCancelButton: true,
        showConfirmButton: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          dispatch(removeItemFromCart(product._id));
        }
      });
  };
  return (
    <div className='cart-item'>
      <img
        src={product.images[0]}
        alt={product.name}
        className='cart-item__image'
      />
      <Link
        to={`/products/${product.categorySlug}/${product.slug}`}
        target='_blank'
        className='cart-item__link'
      >
        {product.name}
      </Link>
      <div className='cart-item__qty flex'>
        <button onClick={decreaseQuantity} className='btn btn-qty'>
          <i className='bx bx-minus'></i>
        </button>
        <input
          type='text'
          value={quantity}
          className='quantity-value'
          readOnly
        ></input>
        <button onClick={increaseQuantity} className='btn btn-qty'>
          <i className='bx bx-plus'></i>
        </button>
      </div>
      <span className='cart-item__price product-price'>
        {currencyFormat.format(product.price * quantity)}
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
