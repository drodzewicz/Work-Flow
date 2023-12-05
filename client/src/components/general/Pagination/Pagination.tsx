import React from "react";

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

import "./Pagination.scss";

export interface PaginationI {
  current: number;
  total: number;
  className?: string;
}

export interface PaginationProps extends PaginationI {
  handleChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  handleChange,
  className = "",
}) => {
  const previousPage = () => {
    handleChange(current - 1);
  };
  const nextPage = () => {
    handleChange(current + 1);
  };
  if (total < 2) return null;
  else
    return (
      <nav aria-label="pagination" className={`pagination ${className}`}>
        {current !== 1 ? (
          <>
            <button
              aria-label="previous-page-navigation"
              onClick={previousPage}
              className=" pagination__item pagination__arrow"
            >
              <FaAngleLeft />
            </button>
            <div className={`pagination__elipsis ${current - 1 === 1 ? "hide" : ""}`}>...</div>
            <button aria-label="previous-page" onClick={previousPage} className="pagination__item">
              {current - 1}
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
        <button aria-label="current-page" className="pagination__item pagination__current-page">
          {current}
        </button>
        {current !== total ? (
          <>
            <button aria-label="next-page" onClick={nextPage} className="pagination__item">
              {current + 1}
            </button>
            <div className={`pagination__elipsis ${current + 1 === total ? "hide" : ""}`}>...</div>
            <button
              aria-label="next-page-navigation"
              onClick={nextPage}
              className="pagination__item pagination__arrow"
            >
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
