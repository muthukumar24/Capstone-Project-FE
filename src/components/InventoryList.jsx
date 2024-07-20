import React, { useContext, useEffect } from 'react';
import InventoryItem from './InventoryItem';
import { InventoryContext } from '../context/InventoryContext';
import { Link } from 'react-router-dom';


const InventoryList = () => {
  const { inventory, getInventory } = useContext(InventoryContext);

  useEffect(() => {
    getInventory();
  }, [getInventory]);

  return (
    <div className='container'> 
    <div className="row">
      {inventory.length === 0 ? (
        <p>No inventory items available.</p>
      ) : (
        inventory.map((item) => (
          <div key={item._id} className='col-sm-12 col-md-6 col-lg-4 col-xl-4 py-3 mb-4'>
            <InventoryItem item={item} />
          </div>
        ))
      )}
      </div>
        <div className='text-center'>
            <Link to={'/dashboard'}>
              <button className='inventory-home-btn mb-4 px-4 py-2'>Back</button>
            </Link>
        </div>
    </div>
  );
};

export default InventoryList;
