import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Ecommerce from './pages/Ecommerce';
import Home from './pages/Ecommerce/Home';
import Cart from './pages/Ecommerce/Cart';

export const EcommerceRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/cart" component={Cart} />
    </Switch>
  );
}

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/" component={Ecommerce} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;