import React from 'react';
import { NavLink } from 'react-router-dom';

import { FiShoppingBag, FiUsers } from 'react-icons/fi';

import './styles.css';

function Sidebar() {
  return (
    <div className="sidebar-container">
      <img src="/assets/logo.svg" alt="Logo" width="128px" />
      <p>Dashboard</p>
      <NavLink className="menu-item" activeClassName="menu-item-active" to="/dashboard/products">
        <FiShoppingBag />
        <span>Produtos</span>
      </NavLink>
      <NavLink className="menu-item" activeClassName="menu-item-active" to="/dashboard/clients">
        <FiUsers />
        <span>Clientes</span>
      </NavLink>
    </div>
  );
}

export default Sidebar;