import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { isAuthenticated } from './services/auth';

import Login from './pages/Login';
import Register from './pages/Register';
import Ecommerce from './pages/Ecommerce';
import Home from './pages/Ecommerce/Home';
import Cart from './pages/Ecommerce/Cart';
import Profile from './pages/Ecommerce/Profile';
import Dashboard from './pages/Dashboard';
import Products from './pages/Dashboard/Products';
import Details from './pages/Dashboard/Details';
import Clients from './pages/Dashboard/Clients';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated() ?
      <Component {...props} />
      :
      <Redirect to='/login' />
  )} />
);

export const EcommerceRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={Profile} />
    </Switch>
  );
}

export const DashboardRoutes = () => {
  return (
    <Switch>
      <PrivateRoute exact path="/dashboard/products" component={Products} />
      <PrivateRoute exact path="/dashboard/products/:productId" component={Details} />
      <PrivateRoute exact path="/dashboard/clients" component={Clients} />
    </Switch>
  )
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/" component={Ecommerce} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;