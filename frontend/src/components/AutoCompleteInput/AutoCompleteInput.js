import React, { useRef } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ClearIcon from "@material-ui/icons/Clear";
import PropTypes from "prop-types";
import "./AutoCmpleteInput.scss";

const AutoCompleteInput = ({ timeout, execMethod, searchResult, clickResult, clearResults }) => {
	const searchInputRef = useRef();

	let watingTimeout = 0;

	const searchByText = () => {
		const searchString = searchInputRef.current.value;
		if(searchString.length > 0) execMethod(searchString);
	}

	const doSearch = (event) => {
		const searchString = event.target.value;
		if (watingTimeout) clearTimeout(watingTimeout);
		watingTimeout = setTimeout(() => {
			if(searchString.length > 0) execMethod(searchString);
		}, timeout);
	};

	const clearInputSearch = () => {
		searchInputRef.current.value = "";
		clearResults();
	};

	return (
		<ClickAwayListener onClickAway={clearResults}>
			<div className="auto-complete-input-wrapper">
				<div className="auto-complete-input">
					<input
						ref={searchInputRef}
						placeholder="search..."
						className="search-input"
						type="text"
						onChange={doSearch}
					/>
					{searchResult.length > 0 ? (
						<ClearIcon onClick={clearInputSearch} className="search-icon clear-icon" />
					) : (
						<SearchIcon onClick={searchByText} className="search-icon" />
					)}
				</div>
				<div
					className={`search-result-container ${searchResult.length > 5 ? "overflow-scroll " : ""}`}
				>
					{searchResult &&
						searchResult.map((data) => (
							<div
								className="search-result-item"
								onClick={() => clickResult(data)}
								key={data.id}
							>
								<span>{data.text}</span>
							</div>
						))}
				</div>
			</div>
		</ClickAwayListener>
	);
};

AutoCompleteInput.defaultProps = {
	timeout: 0,
}
AutoCompleteInput.propTypes = {
	timeout: PropTypes.number,
	execMethod: PropTypes.func.isRequired,
	searchResult: PropTypes.array.isRequired,
	clickResult: PropTypes.func.isRequired,
	clearResults: PropTypes.func.isRequired
}

export default AutoCompleteInput;
