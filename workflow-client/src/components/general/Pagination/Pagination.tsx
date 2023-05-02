import React from "react";
import "./Pagination.scss";
import "./Pagination-dark.scss";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { PaginationProps } from "./";

// TODO create a usePagination hook for currentPage total and new page handler

const Pagination: React.FC<PaginationProps> = ({ current, total, handleChange }) => {
  const previousPage = () => {
    handleChange(current - 1);
  };
  const nextPage = () => {
    handleChange(current + 1);
  };
  if (total < 2) return null;
  else
    return (
      <nav aria-label="Pagination" className="pagination">
        {current !== 1 ? (
          <>
            <button
              aria-label="Previouse page arrow"
              onClick={previousPage}
              className=" pagination__item pagination__arrow">
              <FaAngleLeft />
            </button>
            <div
              aria-label="Previouse page"
              className={`pagination__dots ${current - 1 === 1 ? "hide" : ""}`}>
              ...
            </div>
            <button onClick={previousPage} className="pagination__item">
              {current - 1}
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
        <button aria-label="Current page" className="pagination__item pagination__current-page">
          {current}
        </button>
        {current !== total ? (
          <>
            <button aria-label="Next page" onClick={nextPage} className="pagination__item">
              {current + 1}
            </button>
            <div className={`pagination__dots ${current + 1 === total ? "hide" : ""}`}>...</div>
            <button
              aria-label="Next page arrow"
              onClick={nextPage}
              className="pagination__item pagination__arrow">
              <FaAngleRight />
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
      </nav>
    );
};

export default Pagination;
