import React from "react";
import "./Pagination.scss";
import "./Pagination-dark.scss";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import { PaginationProps } from "./";

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
      <nav className="pagination">
        {current !== 1 ? (
          <>
            <button onClick={previousPage} className=" pagination__item pagination__arrow">
              <KeyboardArrowLeftIcon />
            </button>
            <div className={`pagination__dots ${current - 1 === 1 ? "hide" : ""}`}>...</div>
            <button onClick={previousPage} className="pagination__item">
              {current - 1}
            </button>
          </>
        ) : (
          <div className="empty"></div>
        )}
        <button className="pagination__item pagination__current-page">{current}</button>
        {current !== total ? (
          <>
            <button onClick={nextPage} className="pagination__item">
              {current + 1}
            </button>
            <div className={`pagination__dots ${current + 1 === total ? "hide" : ""}`}>...</div>
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
