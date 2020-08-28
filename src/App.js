import React from 'react';
import { Route } from 'react-router-dom';

import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './containers/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <Route path="/" exact component={BurgerBuilder}/>
        <Route path="/checkout" component={Checkout}/>
      </Layout>
    </div>
  );
}

export default App;
