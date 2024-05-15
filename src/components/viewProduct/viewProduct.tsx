import React from 'react';
import { Product } from '../add_editProducts/product.interface';
import './viewProduct.css';
interface ProductDetailsProps {
  product: Product;
  onClose: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span> {/* Close button */}
        <h1>Product Details</h1>
        <h2>Product name: {product.name}</h2>
        <h2>Product price: {product.price}</h2>
        <h2>Product description: {product.description}</h2>
        <h2>Product stock: {product.stock}</h2>
      </div>
    </div>
  );
};

export default ProductDetails;
