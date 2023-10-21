import React from "react";

import { FaTrash } from "react-icons/fa";

import Portal from "@/components/layout/Portal";

import SearchOptionType, { OptionType } from "./SearchOptionType";

export type AsyncSearchDropdownProps<T> = {
  show: boolean;
  showClearOption: boolean;
  inputRef: React.RefObject<HTMLElement>;
  onClearSelectedOptions?: () => void;
  onOptionClick?: (option: T & OptionType) => void;
  options: (T & OptionType)[];
  ref: React.ForwardedRef<HTMLDivElement>;
  renderOption?: (option: T & OptionType) => React.ReactNode;
};

function AsyncSearchDropdown<T = unknown>({
  show,
  ref,
  showClearOption,
  inputRef,
  options,
  onClearSelectedOptions,
  onOptionClick,
  renderOption,
}: AsyncSearchDropdownProps<T>) {
  const inputBoundingBox = inputRef.current?.getBoundingClientRect();
  const style = inputBoundingBox
    ? {
        top: inputBoundingBox.top + inputBoundingBox.height,
        left: inputBoundingBox.left,
        width: inputBoundingBox.width,
      }
    : {};

  if (!show) {
    return null;
  }

  return (
    <Portal mountTo="root-menu">
      <div ref={ref} style={style} className="async-search__options scrollbar">
        {showClearOption && (
          <div
            className="async-search__clear async-search__option"
            onClick={onClearSelectedOptions}
          >
            <FaTrash />
            Clear
          </div>
        )}
        {options.map((option) => (
          <SearchOptionType<T>
            key={`${option.id}-option`}
            option={option}
            disabled={option.disabled}
            onClick={onOptionClick}
            render={renderOption}
          />
        ))}
        {options.length === 0 && <div>No result</div>}
      </div>
    </Portal>
  );
}

export default AsyncSearchDropdown;
