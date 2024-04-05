import React, { useRef, useState } from "react";

import { FaSearch, FaTimes } from "react-icons/fa";

import { useClickOutside } from "@/hooks/useClickOutside";

import "./AsyncSearch.scss";

import AsyncInput, { AsyncInputProps } from "../AsyncInput/AsyncInput";
import AsyncSearchDropdown from "./AsyncSearchDropdown";
import { OptionType } from "./SearchOptionType";

type AsyncSearchProps<T> = {
    options: (T & OptionType)[];
    selectedOptions?: (T & OptionType)[];
    disabled?: boolean;
    isClearable?: boolean;
    isSearchable?: boolean;
    filterOptions?: boolean;
    hideSelectedOptions?: boolean;
    showSearchIcon?: boolean;
    showSelectedValues?: boolean;
    noResultMessage?: string;
    closeDropdownOnOptionClick?: boolean;
    onSelect?: (option: T & OptionType) => void;
    onClearSelection?: () => void;
    renderOption?: (option: T & OptionType) => React.ReactNode;
};

function AsyncSearch<T = unknown>({
    options,
    onSelect,
    onClearSelection,
    renderOption,
    disabled,
    noResultMessage,
    isSearchable = true,
    selectedOptions = [],
    hideSelectedOptions = true,
    isClearable = true,
    filterOptions = true,
    showSearchIcon = true,
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
        <div data-testid="async-search" className="async-search">
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
                {filter && (
                    <span
                        data-testid="async-clear-icon"
                        onClick={onClearInput}
                        className="async-search__clear"
                    >
                        <FaTimes className="async-search__icon" />
                    </span>
                )}
                {showSearchIcon && !filter && (
                    <FaSearch data-testid="async-search-icon" className="async-search__icon" />
                )}
            </AsyncInput>
            <AsyncSearchDropdown<T>
                show={openDropdown}
                dropdownRef={optionContainerRef}
                inputRef={asyncInputRef}
                options={filteredOptions}
                showClearOption={isClearable && selectedValue.length > 0}
                onClearSelectedOptions={onClearSelectedOptions}
                onOptionClick={onOptionClick}
                renderOption={renderOption}
                noResultMessage={noResultMessage}
            />
        </div>
    );
}

export default AsyncSearch;
