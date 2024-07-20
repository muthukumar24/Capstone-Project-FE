import React, { useContext } from "react";
import { Link, useNavigate, Routes, Route, Navigate } from "react-router-dom";
import Inventory from "../pages/Inventory";
import Orders from "../pages/Orders";
import Reports from "../pages/Reports";
import Notifications from '../pages/Notifications';
import Footer from "../components/Footer";
import InventoryForm from "../components/InventoryForm";
import OrderForm from "../components/OrderForm";
import { AuthContext } from "../context/AuthContext";
import Home from "../components/Home";
import UsersAccount from "./UsersAccount";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/dashboard/inventory" className="navbar-brand">
            ProGoods Inventory
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/inventory" className="nav-link">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/orders" className="nav-link">
                  Orders
                </Link>
              </li>
              {user && user.role === "admin" && (
                <>
                  <li className="nav-item">
                    <Link to="/reports" className="nav-link">
                      Reports
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/users" className="nav-link">
                      Users
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <div className="d-flex justify-content-end">
              <div className="dropdown">
                <button
                  className="btn btn-light dropdown-toggle px-4"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  {user && (
                    <li className="dropdown-item-text">Hey, {user.username}</li>
                  )}
                  <hr />
                  <li>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout <i className="bi bi-box-arrow-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/dashboard/inventory" element={<Inventory />} />
          <Route path="/inventory-form/:id?" element={<InventoryForm />} />
          <Route path="/dashboard/orders" element={<Orders />} />
          <Route path="/order-form/:id?" element={<OrderForm />} />
          {user && user.role === "admin" && (
            <>
              <Route path="/dashboard/reports" element={<Reports />} />
              <Route path="/dashboard/notifications/stock-levels" element={<Notifications />} />
              <Route path="/dashboard/users" element={<UsersAccount />} />
            </>
          )}
          <Route
            path="/dashboard/*"
            element={<Navigate to="/dashboard/inventory" />}
          />
        </Routes>
        <ToastContainer />
      </div>
      
      
      <Home />
      <Footer />
    </>
  );
};

export default Dashboard;
