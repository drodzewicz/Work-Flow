import React, { useCallback, useRef } from "react";

import { debounce } from "lodash";
import { SingleValue, ActionMeta } from "react-select";
import AsyncSelect from "react-select/async";

export interface DefaultOption {
  label: string;
  value: string;
}

type UserSelectProps<T, D extends DefaultOption> = {
  name?: string;
  loadData: (searchTerm: string) => Promise<T>;
  transformData: (data: T) => D[];
  onError?: (error: unknown) => void;
  onSuccess?: (data: D[]) => void;
  onSelect?: (data: D) => void;
  isOptionDisabled?: (option: D) => boolean;
  debounceTime?: number;
};

/**
 *
 * Generic Type:
 * T: Response Data Type
 * D: Transformed Data Option Type
 *
 */
function UserSelect<T, D extends DefaultOption>({
  name,
  onError,
  onSuccess,
  transformData,
  onSelect,
  loadData,
  isOptionDisabled,
  debounceTime = 1000,
}: UserSelectProps<T, D>) {
  const selectRef = useRef<any>(null);

  const loadOptions = useCallback(
    debounce((searchTerm: string, callback: (data: D[]) => void) => {
      loadData(searchTerm)
        .then((response) => {
          const data = transformData(response);
          callback(data);
          onSuccess?.(data);
        })
        .catch((error) => {
          onError?.(error);
        });
    }, debounceTime),
    []
  );

  const selectOptions = (data: SingleValue<D>, actions: ActionMeta<D>) => {
    if (actions.action === "select-option") {
      // console.log(selectRef.current)
      selectRef.current.setValue("");
      onSelect?.(data as D);
    }
  };

  return (
    <AsyncSelect
      ref={(refference) => (selectRef.current = refference)}
      name={name}
      onChange={selectOptions}
      loadOptions={loadOptions}
      isOptionDisabled={isOptionDisabled}
      noOptionsMessage={() => null}
      loadingMessage={() => null}
    />
  );
}

export default UserSelect;
