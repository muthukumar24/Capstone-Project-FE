import React, { useContext } from "react";
import OrderList from "../components/OrderList";
import { OrderContext } from "../context/OrderContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Orders() {
  const { orders } = useContext(OrderContext);

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
        <h3 className="text-center mt-3 fw-semibold orders-header-text">Orders</h3>
        <OrderList orders={orders} />
      </div>
    </>
  );
}

export default Orders;
