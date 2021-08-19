import React, { useState } from 'react';
import api from '../../services/api';
import { message, Modal } from 'antd';
import Input from '../Input';
import './styles.css';
import { FiPlus } from 'react-icons/fi';

function AddProduct() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [id_brand, setId_Brand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  // const [image, setImage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    message.loading({
      key: "adding",
      content: "Adicionando produto...",
      duration: 9999
    });

    try {
      const response = await api.post(`product`, {
        id_brand,
        name,
        description,
        price,
        category
      });
      if (response.status === 201) {
        message.destroy("adding");
        setIsVisible(false);
        message.success("Produto adicionado com sucesso :)");
      }
    } catch (error) {
      console.log(error);
      message.destroy("adding");
      message.error("Erro ao adicionar o produto, tente novamente...");
    }
  }

  return (
    <div className="modal-container">
      <button type="button" onClick={() => setIsVisible(true)}>
        <FiPlus />
      </button>
      <Modal
        visible={isVisible}
        onOk={() => setIsVisible(false)}
        onCancel={() => setIsVisible(false)}
        centered={true}
        footer={null}
      >
        <div className="add-product-container">
          <h2>Adicionar produto</h2>
          <form onSubmit={handleSubmit}>
            <Input
              title="Nome"
              id="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <Input
              title="Preço"
              id="price"
              type="text"
              value={price}
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
                  <option value="acao">Ação</option>
                  <option value="rpg">RPG</option>
                  <option value="aventura">Aventura</option>
                  <option value="corrida">Corrida</option>
                  <option value="novos">Novos</option>
                </select>
              </div>
              <div className="column">
                <label htmlFor="brand">Marca</label>
                <select
                  id="brand"
                  onChange={e => setId_Brand(e.target.value)}
                  value={id_brand}
                  required
                >
                  <option value={1}>PC</option>
                  <option value={2}>P</option>
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
            <label className="image-input-label" htmlFor="image">Imagem</label>
            <input className="image-input" id="image" type="file" />
            <button type="submit">Adicionar</button>
          </form>
        </div>
      </Modal>
    </div>
  )
}

export default AddProduct;