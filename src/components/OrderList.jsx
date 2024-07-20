import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { OrderContext } from '../context/OrderContext';
import OrderItem from './OrderItem';

const OrderList = () => {
  const { user } = useContext(AuthContext);
  const { orders } = useContext(OrderContext);

  return (
    <div className="container mt-4">
      <table className="table table-bordered table-striped table-responsive" style={{overflowX: 'auto'}}>
        <thead>
          <tr className='text-center'>
            <th className='order-table-heading'>Product</th>
            <th className='order-table-heading'>Quantity</th>
            <th className='order-table-heading'>Price</th>
            <th className='order-table-heading'>Payment</th>
            {user && user.role === 'user' && <th className='order-table-heading'>Actions</th>}
            {user && user.role === 'admin' && <th className='order-table-heading'>Order Status</th>}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </tbody>
      </table>
      <div className='d-flex justify-content-center'>
        <Link to={'/dashboard'}>
          <button className='order-home-btn px-4 py-2'>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default OrderList;
