import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="container-fluid">
      <div className="container mt-5">
        <div className="py-3">
          <h1 className="text-center text-uppercase fw-semibold mt-3 mb-4">
            Welcome to ProGoods Inventory Management
          </h1>
          <h3 className="text-center fw-medium mb-4">
            Streamline Your Inventory Process
          </h3>
          <p className="text-center lead mb-4">
            Efficiently manage your inventory with ProGoods Inventory
            Management. Our system is designed to help you keep track of stock
            levels, manage orders, and ensure smooth operations in your
            business. Whether you're a small retailer or a large enterprise, our
            platform offers the tools you need to optimize your inventory
            process.
          </p>

          {/* <p className="text-center fs-5 mb-4">Let's get started</p> */}
          <div className="row d-flex justify-content-center">
            <div className="col-md-6">
              <div className="mb-5 d-flex justify-content-center gap-3">
                <Link to={"/inventory"}>
                  <button className="px-3 py-2 home-inventory-btn">Inventory</button>
                </Link>
                <Link to={"/orders"}>
                  <button className="px-3 py-2 home-order-btn">
                    Orders
                  </button>
                </Link>
                {user && user.role === "admin" && (
                  <>
                  <Link to={"/reports"}>
                    <button className="px-3 py-2 home-reports-btn">Reports</button>
                  </Link>
                  <Link to={"/users"}>
                  <button className="px-3 py-2 home-reports-btn">Users</button>
                </Link>
                </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 py-2">
            <h4 className="mb-3 fw-medium">Key Features</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <b>Inventory Products:</b> View product details including name, quantity, location, description, images, and price.
              </li>
              <li className="list-group-item">
                <b>Order Management:</b> Easily create, update, and track orders
                to ensure timely fulfillment.
              </li>
              <li className="list-group-item">
                <b>User-Friendly Interface:</b> Navigate through our intuitive
                interface designed to provide a hassle-free experience.
              </li>
              <li className="list-group-item">
                <b>Secure Access:</b> Ensure data security with role-based
                access controls and secure authentication.
              </li>
            </ul>
          </div>
          <div className="col-md-6 py-2">
            <h4 className="mb-3 fw-medium">Why Choose ProGoods?</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <b>Efficiency:</b> Save time and reduce errors with automated
                inventory management.
              </li>
              <li className="list-group-item">
                <b>Scalability:</b> Our system grows with your business,
                accommodating increasing inventory volumes and users.
              </li>
              <li className="list-group-item">
                <b>Customization:</b> Tailor the platform to suit your specific
                business needs with customizable features and settings.
              </li>
              <li className="list-group-item">
                <b>Support:</b> Get help when you need it with our dedicated
                customer support team.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
