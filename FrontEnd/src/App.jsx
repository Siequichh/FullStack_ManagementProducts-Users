import { useContext, useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import { AuthContext} from './components/auth/AuthContext'
import PrivateRoute from './components/auth/PrivateRoute'

import Home from './components/pages/Home'
import Login from './components/pages/Login'
import Register from './components/pages/Register'
import Products from './components/pages/Products'
import Profile from './components/userPages/Profile'
import ManageProducts from './components/adminPages/ManageProducts'
import ManageUsers from './components/adminPages/ManageUsers'
import Unauthorized from './components/pages/Unauthorized'

import Navbar from './components/common/NavBar'


function App() {
  const{user,logout} = useContext(AuthContext);

  return (
    <>
    <Navbar/>
    <Routes>
      {/* 🔓 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />

      {/* 🔒 User Routes (Profile) */}
      <Route 
        path="/profile" 
        element={<PrivateRoute allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}><Profile /></PrivateRoute>} 
      />

      {/* 🔒 Admin Routes */}
      <Route 
        path="/admin/products" 
        element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><ManageProducts /></PrivateRoute>} 
      />
      <Route 
        path="/admin/users" 
        element={<PrivateRoute allowedRoles={["ROLE_ADMIN"]}><ManageUsers /></PrivateRoute>} 
      />

      {/* 🔒 Unauthorized Page */}
      <Route path="/unauthorized" element={<Unauthorized />} />
    </Routes>
    </>
    
  );
}

export default App;
   