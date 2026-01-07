import React, { useState } from "react";
import { useSelector } from "react-redux";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ShoppingCart from "./components/ShoppingCart";
import "./AppEcommerce.css";

const AppEcommerce = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);

  const handleCheckout = () => {
    alert("Thank you for your purchase! This is a demo, so no order was placed.");
    setShowCart(false);
  };

  return (
    <div className="ecommerce-app">
      {/* Navigation Header */}
      <header className="ecommerce-header">
        <div className="header-container">
          <div className="header-left">
            <h1 className="logo">Fashion Store</h1>
            <p className="tagline">Premium Clothing Collection</p>
          </div>
          <button
            className={`btn-cart-header ${showCart ? "active" : ""}`}
            onClick={() => setShowCart(!showCart)}
          >
            <span className="cart-icon">🛒</span>
            Cart {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="ecommerce-main">
        {showCart ? (
          <div className="cart-view"> 
            <ShoppingCart onCheckout={handleCheckout} />
          </div>
        ) : (
          <ProductList onProductClick={setSelectedProduct} />
        )}
      </main>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/* Footer */}
      <footer className="ecommerce-footer">
        <div className="footer-content">
          <div>ffff</div>
          <div className="footer-section">
            <h4>About Us</h4>
            <p>Your favorite online clothing store with premium quality products.</p>
          </div>
          <div className="footer-section">
            <h4>Customer Service</h4>
            <ul>
              <li><a href="#!">Contact Us</a></li>
              <li><a href="#!">Shipping Info</a></li>
              <li><a href="#!">Returns & Exchanges</a></li>
              <li><a href="#!">FAQ</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#!">Facebook</a>
              <a href="#!">Instagram</a>
              <a href="#!">Twitter</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Fashion Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppEcommerce;
