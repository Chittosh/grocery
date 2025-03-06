import React, { useState } from "react";
import { Search } from "lucide-react";
import "../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search for groceries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit">
        <Search size={20} color="white" strokeWidth={2.5} />
      </button>
    </form>
  );
};

export default SearchBar;