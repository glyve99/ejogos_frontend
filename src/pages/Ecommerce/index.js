import React from 'react';

import { CartContextProvider } from '../../contexts/Cart';
import Navbar from '../../components/Navbar';
import { EcommerceRoutes } from '../../routes';

import './styles.css';

function Ecommerce() {
  return (
    <CartContextProvider>
      <div className="ecommerce-container">
        <Navbar />
        <div className="ecommerce-content">
          <EcommerceRoutes />
        </div>
      </div>
    </CartContextProvider>
  );
}

export default Ecommerce;