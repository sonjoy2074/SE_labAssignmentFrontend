import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addProduct.css'; 
import { Product } from "../addProducts/product.interface"; 

interface AddProductProps {
  togglePopup: () => void;
  isEditMode: boolean;
  productDetails: Product | null;
}

function AddProduct({ togglePopup, isEditMode, productDetails }: AddProductProps) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productStock, setProductStock] = useState('');

  useEffect(() => {
    if (isEditMode && productDetails) {
      setProductName(productDetails.name);
      setProductPrice(productDetails.price);
      setProductDescription(productDetails.description);
      setProductStock(productDetails.stock.toString());
    }
  }, [isEditMode, productDetails]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (isEditMode && productDetails) {
        await axios.put(`http://localhost:8081/product/${productDetails.id}`, {
          id:productDetails.id,
          name: productName,
          price: productPrice,
          description: productDescription,
          stock: parseInt(productStock)
        });
        alert('Product updated successfully!');
      } else {
        await axios.post('http://localhost:8081/product', {
          name: productName,
          price: productPrice,
          description: productDescription,
          stock: parseInt(productStock)
        });
        alert('Product added successfully!');
      }

      setProductName('');
      setProductPrice('');
      setProductDescription('');
      setProductStock('');

      togglePopup();
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };
  
  return (
    <div className="popup">
      <div className="popup-inner">
        <h2>{isEditMode ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="productName">Name:</label>
          <input type="text" id="productName" name="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />

          <label htmlFor="productPrice">Price:</label>
          <input type="text" id="productPrice" name="productPrice" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

          <label htmlFor="productDescription">Description:</label>
          <textarea id="productDescription" name="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)}></textarea>

          <label htmlFor="productStock">Stock:</label>
          <input type="number" id="productStock" name="productStock" value={productStock} onChange={(e) => setProductStock(e.target.value)} />

          <div className="button-group">
            <button type="submit" className="submit-button">{isEditMode ? 'Edit' : 'Add'}</button>
            <button type="button" className="cancel-button" onClick={togglePopup}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
