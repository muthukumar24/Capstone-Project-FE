import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';
import { AuthContext } from "../context/AuthContext";
import { ClipLoader } from 'react-spinners';

const Reports = () => {
  const [reportData, setReportData] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const result = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/reports',
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
      });
        setReportData(result.data);
      } catch (error) {
        console.error("Error fetching report data:", error);
      }
    };
    fetchReportData();
  }, []);

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


    <div className="container mt-4">
      <h2 className="text-center mb-4 fw-semibold reports-header-text">Reports</h2>
      {reportData ? (
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-4">
            <div className="card h-100 reports-card">
              <img src="https://img.freepik.com/free-vector/store-staff-check-number-products-that-must-be-delivered-customers-during-day_1150-51079.jpg?size=626&ext=jpg&ga=GA1.1.103954767.1717752130&semt=ais_user" className="card-img-top py-2 px-2" alt="total products image" />
              <div className="card-body">
                <h5 className="card-title text-center reports-card-title"><i className="bi bi-cart4"></i>&nbsp;Total Products</h5>
                <p className="card-text text-center reports-card-text">{reportData.totalProducts}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-4">
            <div className="card h-100 reports-card">
            <img src="https://media.istockphoto.com/id/1454741284/vector/inventory-control-by-online-system-inventory-management-with-goods-demand-professional.jpg?s=612x612&w=0&k=20&c=WpV4f0-P6hvqLcCFU4OmMbrLX7Ru_UIDXED7DkUePI8=" className="card-img-top py-2 px-2" alt="inventory value image" />

              <div className="card-body">
                <h5 className="card-title text-center reports-card-title"><i className="bi bi-currency-dollar"></i>Total Inventory Value</h5>
                <p className="card-text text-center reports-card-text">${reportData.totalInventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-4">
            <div className="card h-100 reports-card">
            <img src="https://static.vecteezy.com/system/resources/previews/015/639/931/non_2x/inventory-control-system-concept-professional-manager-checking-goods-and-stock-supply-inventory-management-with-goods-demand-vector.jpg" className="card-img-top py-2 px-2" alt="out of stock image" />

              <div className="card-body">
                <h5 className="card-title text-center reports-card-title"><i className="bi bi-cart-x-fill"></i>&nbsp;Out of Stock Products</h5>
                <p className="card-text text-center reports-card-text">{reportData.outOfStockCount}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-3 col-xl-3 mb-4">
            <div className="card h-100 reports-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/005/647/959/small_2x/isometric-illustration-concept-man-analyzing-goods-in-warehouse-free-vector.jpg" className="card-img-top py-2 px-2" alt="turnover rate image" />

              <div className="card-body">
                <h5 className="card-title text-center reports-card-title"><i className="bi bi-bar-chart-fill"></i> Turnover Rate</h5>
                <p className="card-text text-center reports-card-text">{reportData.turnoverRates}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
            <ClipLoader size={30} color={"#242c6c"} className='mb-4'/>
        </div>
      )}
      <div className='d-flex justify-content-center'>
        <Link to={'/dashboard'}>
          <button className='reports-home-btn px-4 py-2'>
            Back
          </button>
        </Link>
      </div>
    </div>
    
    <Notifications />

    </>
  );
};

export default Reports;
