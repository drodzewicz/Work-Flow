import React, { ChangeEvent, FormEvent, useRef } from "react";
import { FaTimes, FaSearch } from "react-icons/fa";
import "./SearchInput.scss";
import "./SearchInput-dark.scss";
import { SearchInputProps } from ".";
import SearchResult from "./SearchResult";
import { useClickOutside } from "@/Hooks/useClickOutside";

const SearchInput: React.FC<SearchInputProps> = ({
  debounceTimeout,
  search,
  result,
  clickResult,
  clear,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  let watingTimeout: ReturnType<typeof setTimeout> | null = null;
  useClickOutside(searchInputRef, clear);

  const searchHandler = (event: FormEvent) => {
    event.preventDefault();
    const searchString = searchInputRef.current?.value as string;
    if (searchString.length > 0) search(searchString);
  };

  const searchOnChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value;
    if (watingTimeout) clearTimeout(watingTimeout);
    watingTimeout = setTimeout(() => {
      if (searchString.length > 0) search(searchString);
    }, debounceTimeout);
  };

  const clearInputSearch = () => {
    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
    clear();
  };

  return (
    <div className="search-input">
      <form onSubmit={searchHandler} className="search-input__form">
        <input
          ref={searchInputRef}
          placeholder="search..."
          className="search-input__input"
          type="text"
          onChange={searchOnChangeHandler}
        />
        {result.length > 0 ? (
          <FaTimes onClick={clearInputSearch} className="search-input__icon" />
        ) : (
          <FaSearch onClick={searchHandler} className="search-input__icon" />
        )}
      </form>
      <SearchResult data={result} onClick={clickResult} />
    </div>
  );
};

export default SearchInput;
