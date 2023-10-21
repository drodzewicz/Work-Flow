import React, { useRef, useState } from "react";

import { FaSearch, FaTimes } from "react-icons/fa";

import { useClickOutside } from "@/hooks/useClickOutside";

import "./AsyncSearch.scss";

import AsyncInput, { AsyncInputProps } from "../AsyncInput/AsyncInput";
import SearchOptionType, { OptionType } from "./SearchOptionType";

type AsyncSearchProps<T> = {
  options: (T & OptionType)[];
  selectedOptions?: (T & OptionType)[];
  disabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  filterOptions?: boolean;
  hideSelectedOptions?: boolean;
  showSelectedValues?: boolean;
  closeDropdownOnOptionClick?: boolean;
  onSelect?: (option: T & OptionType) => void;
  onClearSelection?: () => void;
};

function AsyncSearch<T = unknown>({
  options,
  onSelect,
  onClearSelection,
  disabled,
  isSearchable = true,
  selectedOptions = [],
  hideSelectedOptions = true,
  isClearable = true,
  filterOptions = true,
  showSelectedValues = true,
  closeDropdownOnOptionClick = true,
  ...inputProps
}: AsyncSearchProps<T> & AsyncInputProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<(T & OptionType)[]>(selectedOptions);
  const asyncInputRef = useRef<HTMLInputElement>(null);
  const optionContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside([asyncInputRef, optionContainerRef], () => setOpenDropdown(false));

  const toggleDropdown = () => {
    setOpenDropdown((state) => !state);
  };

  const onOptionClick = (option: T & OptionType) => {
    if (closeDropdownOnOptionClick) {
      setOpenDropdown(false);
    }
    setSelectedValue([option]);
    onSelect?.(option);
    setFilter("");
  };

  const placeholder = showSelectedValues
    ? selectedValue?.map((option) => option.label)?.join(", ")
    : undefined;

  const onInputChange = (inputValue: string) => {
    setFilter(inputValue);
    inputProps?.onChange?.(inputValue);
  };

  const onClearInput = () => {
    setFilter("");
  };

  const onClearSelectedOptions = () => {
    setSelectedValue([]);
    onClearSelection?.();
  };

  const filteredOptions = options.filter((option) => {
    const isSelected =
      hideSelectedOptions &&
      selectedValue.find((selectedOption) => selectedOption.id === option.id);
    const isFiltered = filterOptions && filter ? option.label.includes(filter) : true;
    return isFiltered && !isSelected;
  });

  return (
    <div className="async-search">
      <AsyncInput
        {...inputProps}
        disabled={disabled}
        readOnly={!isSearchable}
        value={filter}
        ref={asyncInputRef}
        onChange={onInputChange}
        onClick={toggleDropdown}
        placeholder={placeholder}
      >
        {filter ? (
          <span onClick={onClearInput} className="async-input__clear">
            <FaTimes />
          </span>
        ) : (
          <FaSearch />
        )}
      </AsyncInput>
      {openDropdown && (
        <div ref={optionContainerRef} className="async-search__options">
          {isClearable && selectedValue.length > 0 && (
            <SearchOptionType
              option={{ id: "_clear_", label: "clear" }}
              onClick={onClearSelectedOptions}
            />
          )}
          {filteredOptions.map((option) => (
            <SearchOptionType<T>
              key={`${option.id}-option`}
              option={option}
              disabled={option.disabled}
              onClick={onOptionClick}
            />
          ))}
          {filteredOptions.length === 0 && <div>No result</div>}
        </div>
      )}
    </div>
  );
}

export default AsyncSearch;
