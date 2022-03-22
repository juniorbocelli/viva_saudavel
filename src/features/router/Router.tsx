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

import SignIn from '../../screens/login/SignIn';

const LoggedRoutes = React.memo((props) => {
  return (
    <Routes>
      <Route path={GlobalRoutes.SCREEN_INDEX} element={<Home />} />
      <Route path={GlobalRoutes.SCREEN_CATEGORY} element={<Category />} />
      <Route path={GlobalRoutes.SCREEN_PRODUCER} element={<Producer />} />
      <Route path={GlobalRoutes.SCREEN_FILTER} element={<Filter />} />
      <Route path={GlobalRoutes.SCREEN_PRODUCER_SELECT} element={<ProducerSelect />} />
      <Route path={GlobalRoutes.SCREEN_FILTER_SELECT} element={<FilterSelect />} />

      <Route path='*' element={<Navigate to={GlobalRoutes.SCREEN_INDEX} replace />} />
    </Routes>
  );
});

const NotLoggedRoutes = React.memo((props) => {
  return (
    <Routes>
      <Route path={GlobalRoutes.SCREEN_LOGIN} element={<SignIn />} />

      <Route path='*' element={<Navigate to={GlobalRoutes.SCREEN_LOGIN} replace />} />
    </Routes>
  );
});

const Router = () => {
  // TODO: get this information from authContext
  const isLoggedIn = true;

  return (
    <CheckSession>
      <BrowserRouter>
        {
          isLoggedIn ?
            <Navigation>
              <LoggedRoutes />
            </Navigation>
            :
            <NotLoggedRoutes />
        }
      </BrowserRouter>
    </CheckSession>
  );
};

export default Router;