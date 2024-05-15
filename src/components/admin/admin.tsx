import React, { useState, useEffect } from "react";
import "./admin.css";
import axios from "axios";
import AddProduct from "../addProducts/addProduct";
import ProductDetails from "../viewProduct/viewProduct"; // Import the ProductDetails component

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  stock: number;
}

function Admin() {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  useEffect(() => {
    axios
      .get<Product[]>("http://localhost:8081/product/showProduct")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  const toggleAddProductPopup = (product?: Product) => {
    setSelectedProduct(product || null);
    setShowAddProductPopup(!showAddProductPopup);
  };

  const toggleProductDetails = (product?: Product) => {
    setSelectedProduct(product || null);
    setShowProductDetails(!showProductDetails);
  };

  return (
    <div className="container">
      <div className="admin-panel">
        <h1>Admin</h1>
      </div>
      <div className="products-table">
        <h1>Hello, Sonjoy Dey welcome back</h1>
        <div className="add-item">
          <button
            onClick={() => toggleAddProductPopup()}
            className="add-button"
          >
            Add Product
          </button>
        </div>
        <h2>Products Information</h2>
        <table className="table-contain">
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>{product.stock}</td>
                <td>
                  <button
                    onClick={() => toggleAddProductPopup(product)}
                    className="edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleProductDetails(product)}
                    className="view-button"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product details modal */}
      {showProductDetails && selectedProduct && (
        <div className="product-details-modal">
          <ProductDetails
            product={selectedProduct}
            onClose={() => setShowProductDetails(false)}
          />
        </div>
      )}

      {/* Add product modal */}
      {showAddProductPopup && (
        <AddProduct
          togglePopup={toggleAddProductPopup}
          productDetails={selectedProduct}
          isEditMode={!!selectedProduct}
        />
      )}
    </div>
  );
}

export default Admin;
