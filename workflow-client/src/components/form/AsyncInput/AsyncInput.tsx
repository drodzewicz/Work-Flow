import React, { forwardRef, useCallback, useEffect, useState } from "react";

import { debounce } from "lodash";

import "./AsyncInput.scss";

export type AsyncInputProps = {
  debounceTime?: number;
  isLoading?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  debounceCallback?: (searchTerm: string) => void;
  onChange?: (searchTerm: string) => void;
  onClick?: () => void;
  className?: string;
};

const AsyncInput = forwardRef<HTMLInputElement, React.PropsWithChildren<AsyncInputProps>>(
  (props, ref) => {
    const {
      debounceTime = 1000,
      isLoading,
      placeholder = "Search",
      value = "",
      readOnly,
      disabled,
      onChange,
      debounceCallback,
      onClick,
      children,
      className = "",
    } = props;

    const [isInputting, setIsInputing] = useState<boolean>(false);

    const debounceonChange = useCallback(
      debounce((searchTerm: string) => {
        debounceCallback?.(searchTerm);
        setIsInputing(false);
      }, debounceTime),
      []
    );

    useEffect(() => {
      if (value && debounceTime > 0) {
        if (!isInputting) {
          setIsInputing(true);
        }
        debounceonChange(value);
      }
      if (!value) {
        debounceCallback?.(value);
      }
    }, [value]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.currentTarget.value);
    };

    return (
      <div className={`async-input ${className}`}>
        <input
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          value={value}
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
