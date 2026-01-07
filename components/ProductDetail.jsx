import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import "./ProductDetail.css";

const ProductDetail = ({ product, onClose }) => {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0] || "");
  const [selectedColor, setSelectedColor] = React.useState(
    product.colors?.[0] || ""
  );
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
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
  };

  return (
    <div className="product-detail-overlay" onClick={onClose}>
      <div className="product-detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="btn-close-detail" onClick={onClose}>
          ✕
        </button>

        <div className="detail-container">
          <div className="detail-image">
            <img src={product.image} alt={product.name} />
          </div>

          <div className="detail-info">
            <h1>{product.name}</h1>

            <div className="detail-rating">
              <span className="detail-stars">★★★★★</span>
              <span className="detail-reviews">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <p className="detail-description">{product.description}</p>

            <div className="detail-price">${product.price.toFixed(2)}</div>

            <div className="detail-availability">
              {product.inStock ? (
                <span className="in-stock">✓ In Stock</span>
              ) : (
                <span className="out-of-stock-text">Out of Stock</span>
              )}
            </div>

            {product.inStock && (
              <>
                {product.sizes && product.sizes.length > 0 && (
                  <div className="detail-option">
                    <label>Size</label>
                    <div className="size-options">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          className={`size-btn ${
                            selectedSize === size ? "active" : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.colors && product.colors.length > 0 && (
                  <div className="detail-option">
                    <label>Color</label>
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

                <div className="detail-option">
                  <label>Quantity</label>
                  <div className="quantity-input">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                    >
                      −
                    </button>
                    <input type="number" value={quantity} readOnly />
                    <button onClick={() => setQuantity(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="btn-detail-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </>
            )}

            <button className="btn-detail-close" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
