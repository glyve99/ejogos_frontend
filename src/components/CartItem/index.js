import React from 'react';

import { FiMinus, FiPlus, FiTrash } from 'react-icons/fi';
import { useCart } from '../../contexts/Cart';

import './styles.css';

function CartItem({ product, index }) {
  const { increaseAmount, decreaseAmount, removeItem } = useCart();

  return (
    <div className="cart-item">
      <div>
        <p>{product.name}</p>
        <span>R${(product.price).toFixed(2)}</span>
      </div>
      <div className="item-amount">
        <button
          disabled={product.amount === 1}
          title="Diminuir"
          type="button"
          onClick={() => decreaseAmount(index)}
        >
          <FiMinus />
        </button>
        {product.amount}
        <button
          title="Aumentar"
          type="button"
          onClick={() => increaseAmount(index)}>
          <FiPlus />
        </button>
      </div>
      <FiTrash
        className="remove-item"
        title="Remover"
        onClick={() => removeItem(product.id)}
      />
    </div>
  );
}

export default CartItem;