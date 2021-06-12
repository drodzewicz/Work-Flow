import React from "react";
import "./Pagination.scss";
import "./Pagination-dark.scss";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { PaginationProps } from "./";

const Pagination: React.FC<PaginationProps> = ({ currentPage, amountOfPages, handleChange }) => {
  const previousPage = () => {
    handleChange(currentPage - 1);
  };
  const nextPage = () => {
    handleChange(currentPage + 1);
  };
  if (amountOfPages < 2) return null;
  else
    return (
      <nav className="pagination">
        {currentPage !== 1 ? (
          <>
            <button onClick={previousPage} className=" pagination__item pagination__arrow">
              <KeyboardArrowLeftIcon />
            </button>
            <div className={`pagination__dots ${currentPage - 1 === 1 ? "hide" : ""}`}>...</div>
            <button onClick={previousPage} className="pagination__item">
              {currentPage - 1}
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
        <button className="pagination__item pagination__current-page">{currentPage}</button>
        {currentPage !== amountOfPages ? (
          <>
            <button onClick={nextPage} className="pagination__item">
              {currentPage + 1}
            </button>
            <div className={`pagination__dots ${currentPage + 1 === amountOfPages ? "hide" : ""}`}>
              ...
            </div>
            <button onClick={nextPage} className="pagination__item pagination__arrow">
              <KeyboardArrowRightIcon />
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
      </nav>
    );
};

export default Pagination;
