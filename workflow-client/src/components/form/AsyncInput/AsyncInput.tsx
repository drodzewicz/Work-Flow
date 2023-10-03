import React, { forwardRef, useCallback, useState } from "react";

import { debounce } from "lodash";

import "./AsyncInput.scss";

export type AsyncInputProps = {
  debounceTime?: number;
  isLoading?: boolean;
  placeholder?: string;
  onChange?: (searchTerm: string) => void;
  onClick?: () => void;
};

const AsyncInput = forwardRef<HTMLInputElement, React.PropsWithChildren<AsyncInputProps>>(
  (props, ref) => {
    const {
      debounceTime = 1000,
      isLoading,
      placeholder = "Search",
      onChange,
      onClick,
      children,
    } = props;

    const [isInputting, setIsInputing] = useState<boolean>(false);

    const debounceonChange = useCallback(
      debounce((searchTerm: string) => {
        onChange?.(searchTerm);
        setIsInputing(false);
      }, debounceTime),
      []
    );

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isInputting) {
        setIsInputing(true);
      }
      debounceonChange(e.currentTarget.value);
    };

    return (
      <div className="async-input">
        <input
          ref={ref}
          className="async-input__input"
          placeholder={placeholder}
          onChange={onInputChange}
          onClick={onClick}
        />
        <div className="async-input__button-group">
          {(isInputting || isLoading) && (
            <span className="async-input__loading-container">
              <span className="async-input__loading" />
            </span>
          )}
          {children}
        </div>
      </div>
    );
  }
);

export default AsyncInput;
