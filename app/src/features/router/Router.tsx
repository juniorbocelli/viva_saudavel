import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import * as GlobalRoutes from '../../globals/routes';

import Navigation from '../../features/navigation/Navigation';
import CheckSession from '../auth/CheckSession';

import Home from '../../screens/Home';
import Category from '../../screens/Category';
import Producer from '../../screens/Producer';
import Filter from '../../screens/Filter';
import ProducerSelect from '../../screens/ProducerSelect';
import FilterSelect from '../../screens/FilterSelect';

import ClientEdit from '../../screens/client/ClientEdit';
import Checkout from '../../screens/client/Checkout';
import CreditCardSet from '../../screens/client/CreditCardSet';

import Login from '../../screens/login/Login';
import Register from '../../screens/login/Register';

import AdminNavigation from '../../features/navigation/AdminNavigation';
import AdminHome from '../../screens/admin/AdminHome';
import ProductsList from '../../screens/admin/ProductsList';
import ProductSet from '../../screens/admin/ProductSet';
import ClientsList from '../../screens/admin/ClientsList';

const AllRoutes = React.memo((props) => {
  return (
    <Routes>
      <Route path={GlobalRoutes.SCREEN_INDEX} element={<Navigation><Home /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_CATEGORY} element={<Navigation><Category /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_PRODUCER} element={<Navigation><Producer /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_FILTER} element={<Navigation><Filter /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_PRODUCER_SELECT} element={<Navigation><ProducerSelect /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_FILTER_SELECT} element={<Navigation><FilterSelect /></Navigation>} />

      <Route path={GlobalRoutes.SCREEN_CLIENT_GET} element={<Navigation><ClientEdit /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_CLIENT_CHECKOUT} element={<Navigation><Checkout /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_CREDIT_CARD_NEW} element={<Navigation><CreditCardSet /></Navigation>} />
      <Route path={GlobalRoutes.SCREEN_CREDIT_CARD_UPDATE} element={<Navigation><CreditCardSet /></Navigation>} />

      <Route path={GlobalRoutes.SCREEN_ADMIN_INDEX} element={<AdminNavigation><AdminHome /></AdminNavigation>} />
      <Route path={GlobalRoutes.SCREEN_ADMIN_PRODUCTS} element={<AdminNavigation><ProductsList /></AdminNavigation>} />
      <Route path={GlobalRoutes.SCREEN_ADMIN_PRODUCT_CREATE} element={<AdminNavigation><ProductSet /></AdminNavigation>} />
      <Route path={GlobalRoutes.SCREEN_ADMIN_PRODUCT_EDIT} element={<AdminNavigation><ProductSet /></AdminNavigation>} />

      <Route path={GlobalRoutes.SCREEN_ADMIN_CLIENTS} element={<AdminNavigation><ClientsList /></AdminNavigation>} />

      <Route path={GlobalRoutes.SCREEN_CLIENT_LOGIN} element={<Login />} />
      <Route path={GlobalRoutes.SCREEN_CLIENT_REGISTER} element={<Register />} />

      <Route path='*' element={<Navigate to={GlobalRoutes.SCREEN_INDEX} replace />} />
    </Routes>
  );
});

const Router = () => {
  return (
    <CheckSession>
      <BrowserRouter>
        <AllRoutes />
      </BrowserRouter>
    </CheckSession>
  );
};

export default Router;