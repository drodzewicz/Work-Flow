import React from "react";

export type OptionType = { id: string; label: string };

type SearchOptionType = {
  option: OptionType;
  onClick?: (option: OptionType) => void;
  disabled?: boolean;
  selected?: boolean;
};

const SearchOptionType: React.FC<SearchOptionType> = ({
  option,
  onClick,
  disabled = false,
  selected = false,
}) => {
  const onClickHandler = (option: OptionType) => {
    if (disabled) {
      return;
    }
    onClick?.(option);
  };

  return (
    <div
      key={option.label}
      className={`async-search__option ${selected ? "async-search__option--selected" : ""}`}
      onClick={() => onClickHandler(option)}
    >
      {option.label}
    </div>
  );
};

export default SearchOptionType;
