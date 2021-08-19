import React from 'react';
import { NavLink } from 'react-router-dom';

import { FiShoppingBag, FiUsers } from 'react-icons/fi';

import './styles.css';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <p>Painel do administrador</p>
      <NavLink className="menu-item" activeClassName="menu-item-active" to="/dashboard/products">
        <FiShoppingBag />
       Produtos
      </NavLink>
      <NavLink className="menu-item" activeClassName="menu-item-active" to="/dashboard/clients">
        <FiUsers />
        Clientes
      </NavLink>
    </div>
  );
}

export default Sidebar;