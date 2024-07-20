import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/orders', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders. Please try again later.');
      }
    };
    fetchOrders();
  }, [user]);


  const fetchOrders = async () => {
    if (!user) return;
    try {
      const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      alert('Error fetching orders. Please try again later.');
    }
  };


  const addOrder = async (orderData) => {
    try {
      const response = await axios.post('https://capstone-project-be-f7p8.onrender.com/api/orders', orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders((prevOrders) => [...prevOrders, response.data]);
    } catch (error) {
      console.error('Error adding order:', error);
      alert('Error adding order. Please try again later.');
    }
  };

  const updateOrder = async (id, orderData) => {
    // console.log(orderData);
    try {
      const response = await axios.put(`https://capstone-project-be-f7p8.onrender.com/api/orders/${id}`, orderData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order._id === id ? response.data : order))
      );
      alert("Order updated successfully");
    } catch (error) {
      console.error('Error updating order:', error);
      if (error.response) {
        console.error('Response Data:', error.response.data);
      }
      alert('Error updating order. Please try again later.');
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`https://capstone-project-be-f7p8.onrender.com/api/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Error deleting order. Please try again later.');
    }
  };

  return (
    <>
    <OrderContext.Provider value={{ orders, addOrder, updateOrder, deleteOrder, fetchOrders }}>
      {children}
    </OrderContext.Provider>
    </>
  );
};
