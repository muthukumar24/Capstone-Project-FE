import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';
import { AuthContext } from '../context/AuthContext';

const InventoryItem = ({ item }) => {
  const { deleteInventory } = useContext(InventoryContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteInventory(item._id);
    } catch (error) {
      console.error('Error deleting inventory:', error);
    }
  };

  const handleEdit = () => {
    navigate(`/inventory-form/${item._id}`);
  };

  const handleBuy = () => {
    navigate('/buy-now', { state: { item } });
  };

  return (
    <div className="card h-100 product-card">
      {item.images && item.images[0] && (
        <img src={item.images[0]} className="card-img-top py-2 px-2 inventory-product-image" alt={item.name} />
      )}
      <div className="card-body">
        <h4 className="card-title text-center">{item.name}</h4>
        <p className="card-text mb-2"><b>Description:</b> {item.description}</p>
        <p className="card-text mb-2"><b>Price:</b> ${item.price}</p> {/* Display price */}
        <p className="card-text mb-2"><b>Available Stock:</b> {item.quantity}</p>
        <p className="card-text mb-2"><b>Location:</b> {item.location}</p>
        
        {user.role === 'admin' && (
          <div className="d-flex justify-content-end gap-3">
            <button className="inventory-product-edit-btn px-4 py-2 mt-2" onClick={handleEdit}>Edit</button>
            <button className="inventory-product-delete-btn px-4 py-2 mt-2" onClick={handleDelete}>Delete</button>
          </div>
        )}
        {user.role === 'user' && (
          <div className='d-flex justify-content-center'>
            <button className="inventory-buynow-btn mt-2 px-4 py-2" onClick={handleBuy}>Buy Now</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryItem;



