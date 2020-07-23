import React from "react";
import "./Pagination.scss";
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const Pagination = ({ currentPage, amountOfPages }) => {
  return (
    <div className="pagination-container">
      <button className=" pagination-itemleft-arrow">
        <KeyboardArrowLeftIcon />
      </button>
      <button className="pagination-item">{currentPage}</button>
      <button className="pagination-item current-page">{currentPage}</button>
      <button className="pagination-item">{currentPage}</button>
      <button className="pagination-item right-arrow">
        <KeyboardArrowRightIcon />
      </button>
    </div>
  )
}

export default Pagination
