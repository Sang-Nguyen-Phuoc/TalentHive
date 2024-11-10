import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import routes from './pages'
import AuthenticationLayout from './layouts/AuthenticationLayout'
import DefaultLayout from './layouts/DefaultLayout'
import defaultCSS from './styles/pages/FixBoostrap.module.css'

const App = () => {
  const location = useLocation();

  const getLayout = () => {
    if (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/forgot-password') {
      return AuthenticationLayout;
    }
    else {
      return DefaultLayout;
    }
  };

  const Layout = getLayout();

  return (
    <Layout>
      <Routes>
        {
          routes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })
        }
      </Routes>
    </Layout>
  )
}

export default App