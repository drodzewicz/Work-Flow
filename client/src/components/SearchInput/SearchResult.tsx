import React from "react";

interface SearchResultProps {
  onClick: (data?: any) => void;
  data: any;
}

export interface SearchResultInterface {
  text: string;
  _id: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ onClick, data }) => {
  return (
    <ul className={`search-input__results ${data.length > 5 ? "overflow-scroll " : ""}`}>
      {data.map((el: SearchResultInterface) => (
        <li key={el._id} className="search-input__result-item" onClick={() => onClick(el)}>
          {el.text}
        </li>
      ))}
    </ul>
  );
};

export default SearchResult;
