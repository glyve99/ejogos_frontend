import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../../contexts/Cart';
import Button from '../Button';
import ProductModal from '../ProductModal';

import './styles.css';

function ProductCard({ product }) {
  const [isInCart, setIsInCart] = useState(false);

  const { cartItems, addItem } = useCart();

  useEffect(() => {
    if (cartItems.find(item => item.id === product.id)) {
      setIsInCart(true);
    } else {
      setIsInCart(false);
    }
  }, [cartItems]);

  return (
    <div className="product-card">
      <img
        src={`/assets/${product.category}-${product.brand.name}.png`}
        alt={product.name}
      />
      <p>{product.name}</p>
      <span>R${(product.price).toFixed(2)}</span>
      <div className="product-actions">
        <ProductModal product={product} isAdded={isInCart} />
        {isInCart ? (
          <Link to="/cart">Ver carrinho</Link>
        ) : (
          <Button
            title="Adicionar"
            type="button"
            onClick={() => addItem(product)} />
        )}
      </div>
    </div>
  );
}

export default ProductCard;