import React, { useCallback, useState } from "react";

import { debounce } from "lodash";

import "./AsyncInput.scss";

type AsyncInputProps = {
  debounceTime?: number;
  isLoading?: boolean;
  placeholder?: string;
  onChange?: (searchTerm: string) => void;
};

const AsyncInput: React.FC<AsyncInputProps> = ({
  debounceTime = 1000,
  onChange,
  isLoading,
  placeholder = "Search",
}) => {
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
      <input className="async-input__input" placeholder={placeholder} onChange={onInputChange} />
      {(isInputting || isLoading) && <span className="async-input__loading"></span>}
    </div>
  );
};

export default AsyncInput;
