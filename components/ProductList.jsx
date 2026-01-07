import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByCategory, filterByPrice, searchProducts, resetFilters } from "../redux/productsSlice";
import { categories } from "../data/clothesData";
import ProductCard from "./ProductCard";
import "./ProductList.css";

const ProductList = ({ onProductClick }) => {
  const dispatch = useDispatch();
  const { filteredProducts, selectedCategory, selectedPriceRange, searchTerm } = useSelector((state) => state.products);
  const [priceRange, setPriceRange] = useState(selectedPriceRange);

  const handleCategoryChange = (categoryId) => {
    dispatch(filterByCategory(categoryId));
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value);
    setPriceRange([priceRange[0], newPrice]);
    dispatch(filterByPrice([priceRange[0], newPrice]));
  };

  const handleSearchChange = (e) => {
    dispatch(searchProducts(e.target.value));
  };

  const handleResetFilters = () => {
    setPriceRange([0, 300]);
    dispatch(resetFilters());
  };

  return (
    <div className="product-list-container">
      <div className="filters-sidebar">
        <h3>Filters</h3>

        {/* Search Bar */}
        <div className="filter-group">
          <label>Search Products</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        {/* Category Filter */}
        <div className="filter-group">
          <label>Category</label>
          <div className="category-list">
            {categories.map((category) => (
              <label key={category.id} className="category-checkbox">
                <input
                  type="radio"
                  name="category"
                  value={category.id}
                  checked={selectedCategory === category.id}
                  onChange={() => handleCategoryChange(category.id)}
                />
                {category.name}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="filter-group">
          <label>Price Range</label>
          <div className="price-display">$0 - ${priceRange[1]}</div>
          <input
            type="range"
            min="0"
            max="300"
            value={priceRange[1]}
            onChange={handlePriceChange}
            className="price-slider"
          />
        </div>

        {/* Reset Filters */}
        <button className="btn-reset-filters" onClick={handleResetFilters}>
          Reset All Filters
        </button>
      </div>

      <div className="products-content">
        <div className="products-header">
          <h2>Our Clothing Collection</h2>
          <p className="product-count">
            Showing {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onViewDetails={onProductClick}
              />
            ))}
          </div>
        ) : (
          <div className="no-products">
            <h3>No products found</h3>
            <p>Try adjusting your filters or search terms</p>
            
            <button
              className="btn-reset-filters"
              onClick={handleResetFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
