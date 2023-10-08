import React from "react";

export type OptionType = { id: string; label: string; disabled?: boolean };

type SearchOptionType<T> = {
  option: T & OptionType;
  onClick?: (option: T & OptionType) => void;
  disabled?: boolean;
};

function SearchOptionType<T>({ option, onClick, disabled = false }: SearchOptionType<T>) {
  const onClickHandler = (option: T & OptionType) => {
    if (disabled) {
      return;
    }
    onClick?.(option);
  };

  return (
    <div
      key={option.label}
      className={`async-search__option ${disabled ? "async-search__option--disabled" : ""}`}
      onClick={() => onClickHandler(option)}
    >
      {option.label}
    </div>
  );
}

export default SearchOptionType;
