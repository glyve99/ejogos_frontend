import React from 'react';
import { NavLink } from 'react-router-dom';

import { CgProfile} from 'react-icons/cg';
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {RiShoppingBag3Line} from 'react-icons/ri';
import { useCart } from '../../contexts/Cart';

import './styles.css';

function Navbar() {
  const { totalAmount } = useCart();

  return (
    <div className="navbar-container">
      <NavLink to="/" className="menu-item">
        <RiShoppingBag3Line /> Home
      </NavLink>
      <NavLink to="/cart" className="menu-item">
        <AiOutlineShoppingCart /> Carrinho
        <span>{totalAmount !== 0 ? totalAmount : ''}</span>
      </NavLink>
      <a href="/login" className="menu-item">
        <CgProfile /> Entrar
      </a>
    </div>
  );
}

export default Navbar;



