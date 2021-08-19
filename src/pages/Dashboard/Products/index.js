import React, { useEffect, useState } from 'react';

import { useProducts } from '../../../contexts/Products';
import { message } from 'antd';
import { FiArrowUp, FiSearch } from 'react-icons/fi';
import AddProduct from '../../../components/AddProduct';
import ProductActions from '../../../components/ProductActions';

import './styles.css';

function Products() {
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { allProducts, getProducts, hasMoreProducts } = useProducts();

  useEffect(() => {
    setLoading(true);

    setFilteredProducts(allProducts);

    setLoading(false);
  }, [allProducts]);

  function loadMoreProducts() {
    const newPage = page + 1;
    getProducts(newPage, limit);
    setPage(newPage);
  }

  function checkScrollTop() {
    if (!showScrollTop && window.pageYOffset > 470) {
      setShowScrollTop(true);
    } else if (showScrollTop && window.pageYOffset <= 470) {
      setShowScrollTop(false);
    }
  };

  window.addEventListener('scroll', checkScrollTop);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function searching() {
    setLoading(true);
    message.loading({
      key: "searching",
      content: "Pesquisando produtos...",
      duration: 9999
    });

    if (search === '') {
      setFilteredProducts(allProducts);
    } else {
      let tempFilteredProducts = [];
      allProducts.forEach(product => {
        if ((product.name).toLowerCase().includes(search.toLowerCase())) {
          tempFilteredProducts.push(product);
        } else { }
      });
      setFilteredProducts(tempFilteredProducts);
    }

    message.destroy("searching");
    setLoading(false);
  }

  return (
    <div className="home-container">
      <section className="logo">
        <span>Lista de produtos</span>
      </section>

      <section className="search">
        <span>{filteredProducts.length} produtos encontrados.</span>
        <div className="search-box">
          <input
            type="text"
            placeholder="Pesquisar..."
            onChange={event => setSearch(event.target.value)}
          />
          <button type="button" onClick={searching}>
            <FiSearch />
          </button>
        </div>
      </section>

      <section className="products">
        {loading ? (
          <div>
            Carregando...
          </div>
        ) : (
          <>
            <AddProduct />
            {filteredProducts.map(product => {
              return (
                <ProductActions key={product.id} product={product} />
              )
            })}
          </>
        )}
      </section>

      <div className="load-more">
        {hasMoreProducts ? (
          <button type="button" onClick={loadMoreProducts}>
            Carregar mais produtos
          </button>
        ) : (
          <span>Todos produtos carregados :)</span>
        )}
      </div>

      <div
        className="scroll-top"
        style={{
          display: showScrollTop ? 'flex' : 'none',
          opacity: showScrollTop ? '1' : '0'
        }}
        onClick={scrollTop}
      >
        <FiArrowUp />
      </div>
    </div>
  );
}

export default Products;