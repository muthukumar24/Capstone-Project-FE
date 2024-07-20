import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { OrderContext } from "../context/OrderContext";

const OrderForm = ({ order, onClose }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addOrder, updateOrder } = useContext(OrderContext);

  const [formData, setFormData] = useState({
    item: "",
    name: "",
    quantity: "",
    status: "",
    price: 0,
  });

  useEffect(() => {
    if (order) {
      setFormData({
        item: order.products[0].item,
        name: order.products[0].name,
        quantity: order.products[0].quantity,
        status: order.status,
        price: order.products[0].price,
      });
    } else if (id) {
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
          const orderData = response.data;
          setFormData({
            item: orderData.products[0].item,
            name: orderData.products[0].name,
            quantity: orderData.products[0].quantity,
            status: orderData.status,
            price: orderData.products[0].price,
          });
        } catch (error) {
          console.error("Error fetching order:", error);
        }
      };
      fetchOrder();
    }
  }, [id, order]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        products: [
          {
            item: formData.item,
            name: formData.name.trim(),
            quantity: Number(formData.quantity),
            price: Number(formData.price),
          },
        ],
        status: formData.status,
      };

      if (id || order) {
        await updateOrder(order ? order._id : id, orderData);
        
      }
      
      if (onClose) onClose();
      else navigate("/orders");
    } catch (error) {
      console.error("Error saving order:", error);
      alert("Error saving order. Please try again later.");
    }
  };

  const handleCancel = () => {
    if (onClose) onClose();
    else navigate("/orders");
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-11 col-lg-11 col-xl-11">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="mb-2">Product</label>
              <input
                type="text"
                className="form-control mb-2 order-form-product-input"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Quantity</label>
              <input
                type="number"
                className="form-control mb-2 order-form-quantity-input"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label className="mb-2">Status</label>
              <input
                type="text"
                className="form-control mb-2 order-form-status-input"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                required
              />
            </div>
            <div className="d-flex justify-content-center gap-3">
              <button type="submit" className="btn btn-primary mt-3">
                {id || order ? "Update" : "Place"}
              </button>
              <button
                type="button"
                className="btn btn-danger mt-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
