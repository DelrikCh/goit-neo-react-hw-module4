import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function SearchBar({ onSubmit }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") {
      toast.error("Please enter a search term.");
      return;
    }
    onSubmit(input);
  };

  return (
    <header className={styles.header}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.searchContainer}>
          <button type="submit" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search images and photos"
            className={styles.input}
          />
        </div>
      </form>
    </header>
  );
}

export default SearchBar;
