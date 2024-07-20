import React, { useState, useContext, useEffect } from 'react';
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom';
import { InventoryContext } from '../context/InventoryContext';
import { AuthContext } from '../context/AuthContext';

const InventoryForm = () => {
  const { addInventory, getInventoryById, updateInventory, getInventory } = useContext(InventoryContext);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    location: "",
    description: "",
    images: null,
    price: "", // Added price field
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      const fetchProduct = async () => {
        const product = await getInventoryById(id);
        if (product) {
          setFormData({
            name: product.name,
            quantity: product.quantity,
            location: product.location,
            description: product.description,
            images: product.images || null,
            price: product.price || "", // Set price from product data
          });
        }
      };
      fetchProduct();
    }
  }, [id, getInventoryById]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData({ ...formData, images: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateInventory(id, formData);
    } else {
      await addInventory(formData);
    }
    await getInventory(); // Refresh inventory list
    setFormData({
      name: "",
      quantity: "",
      location: "",
      description: "",
      images: null,
      price: "", // Reset price field after submission
    });
    navigate("/inventory");  // Navigate back to the inventory list
  };

  if (user.role !== "admin") {
    return <Navigate to="/inventory" />;
  }

  return (
    <div className="container mt-3 mb-3">
      <div className="row d-flex justify-content-center">
        <div className="col-sm-12 col-md-7 col-lg-7 col-xl-7">
          <div className="container py-3 inventory-form">
            <div className="row d-flex justify-content-center">
              <div className="col-sm-10 col-md-8 col-lg-8 col-xl-8">
                <h4 className="text-center fw-semibold inventory-form-header-text">{isEditing ? "Edit Product" : "Add Product"}</h4>
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-2">
                    <label className="mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control product-name"
                      placeholder='Enter Product Name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Quantity</label>
                    <input
                      type="number"
                      name="quantity"
                      className="form-control product-quantity"
                      placeholder='Enter Product Quantity'
                      value={formData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Price</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control product-price"
                      placeholder='Enter Product Price'
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>Location</label>
                    <input
                      type="text"
                      name="location"
                      className="form-control product-location"
                      placeholder='Enter Location'
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Description</label>
                    <textarea
                      name="description"
                      className="form-control product-description"
                      placeholder='Enter Product Description'
                      value={formData.description}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group mb-3">
                    <label>Image</label>
                    <input
                      type="file"
                      name="images"
                      className="form-control-file"
                      onChange={handleChange}
                      required={!isEditing} // Image is required only when adding a new product
                    />
                  </div>
                  <div className="form-group mb-2 d-flex justify-content-center gap-3">
                    <button type="submit" className="add-product-btn px-4 py-2">
                      {isEditing ? "Update" : "Add"}
                    </button>
                    {isEditing && (
                      <Link to="/inventory">
                        <button type="button" className="update-form-cancel-btn px-4 py-2">Cancel</button>
                      </Link>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryForm;
