import React from "react";
import "./AutoCmpleteInput.scss";
import SearchIcon from "@material-ui/icons/Search";

const AutoCompleteInput = ({
  timeout,
  execMethod,
  searchResult,
  clickResult,
}) => {
  let watingTimeout = 0;

  const doSearch = (event) => {
    const searchText = event.target.value;
    if (watingTimeout) clearTimeout(watingTimeout);
    watingTimeout = setTimeout(() => {
      execMethod(searchText);
    }, timeout);
  };

  return (
    <div className="auto-complete-input">
      <input
        placeholder="search..."
        className="search-input"
        type="text"
        onChange={doSearch}
      />
      <SearchIcon />
      <div className="search-result-container">
        {searchResult &&
          searchResult.map((data) => (
            <div
              className="search-result-item"
              onClick={() => clickResult(data)}
              key={data.id}
            >
              {data.text}
            </div>
          ))}
      </div>
    </div>
  );
};

export default AutoCompleteInput;
