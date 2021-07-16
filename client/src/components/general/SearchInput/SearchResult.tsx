import React from "react";
import { SearchResultI, SearchResultProps } from ".";


const SearchResult: React.FC<SearchResultProps> = ({ onClick, data }) => {
  return (
    <ul className="search-input__results scrollbar">
      {data.map((el: SearchResultI) => (
        <li key={el._id} className="search-input__results__item" onClick={() => {
          onClick(el);
        }}>
          {el.text}
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
