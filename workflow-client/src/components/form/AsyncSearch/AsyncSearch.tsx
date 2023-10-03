import React, { useRef, useState } from "react";

import { FaTimes } from "react-icons/fa";

import { useClickOutside } from "@/hooks/useClickOutside";

import "./AsyncSearch.scss";

import AsyncInput, { AsyncInputProps } from "../AsyncInput/AsyncInput";
import SearchOptionType, { OptionType } from "./SearchOptionType";

type AsyncSearchProps = {
  options: OptionType[];
  isMulti?: boolean;
  allowEmptyValue?: boolean;
  showSelectedValues?: boolean;
  closeDropdownOnOptionClick?: boolean;
  clearInputOnSelect?: boolean;
  onSelect?: (option: unknown) => void;
};

function AsyncSearch({
  options,
  onSelect,
  isMulti = false,
  showSelectedValues = true,
  closeDropdownOnOptionClick = true,
  allowEmptyValue = true,
  clearInputOnSelect = true,
  ...props
}: AsyncSearchProps & AsyncInputProps) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const asyncInputRef = useRef<HTMLInputElement>(null);
  const optionContainerRef = useRef<HTMLDivElement>(null);

  useClickOutside([asyncInputRef, optionContainerRef], () => setOpenDropdown(false));

  const toggleDropdown = () => {
    setOpenDropdown((state) => !state);
  };

  const onOptionClick = (option: OptionType) => {
    if (closeDropdownOnOptionClick) {
      setOpenDropdown(false);
    }

    if (isMulti) {
      // toggle select
      setSelectedOptions((selectedOptionsState) => {
        const optionIndex = selectedOptionsState.findIndex(
          (selectedOption) => selectedOption.id === option.id
        );
        if (optionIndex > -1) {
          // if option exists in selected list then remove it
          return selectedOptionsState.filter((selectedOption) => selectedOption.id !== option.id);
        } else {
          // if it doesn't then add it
          return [...selectedOptionsState, option];
        }
      });
    } else {
      setSelectedOptions([option]);
    }

    onSelect?.(option);
    if (clearInputOnSelect && asyncInputRef.current) {
      asyncInputRef.current.value = "";
    }
  };

  const placeholder = showSelectedValues
    ? selectedOptions?.map((option) => option.label)?.join(", ")
    : undefined;

  const optionIsSelected = (option: OptionType) => {
    return !!selectedOptions?.find((selectedOption) => selectedOption.id === option.id);
  };

  const filteredOptions = isMulti ? options : options.filter((option) => !optionIsSelected(option));

  return (
    <div className="async-search">
      <AsyncInput {...props} ref={asyncInputRef} onClick={toggleDropdown} placeholder={placeholder}>
        {allowEmptyValue && !!selectedOptions.length && (
          <span onClick={() => setSelectedOptions([])} className="async-input__clear">
            <FaTimes />
          </span>
        )}
      </AsyncInput>
      {openDropdown && (
        <div ref={optionContainerRef} className="async-search__options">
          {filteredOptions.map((option) => (
            <SearchOptionType
              key={option.label}
              option={option}
              selected={optionIsSelected(option)}
              //   disabled={isMulti ? optionIsSelected(option) : false}
              onClick={onOptionClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default AsyncSearch;
