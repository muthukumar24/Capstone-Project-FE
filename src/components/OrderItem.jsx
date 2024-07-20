import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import axios from 'axios';
import OrderForm from './OrderForm';

const OrderItem = ({ order }) => {
  const { user } = useContext(AuthContext);
  const { deleteOrder } = useContext(OrderContext);
  const navigate = useNavigate();
  const [status, setStatus] = useState(order.orderStatus);
  const [showModal, setShowModal] = useState(false);

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`https://capstone-project-be-f7p8.onrender.com/api/orders/${order._id}/status`, { orderStatus: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setStatus(status);
      alert('Delivery Status Updated Successfully');
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status');
    }
  };

  const handleTrackOrder = () => {
    navigate(`/order-tracking/${order._id}`);
  };

  const handleEditOrder = () => {
    setShowModal(true);
  };

  return (
    <>
      <tr>
        <td className='text-center'>{order.products.map(p => p.name).join(', ')}</td>
        <td className='text-center'>{order.products.reduce((sum, p) => sum + p.quantity, 0)}</td>
        <td className='text-center'>${order.products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2)}</td>
        <td className='text-center'>{order.status}</td>
        {user.role === 'user' && (
          <td className='d-flex justify-content-center gap-3'>
              <button className="btn btn-success px-3" onClick={handleEditOrder}>
                <i className="bi bi-pen"></i>&nbsp;Edit
              </button>
              <button className="btn btn-danger px-3" onClick={() => deleteOrder(order._id)}>
                <i className="bi bi-trash"></i>&nbsp;Delete
              </button>
              <button className="btn btn-primary px-3" onClick={handleTrackOrder}>
                <i className="bi bi-truck"></i>&nbsp;Track
              </button>
          </td>
        )}
        {user.role === 'admin' && (
          <td className='d-flex align-items-center justify-content-center gap-2'>
            <select
              className="form-select w-50 order-status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Select Status"
            >
              <option value='Placed'>Placed</option>
              <option value='Shipped'>Shipped</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value='Delivered'>Delivered</option>
              <option value='Cancelled'>Cancelled</option>
            </select>
            <button className="btn btn-success" onClick={handleStatusUpdate}>
              Update Status
            </button>
          </td>
        )}
      </tr>

      <div className={`modal ${showModal ? 'd-block' : 'd-none'}`} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Order</h5>
              <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
            </div>
            <div className="modal-body">
              <OrderForm order={order} onClose={() => setShowModal(false)} />
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop ${showModal ? 'show' : 'd-none'}`}></div>
    </>
  );
};

export default OrderItem;
