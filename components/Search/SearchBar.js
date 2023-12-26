// components/SearchBar.js
import { useState } from "react";
import styles from "./SearchBar.module.css";
import { CiSearch } from "react-icons/ci";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search table"
        className={styles.input}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <CiSearch className={styles.icon} onClick={handleSearch} />
    </div>
  );
};

export default SearchBar;
