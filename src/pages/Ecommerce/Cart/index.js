import React from 'react';

import { useCart } from '../../../contexts/Cart';
import CartItem from '../../../components/CartItem';

import './styles.css';

function Cart() {
  const { cartItems, totalAmount, totalCost, clearCart } = useCart();

  return (
    <div className="cart-container">
      <h2>Carrinho</h2>
      <div className="cart-info">
        <div className="cart-items">
          {cartItems.map((item, index) => (
            <CartItem key={item.id} product={item} index={index} />
          ))}
        </div>
        <div className="payment-info">
          <p>Total de items</p>
          <span>{totalAmount}</span>
          <p>Valor total</p>
          <span>R${totalCost.toFixed(2)}</span>
          <div className="payment-actions">
            <button>Confirmar</button>
            <span onClick={clearCart}>Limpar</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;