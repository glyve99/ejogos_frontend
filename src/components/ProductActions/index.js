import React from 'react';
import { Link } from 'react-router-dom';

import { message, Skeleton } from 'antd';
import { FiEdit, FiTrash } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';

function ProductActions({ product }) {

  async function deleteProduct() {
    message.loading({
      key: "deleting",
      content: "Deletando...",
      duration: 9999
    });
    try {
      const response = await api.delete(`product/${product.id}`);
      if (response.status === 200) {
        message.destroy("deleting");
        window.location.reload();
      }
    } catch (error) {
      message.destroy("deleting");
      message.error("Erro ao deletar o produto...");
    }
  }
  return (
    <div className="product-actions-container">
      <Skeleton active loading={product ? false : true}>
        <img src={`/assets/${product.category}-${product.brand.name}.png`} alt={product.name} />
        <div>
          <p>{product.name}</p>
        </div>
        <Link to={`/dashboard/products/${product.id}`} className="actions-button">
          <FiEdit /> Editar
        </Link>
        <button type="button" className="actions-button" onClick={deleteProduct}>
          <FiTrash /> Excluir
        </button>
      </Skeleton>
    </div>
  );
}

export default ProductActions;