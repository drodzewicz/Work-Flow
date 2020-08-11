import React, { useState } from "react";
import "./AutoCmpleteInput.scss";
import SearchIcon from "@material-ui/icons/Search";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const AutoCompleteInput = ({ timeout, execMethod, searchResult, clickResult }) => {
	const [openDropDown, setOpenDrawer] = useState(false);
	let watingTimeout = 0;

	const doSearch = (event) => {
		const searchText = event.target.value;
		if (watingTimeout) clearTimeout(watingTimeout);
		watingTimeout = setTimeout(() => {
			setOpenDrawer(true);
			execMethod(searchText);
		}, timeout);
	};

	const closeDropDown = () => {
		setOpenDrawer(false);
	};

	return (
		<ClickAwayListener onClickAway={closeDropDown}>
			<div className="auto-complete-input-wrapper">
				<div className="auto-complete-input">
					<input placeholder="search..." className="search-input" type="text" onChange={doSearch} />
					<SearchIcon className="search-icon" />
				</div>
        <div className="search-result-container">
						{openDropDown &&
							searchResult &&
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
