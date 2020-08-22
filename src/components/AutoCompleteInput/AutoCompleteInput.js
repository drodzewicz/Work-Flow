import React, { useRef } from "react";
import "./AutoCmpleteInput.scss";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ClearIcon from "@material-ui/icons/Clear";

const AutoCompleteInput = ({ timeout, execMethod, searchResult, clickResult, clearResults }) => {
	const searchInputRef = useRef();

	let watingTimeout = 0;

	const doSearch = (event) => {
		const searchText = event.target.value;
		if (watingTimeout) clearTimeout(watingTimeout);
		watingTimeout = setTimeout(() => {
			if(searchText.length > 0) execMethod(searchText);
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
						<SearchIcon className="search-icon" />
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

export default AutoCompleteInput;
