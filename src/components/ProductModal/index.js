import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Modal } from 'antd';
import { useCart } from '../../contexts/Cart';
import Button from '../Button';

import './styles.css';

function ProductModal({ product, isAdded }) {
  const [isVisible, setIsVisible] = useState(false);

  const { addItem } = useCart();

  return (
    <div className="modal-container">
      <span onClick={() => setIsVisible(true)}>Detalhes</span>
      <Modal
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        centered={true}
        footer={null}
      >
        <div className="modal-content">
          <div className="product-info">
            <img
              src={`/assets/${product.category}-${product.brand.name}.png`}
              alt={product.name}
            />
            <div className="product-text-info">
              <p>{product.name}</p>
              <p>{product.brand.name}</p>
              <span>R${product.price.toFixed(2)}</span>
              {isAdded ? (
                <Link to="/cart">Ver carrinho</Link>
              ) : (
                <Button
                  title="Adicionar"
                  type="button"
                  onClick={() => addItem(product)}
                />
              )}
            </div>
          </div>
          <div className="product-description">
            <h2>Descrição</h2>
            <p>{product.description}</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ProductModal;