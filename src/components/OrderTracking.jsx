import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const OrderTracking = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://capstone-project-be-f7p8.onrender.com/api/orders/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setOrder(response.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };
    fetchOrder();
  }, [id]);

  const getProgressBarHeight = () => {
    switch (order?.orderStatus) {
      case "Placed":
        return "25%";
      case "Shipped":
        return "50%";
      case "Out for Delivery":
        return "75%";
      case "Delivered":
        return "100%";
      default:
        return "0%";
    }
  };

  return (
    <div className="container mt-4">
      <div className="card p-4 order-tracking-card">
        <h2 className="text-center fw-semibold order-tracking-header-text mb-3">
          Order Tracking
        </h2>
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
            <h5 className="fs-4 fw-semibold mt-3 mb-3 order-tracking-header-text">
              Product Details
            </h5>
            {order ? (
              <div className="order-details fs-3">
                <h6 className="mb-3">
                  <b>Order ID</b>: {order._id}
                </h6>
                <h6 className="mb-3">
                  <b>Products</b>:{" "}
                  {order.products.map((p) => p.name).join(", ")}
                </h6>
                <h6 className="mb-3">
                  <b>Quantity</b>:{" "}
                  {order.products.reduce((sum, p) => sum + p.quantity, 0)}
                </h6>
                <h6 className="mb-3">
                  <b>Total Amount</b>: ${order.totalAmount.toFixed(2)}
                </h6>
                <h6 className="mb-3">
                  <b>Order Delivery Status</b>:{" "}
                  <span className={`status ${order.orderStatus}`}>
                    {order.orderStatus}
                  </span>
                </h6>
              </div>
            ) : (
              <ClipLoader size={30} color={"#242c6c"}/>
            )}
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6 px-5">
            <h5 className="fs-4 fw-semibold mt-3 mb-3 order-tracking-header-text">
              Delivery Status
            </h5>
            <div className="timeline-container">
              <div
                className="progress-bar"
                style={{ height: getProgressBarHeight() }}
              ></div>

              <div className="timeline">
                <div
                  className={`timeline-step ${
                    order?.orderStatus === "Placed" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon mb-3">🛒 Order Placed</div>
                </div>
                <div
                  className={`timeline-step ${
                    order?.orderStatus === "Shipped" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon mb-3">🚚 Shipped</div>
                </div>
                <div
                  className={`timeline-step ${
                    order?.orderStatus === "Out for Delivery" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon mb-3">📦 Out for Delivery</div>
                </div>
                <div
                  className={`timeline-step ${
                    order?.orderStatus === "Delivered" ? "active" : ""
                  }`}
                >
                  <div className="timeline-icon mb-3">✅ Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link to="/orders">
            <button className="tracking-order-btn px-4 py-2">Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
