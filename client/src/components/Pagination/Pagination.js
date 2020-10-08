import React from "react";
import PropTypes from "prop-types";
import "./Pagination.scss";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";

const Pagination = ({ currentPage, amountOfPages, handleChange }) => {
	const previousePage = () => {
			handleChange(currentPage - 1);
	};
	const nextPage = () => {
		handleChange(currentPage + 1);
	};
	if(	amountOfPages < 2) return null
	 else return (
		<nav className="pagination-container">
			{currentPage !== 1 ? (
				<>
					<button onClick={previousePage} className=" pagination-item arrow">
						<KeyboardArrowLeftIcon />
					</button>
					<div className={`three-dots ${currentPage - 1 === 1 ? "hide" : ""}`}>...</div>
					<button onClick={previousePage} className="pagination-item">
						{currentPage - 1}
					</button>
				</>
			) : (
				<div className="empty"></div>
			)}
			<button className="pagination-item current-page">{currentPage}</button>
			{currentPage !== amountOfPages ? (
				<>
					<button onClick={nextPage} className="pagination-item">
						{currentPage + 1}
					</button>
					<div className={`three-dots ${currentPage + 1 === amountOfPages ? "hide" : ""}`}>...</div>
					<button onClick={nextPage} className="pagination-item arrow">
						<KeyboardArrowRightIcon />
					</button>
				</>
			) : (
				<div className="empty"></div>
			)}
		</nav>
	);
};

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	amountOfPages: PropTypes.number.isRequired,
	handleChange: PropTypes.func.isRequired,
};

export default Pagination;
