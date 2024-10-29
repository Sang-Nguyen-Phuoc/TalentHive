import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import routes from './pages'
import LayoutHome from './layouts/Home'
const App = () => {
  return (
    <BrowserRouter>
      <div className='app'>
        <Routes>
          {
          routes.map((route, index) => {
            const Page = route.conponent
            const Layout = route.layout || LayoutHome
            return <Route key = {index} path = {route.path} element = {
            <Layout>
              <Page/>
            </Layout>
            }> </Route>
          })
          }
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App