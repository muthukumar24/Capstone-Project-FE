import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const InventoryContext = createContext();

export const InventoryProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [inventory, setInventory] = useState([]);

  const getInventory = async () => {
    try {
      const response = await axios.get('https://capstone-project-be-f7p8.onrender.com/api/inventory', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setInventory(response.data);
    } catch (error) {
      console.error('Error fetching inventory:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getInventory();
    }
  }, [user]);

  const addInventory = async (newItem) => {
    if (user.role !== 'admin') {
      console.error('Access denied: Only admins can add inventory items.');
      return;
    }

    try {
      const formData = new FormData();
      for (const key in newItem) {
        formData.append(key, newItem[key]);
      }

      const response = await axios.post('https://capstone-project-be-f7p8.onrender.com/api/inventory', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setInventory([...inventory, response.data]);
      alert('Item added successfully!');
    } catch (error) {
      console.error('Error adding inventory:', error.response ? error.response.data : error.message);
      alert('Error adding inventory.');
    }
  };

  const updateInventory = async (id, inventoryData) => {
    try {
      const formData = new FormData();
      for (const key in inventoryData) {
        if (key === 'images' && !inventoryData[key]) continue; // Skip images if not provided
        formData.append(key, inventoryData[key]);
      }

      const response = await axios.put(`https://capstone-project-be-f7p8.onrender.com/api/inventory/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setInventory(prevInventory =>
        prevInventory.map(item => (item._id === id ? response.data : item))
      );

      alert('Item updated successfully!');
    } catch (error) {
      console.error('Error updating inventory:', error.response ? error.response.data : error.message);
      alert('Error updating inventory.');
    }
  };

  const deleteInventory = async (id) => {
    try {
      await axios.delete(`https://capstone-project-be-f7p8.onrender.com/api/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setInventory(inventory.filter(item => item._id !== id));
      alert('Item deleted successfully!');
    } catch (error) {
      console.error('Error deleting inventory:', error.response ? error.response.data : error.message);
      alert('Error deleting inventory.');
    }
  };

  const getInventoryById = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get(`https://capstone-project-be-f7p8.onrender.com/api/inventory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching inventory item:', error.response ? error.response.data : error.message);
      throw error;  // Rethrow the error to handle it in the calling component
    }
  };

  return (
    <>
    <InventoryContext.Provider value={{ inventory, getInventory, addInventory, updateInventory, deleteInventory, getInventoryById }}>
      {children}
    </InventoryContext.Provider>
    </>
  );
};



