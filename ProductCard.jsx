import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./ProductCard.css";

const ProductCard = ({ product, onViewDetails }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [showAddOptions, setShowAddOptions] = useState(false);

  const handleAddToCart = () => {
    if (!product.inStock) return;

    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        color: selectedColor,
        quantity: quantity,
      })
    );
    alert(`${product.name} added to cart!`);
    setQuantity(1);
    setShowAddOptions(false);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-rating">
          <span className="stars">★★★★★</span>
          <span className="review-count">({product.reviews} reviews)</span>
        </div>

        <p className="product-description">{product.description}</p>

        <div className="product-price">${product.price.toFixed(2)}</div>

        <button
          className="btn-view-details"
          onClick={() => onViewDetails(product)}
        >
          View Details
        </button>

        {showAddOptions ? (
          <div className="add-options">
            {product.sizes && product.sizes.length > 0 && (
              <div className="option-group">
                <label>Size: </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  {product.sizes.map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="option-group">
                <label>Color: </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {product.colors.map((color) => (
                    <option key={color} value={color}>
                      {color.charAt(0).toUpperCase() + color.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="option-group">
              <label>Quantity: </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              />
            </div>

            <button
              className="btn-confirm-add"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              Confirm Add to Cart
            </button>
            <button
              className="btn-cancel"
              onClick={() => setShowAddOptions(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            className="btn-add-to-cart"
            onClick={() => setShowAddOptions(true)}
            disabled={!product.inStock}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
