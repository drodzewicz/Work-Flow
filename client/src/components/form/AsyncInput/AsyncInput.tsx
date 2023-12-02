import React, { forwardRef, useCallback, useState } from "react";

import { debounce } from "lodash";

import "./AsyncInput.scss";
import useDidUpdateEffect from "@/hooks/useDidUpdateEffect";

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
      value,
      readOnly,
      disabled,
      onChange,
      debounceCallback,
      onClick,
      children,
      placeholder = "Search",
      className = "",
    } = props;

    const [inputValue, setInputValue] = useState<string>(value || "");
    const [isInputting, setIsInputing] = useState<boolean>(false);

    const debounceonChange = useCallback(
      debounce((searchTerm: string) => {
        debounceCallback?.(searchTerm);
        setIsInputing(false);
      }, debounceTime),
      [],
    );

    useDidUpdateEffect(() => {
      if (inputValue && debounceTime > 0) {
        if (!isInputting) {
          setIsInputing(true);
        }
        debounceonChange(inputValue);
      }
      if (!inputValue) {
        debounceCallback?.(inputValue);
      }
    }, [inputValue]);

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const targetValue = e.currentTarget.value;
      onChange?.(targetValue);
      setInputValue(targetValue);
    };

    return (
      <div data-testid="async-input" className={`async-input ${className}`}>
        <input
          ref={ref}
          readOnly={readOnly}
          disabled={disabled}
          value={inputValue}
          className="async-input__input"
          placeholder={placeholder}
          onChange={onInputChange}
          onClick={onClick}
        />
        <div className="async-input__button-group">
          {(isInputting || isLoading) && (
            <span data-testid="async-input-loading" className="async-input__loading-container">
              <span className="async-input__loading" />
            </span>
          )}
          {children}
        </div>
      </div>
    );
  },
);

export default AsyncInput;
