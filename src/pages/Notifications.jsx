import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [shownNotifications, setShownNotifications] = useState(new Set());

  useEffect(() => {
    const fetchStockItems = async () => {
      try {
        const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/notifications/stock-levels', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(response.data);
      } catch (err) {
        console.error('Error fetching stock items:', err);
      }
    };

    fetchStockItems();
  }, []);

  useEffect(() => {
    const lowStockItems = notifications.filter(item => item.quantity < 10);
    if (lowStockItems.length === 0 && notifications.length > 0) {
      if (!shownNotifications.has('allInStock')) {
        toast.success('All Products are currently in stock.');
        setShownNotifications(prev => new Set(prev).add('allInStock'));
      }
    } else {
      lowStockItems.forEach(item => {
        if (!shownNotifications.has(item._id)) {
          toast.warn(`${item.name} is low on stock! Only ${item.quantity} left.`);
          setShownNotifications(prev => new Set(prev).add(item._id));
        }
      });
    }
  }, [notifications, shownNotifications]);

  return (
    <>
      <ToastContainer /> {/* Ensure ToastContainer is included to display toasts */}
    </>
  );
};

export default Notifications;
