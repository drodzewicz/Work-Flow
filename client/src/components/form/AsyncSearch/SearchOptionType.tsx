import React from "react";

export type OptionType = { id: string; label: string; disabled?: boolean };

export type SearchOptionType<T> = {
    option: T & OptionType;
    onClick?: (option: T & OptionType) => void;
    disabled?: boolean;
    render?: (option: T & OptionType) => React.ReactNode;
};

function SearchOptionType<T>({ option, onClick, render, disabled = false }: SearchOptionType<T>) {
    const onClickHandler = (option: T & OptionType) => {
        if (disabled) {
            return;
        }
        onClick?.(option);
    };

    return (
        <div
            key={option.label}
            data-testid="async-search-option"
            className={`async-search__option ${disabled ? "async-search__option--disabled" : ""}`}
            onClick={() => onClickHandler(option)}
        >
            {render ? render?.(option) : option.label}
        </div>
    );
}

export default SearchOptionType;
