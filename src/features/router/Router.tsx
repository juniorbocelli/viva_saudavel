import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import BreadCrumbs from '../../components/BreadCrumbs';
import * as GlobalRoutes from '../../globals/routes';


interface IInternalPageRouteProps {
  children: React.ReactNode;
};

const InternalPageRoute: React.FC<IInternalPageRouteProps> = ({ children }) => {
  return (
    <React.Fragment>
      <BreadCrumbs />
      {children}
    </React.Fragment>
  );
};

const LoggedRoutes = React.memo((props) => {
  return (
    <Routes>
      <Route path={GlobalRoutes.SCREEN_INDEX} element={<InternalPageRoute><div>Olá</div></InternalPageRoute>} />

      <Route path='*' element={<Navigate to={GlobalRoutes.SCREEN_INDEX} replace />} />
    </Routes>
  );
});

const NotLoggedRoutes = React.memo((props) => {
  return (
    <Routes>

    </Routes>
  );
});

const Router = () => {
  const isLoggedIn = true;

  return (
    <BrowserRouter>
      {isLoggedIn ? <LoggedRoutes /> : <NotLoggedRoutes />}
    </BrowserRouter>
  );
};

export default Router;