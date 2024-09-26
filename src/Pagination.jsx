import React from "react";
import "./Pagination.css"; // Import the updated CSS

const Pagination = ({ pageCount, currentPage, handlePageClick }) => {
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
      pages.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? "active" : ""}`}
        >
          <a
            href="#!"
            className="page-link"
            onClick={() => handlePageClick({ selected: i - 1 })}
          >
            {i}
          </a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination">{renderPageNumbers()}</ul>
    </nav>
  );
};

export default Pagination;
