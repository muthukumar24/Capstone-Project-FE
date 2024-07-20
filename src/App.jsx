import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/LoginForm';
import Register from './pages/RegisterForm';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import ForgotPassword from './pages/ForgotPasswordForm';
import ResetPassword from './pages/ResetPasswordForm';
import ProtectedRoute from './components/ProtectedRoute';
import BuyNow from './components/BuyNow';
import InventoryForm from './components/InventoryForm';
import { InventoryProvider } from './context/InventoryContext';
import { OrderProvider } from './context/OrderContext';
import OrderForm from './components/OrderForm';
import OrderTracking from './components/OrderTracking';
import UsersAccount from './pages/UsersAccount';

function App() {
  return (
    <AuthProvider>
      <InventoryProvider>
        <OrderProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />

              <Route element={<ProtectedRoute roles={['admin', 'user']} />}>
                <Route path="/dashboard/*" element={<Dashboard />} />
                <Route path="/buy-now" element={<BuyNow />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path='/inventory-form/:id' element={<InventoryForm/>} />
                <Route path="/orders" element={<Orders />} />
                <Route path='/order-form/:id' element={<OrderForm />} />
                <Route path='/order-tracking/:id' element={<OrderTracking />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/notifications/stock-levels" element={<Notifications />} />
                <Route path="/users" element={<UsersAccount />} />
              </Route>
              
            </Routes>
          </Router>
        </OrderProvider>
      </InventoryProvider>
    </AuthProvider>
  );
}

export default App;
