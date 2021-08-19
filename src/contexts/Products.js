import React, { createContext, useContext, useEffect, useState } from 'react';

import api from '../services/api';
import { message } from 'antd';

export const ProductsContext = createContext();

export function ProductsContextProvider({ children }) {
  const [allProducts, setAllProducts] = useState([]);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  async function getProducts(page, limit) {
    message.loading({
      key: "loading",
      content: "Carregando produtos...",
      duration: 9999
    });
    try {
      const response = await api.get('product/', {
        params: {
          page: page,
          limit: limit
        }
      });
      if (response.status === 200) {
        if (page === 1) {
          setAllProducts([]);
        }
        setAllProducts(allProducts.concat(response.data));
        message.destroy("loading");
      }
    } catch (error) {
      setHasMoreProducts(false);
      message.destroy("loading");
    }
  }

  useEffect(() => {
    getProducts(1, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProductsContext.Provider value={{
      allProducts,
      setAllProducts,
      getProducts,
      hasMoreProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}