import React, { useState, useEffect } from "react";
import { Bookmark, ShoppingCart, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import "../styles/Searchpage.css";
import "../styles/Homepage.css";
import productData from "./productData";
import { addToCart } from './Cart';

const SearchPage = () => {
  // Get search term from URL query parameters
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("term") || "";
  
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [selectedCategory, setSelectedCategory] = useState("Fruits & Vegetables");
  const [selectedSubCategory, setSelectedSubCategory] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(true); // Default to open
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [activeFilter, setActiveFilter] = useState(null);

  // Extract unique categories and subcategories
  const uniqueCategories = ["Fruits & Vegetables"];
  const subCategories = {
    "Fruits & Vegetables": ["All", "Exotic Fruits", "Exotic Vegetables"]
  };

  // Extract unique brands from productData
  const uniqueBrands = [...new Set(productData.map((product) => product.brand))];

  // Find min and max prices for price range slider
  const minPrice = Math.floor(Math.min(...productData.map(p => p.discountedPrice)));
  const maxPrice = Math.ceil(Math.max(...productData.map(p => p.discountedPrice)));

  useEffect(() => {
    let result = productData;

    // Filter by search term across name, brand, and category
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTermLower) ||
        product.brand.toLowerCase().includes(searchTermLower) ||
        product.category.toLowerCase().includes(searchTermLower)
      );
    }

    // Filter by category
    if (selectedSubCategory !== "All") {
      result = result.filter((product) => product.category === selectedSubCategory);
    }

    // Filter by ratings
    if (selectedRatings.length > 0) {
      result = result.filter((product) =>
        selectedRatings.some((rating) => product.rating >= rating)
      );
    }

    // Filter by selected brands
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand));
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.discountedPrice >= priceRange[0] &&
        product.discountedPrice <= priceRange[1]
    );

    setFilteredProducts(result);
  }, [searchTerm, selectedSubCategory, selectedRatings, selectedBrands, priceRange]);

  const toggleRatingFilter = (rating) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const toggleBrandFilter = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleSubCategoryChange = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  const handlePriceRangeChange = (index, value) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(value, 10);
    setPriceRange(newPriceRange);
  };

  const toggleFilter = (filterName) => {
    setActiveFilter(activeFilter === filterName ? null : filterName);
  };

  const toggleSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleAddToCart = (product) => {
    // Use the addToCart function imported from Cart.js
    const updatedCart = addToCart(product);
    
    // Show a small notification that item was added
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className={`search-page ${isFilterOpen ? 'filter-open' : 'filter-closed'}`}>
      {isFilterOpen && (
        <div className="search-sidebar">
          <div className="sidebar-header" onClick={toggleSidebar}>
            <ChevronLeft size={24} />
            <span>Hide Filter</span>
          </div>

          <div className="category-section">
            <h3>Shop by Category</h3>
            <div className="category-navigation">
              <div
                className="category-main"
                onClick={() => toggleFilter('categories')}
              >
                {activeFilter === 'categories' ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                <span>{selectedCategory}</span>
              </div>
              <div className={`subcategory-list ${activeFilter === 'categories' ? 'active' : ''}`}>
                {subCategories[selectedCategory].map(subCategory => (
                  <div
                    key={subCategory}
                    className={`subcategory ${selectedSubCategory === subCategory ? 'active' : ''}`}
                    onClick={() => handleSubCategoryChange(subCategory)}
                  >
                    {subCategory}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="refined-section">
            <div className="refined-header">
              <h3>Refined by</h3>
              {searchTerm && (
                <div className="active-search-term">
                  <span>Search: "{searchTerm}"</span>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="price-filter">
              <h4 onClick={() => toggleFilter('price')}>
                Price Range
                {activeFilter === 'price' ? <ChevronRight size={16} className="toggle-icon" /> : <ChevronLeft size={16} className="toggle-icon" />}
              </h4>
              <div className={`price-filter-content ${activeFilter === 'price' ? 'active' : ''}`}>
                <div className="price-slider-container">
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[0]}
                    onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                    className="price-slider min-slider"
                  />
                  <input
                    type="range"
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                    className="price-slider max-slider"
                  />
                </div>
                <div className="price-range-display">
                  <span>₹{priceRange[0]}</span>
                  <span>to</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="rating-filter">
              <h4 onClick={() => toggleFilter('rating')}>
                Product Rating
                {activeFilter === 'rating' ? <ChevronRight size={16} className="toggle-icon" /> : <ChevronLeft size={16} className="toggle-icon" />}
              </h4>
              <div className={`rating-filter-content ${activeFilter === 'rating' ? 'active' : ''}`}>
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="rating-checkbox">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRatingFilter(rating)}
                    />
                    {[...Array(rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                    {rating !== 1 && <span className="star-text">& above</span>}
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="brands-filter">
              <h4 onClick={() => toggleFilter('brands')}>
                Brands
                {activeFilter === 'brands' ? <ChevronRight size={16} className="toggle-icon" /> : <ChevronLeft size={16} className="toggle-icon" />}
              </h4>
              <div className={`brands-filter-content ${activeFilter === 'brands' ? 'active' : ''}`}>
                <input
                  type="text"
                  placeholder="Search brands"
                  className="brand-search"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                />
                {uniqueBrands
                  .filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase()))
                  .map((brand) => (
                    <label key={brand} className="brand-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrandFilter(brand)}
                      />
                      {brand}
                    </label>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="search-results">
        <div className="results-header">
          <div className="results-count">
            {filteredProducts.length} Results
            {searchTerm && <span className="search-term-indicator"> for "{searchTerm}"</span>}
          </div>
          <div className="results-actions">
            {!isFilterOpen ? (
              <Filter size={20} onClick={toggleSidebar} className="show-filter-icon" />
            ) : null}
          </div>
        </div>

        <div className={`products-grid ${isFilterOpen ? 'three-column' : 'four-column'}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="discount-badge">{product.discount}% OFF</div>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                </div>
                <div className="brand-label">{product.brand}</div>
                <div className="product-name">{product.name}</div>
                <div className="weight-selector">
                  <select>
                    <option>{product.weight}</option>
                  </select>
                </div>
                <div className="pricing">
                  <div>
                    <span className="discounted-price">₹{product.discountedPrice}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>
                  <Bookmark className="bookmark-icon" size={20} />
                </div>
                <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                  <ShoppingCart size={20} />
                  Add
                </button>
              </div>
            ))
          ) : (
            <div className="no-results">
              <h3>No products found for "{searchTerm}"</h3>
              <p>Try a different search term or browse categories</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;