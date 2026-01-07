import { createSlice } from "@reduxjs/toolkit";
import { clothesProducts } from "../data/clothesData";

const initialState = {
  products: clothesProducts,
  filteredProducts: clothesProducts,
  selectedCategory: "all",
  selectedPriceRange: [0, 300],
  searchTerm: "",
  ss:""
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByCategory: (state, action) => {
      state.selectedCategory = action.payload;
      applyFilters(state);
    },

    filterByPrice: (state, action) => {
      state.selectedPriceRange = action.payload;
      applyFilters(state);
    },

    searchProducts: (state, action) => {
      state.searchTerm = action.payload;
      applyFilters(state);
    },

    resetFilters: (state) => {
      state.selectedCategory = "all";
      state.selectedPriceRange = [0, 300];
      state.searchTerm = "";
      state.filteredProducts = state.products;
    },
  },
});

const applyFilters = (state) => {
  let filtered = state.products;

  // Filter by category
  if (state.selectedCategory !== "all") {
    filtered = filtered.filter(
      (product) => product.category === state.selectedCategory
    );
  }

  // Filter by price range
  filtered = filtered.filter(
    (product) =>
      product.price >= state.selectedPriceRange[0] &&
      product.price <= state.selectedPriceRange[1]
  );

  // Filter by search term
  if (state.searchTerm) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
    );
  }

  state.filteredProducts = filtered;
};

export const {
  filterByCategory,
  filterByPrice,
  searchProducts,
  resetFilters,
} = productsSlice.actions;
export default productsSlice.reducer;
