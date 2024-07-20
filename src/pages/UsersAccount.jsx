import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const UsersAccount = () => {
    const [users, setUsers] = useState([]);

    const { user } = useContext(AuthContext);
  
    const navigate = useNavigate();
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
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


        <div className='container' style={{overflowX: 'auto'}}>
            <h3 className="text-center fw-semibold mt-3 mb-3 registered-user-text">Registered Users</h3>
            <table className="table table-bordered table-striped table-responsive" style={{width:'auto'}}>
                <thead className='text-center registered-user-thead'>
                    <tr>
                        <th>S.No</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider text-center">
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='d-flex justify-content-center'>
                <Link to={'/dashboard'}>
                    <button className='users-home-btn px-4 py-2'>Back</button>
                </Link>
            </div>
        </div>
        </>
    );
};

export default UsersAccount;
