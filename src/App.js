import './App.scss'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import {
  Home,
  CategoryProduct,
  ProductSingle,
  Cart,
  Search,
} from './pages/index'

import Login from './auth/user/Login'
import Register from './auth/user/Register'
import BarLayout from './layout/Layout'
import ProtectedRoute from './routing/ProtectedRoute'
import SupplierDashboard from './pages/supplier-dashboard/SupplierDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route element={<BarLayout />}>
          <Route element={<ProtectedRoute />}>
            <Route path='/supplier_dashboard' element={<SupplierDashboard />} />
          </Route>
          <Route path='/' element={<Home />} />

          <Route path='/product/:id' element={<ProductSingle />} />

          <Route path='/category/:category' element={<CategoryProduct />} />

          <Route path='/cart' element={<Cart />} />

          <Route path='/search/:searchTerm' element={<Search />} />
        </Route>
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  )
}

export default App
