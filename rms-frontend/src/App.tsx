import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { claim } from './auth/auth.model';
import AuthenticationContext from './auth/AuthenticationContext';
import { getClaims } from './auth/handleJWT';
import Menu from './Menu';
import routes from './route-config';
import configureInterceptor from './utils/httpInterceptors';

configureInterceptor();

function App() {

  const [claims, setClaims] = useState<claim[]>([
    //{ name: 'role', value: 'companyAdmin'},
    //{ name: 'fullName', value: 'John Doe'},
    //{ name: 'companyName', value: 'ABCompany'}
  ]);

  useEffect(() => {
    setClaims(getClaims()); // we need to get the claims everytime we refresh the app
  }, []);

  return (
    <>
      <BrowserRouter>
        <AuthenticationContext.Provider value={{ claims, update: setClaims }}>
          <Menu />
          <Routes>
            {routes.map(route =>
              <Route key={route.path} path={route.path}
                element={<route.element />}
              />)}
          </Routes>
        </AuthenticationContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
