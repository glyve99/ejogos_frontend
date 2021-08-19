import React, { useEffect, useState } from 'react';
import { Link, Redirect, useParams } from 'react-router-dom';

import { FiArrowLeft } from 'react-icons/fi';
import api from '../../../services/api';
import Input from '../../../components/Input';
import { useProducts } from '../../../contexts/Products';

import './styles.css';
import { message } from 'antd';

function Details() {
  const [product, setProduct] = useState('');

  const [name, setName] = useState('');
  const [id_brand, setId_brand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  // const [image, setImage] = useState('');

  const { productId } = useParams();
  const { allProducts } = useProducts();

  function getProductInfo(id) {
    const found = allProducts.find(product => product.id === id);
    setName(found.name);
    setPrice(found.price.toFixed(2));
    setCategory(found.category);
    setDescription(found.description);
    setId_brand(found.id_brand);
    setProduct(found);
  }

  useEffect(() => {
    const id = parseInt(productId);
    getProductInfo(id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    message.loading({
      key: "editing",
      content: "Editando produto...",
      duration: 9999
    });

    try {
      const response = await api.put(`product/${product.id}`, {
        id_brand,
        name,
        description,
        price,
        category
      });
      if (response.status === 200) {
        message.destroy("editing");
        message.success("Produto editado com sucesso :)");
        return (
          <Redirect to="/dashboard/products" />
        )
      }
    } catch (error) {
      console.log(error);
      message.destroy("editing");
      message.error("Erro ao editar o produto, tente novamente...");
    }
  }

  return (
    product ? (
      <div className="details-container">
        <Link to="/dashboard/products"><FiArrowLeft /> Voltar</Link>
        <form onSubmit={handleSubmit}>
          <Input
            title="Nome"
            id="name"
            type="text"
            value={name}
            masked={false}
            onChange={e => setName(e.target.value)}
            required
          />
          <Input
            title="Preço"
            id="price"
            type="text"
            value={price}
            masked={false}
            onChange={e => setPrice(e.target.value)}
            required
          />
          <div className="double-column">
            <div className="column">
              <label htmlFor="category">Categoria</label>
              <select
                id="category"
                onChange={e => setCategory(e.target.value)}
                value={category}
                required
              >
                <option value="headset">Headset</option>
                <option value="mouse">Mouse</option>
                <option value="teclado">Teclado</option>
              </select>
            </div>
            <div className="column">
              <label htmlFor="brand">Marca</label>
              <select
                id="brand"
                onChange={e => setId_brand(e.target.value)}
                value={id_brand}
                required
              >
                <option value={1}>HyperX</option>
                <option value={2}>Logitech</option>
                <option value={3}>Razer</option>
              </select>
            </div>
          </div>
          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            rows="5"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          <button type="submit">Confirmar</button>
        </form>
      </div>
    ) : (
      <p>Carregando...</p>
    )
  );
}

export default Details;