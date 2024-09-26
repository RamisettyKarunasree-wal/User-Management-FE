import React from "react";
import { Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import "./SearchBar.css";

const SearchBar = ({ filter, handleFilter }) => {
  return (
    <div className="d-flex search-input-wrapper align-items-center">
      <span className="search-icon me-2">
        <CiSearch />
      </span>
      <Form.Control
        type="text"
        placeholder="Search by name"
        value={filter}
        onChange={handleFilter}
        className="w-100"
      />
    </div>
  );
};

export default SearchBar;
