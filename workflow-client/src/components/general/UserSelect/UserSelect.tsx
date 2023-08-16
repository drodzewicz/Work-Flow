import React, { useCallback, useState } from "react";

import { AxiosResponse } from "axios";
import { useField } from "formik";
import { debounce } from "lodash";
import { SingleValue, ActionMeta, MultiValue } from "react-select";
import AsyncSelect from "react-select/async";

type UserSelectProps = {
  name: string;
  loadData: (searchTerm: string) => Promise<AxiosResponse<unknown, any>>;
  transformData?: (data: AxiosResponse) => any;
  onError?: (error: any) => void;
  onSuccess?: (error: any) => void;
  onSelect?: (data: any) => void;
  debounceTime?: number;
  renderContainer?: (data: any, options: any) => React.ReactNode;
};

const UserSelect: React.FC<UserSelectProps> = ({
  name,
  onError,
  onSuccess,
  transformData,
  onSelect,
  loadData,
  renderContainer,
  debounceTime = 1000,
}) => {
  const [input, setInput] = useState({ label: "", value: "" });
  const [_field, state, { setValue, setTouched }] = useField(name);

  const loadOptions = useCallback(
    debounce((searchTerm: string, callback: (data: any) => void) => {
      loadData(searchTerm)
        .then((response) => {
          const data = transformData ? transformData(response) : response.data;
          callback(data);
          onSuccess?.(data);
        })
        .catch((error) => {
          onError?.(error);
        });
    }, debounceTime),
    []
  );

  const selectOptions = (
    data:
      | SingleValue<{ label: string; value: string }>
      | MultiValue<{ label: string; value: string }>,
    actions: ActionMeta<{ label: string; value: string }>
  ) => {
    if (actions.action === "select-option") {
      setTouched(true);
      const currentValue = state.value ?? [];
      setValue([...currentValue, data]);
      setInput({ label: "", value: "" });
      onSelect?.(data);
    }
  };

  const removeItem = (value: string) => {
    const newVlaues = state.value?.filter((it: any) => it.value !== value);
    setValue(newVlaues);
  };

  return (
    <div>
      <AsyncSelect name={name} onChange={selectOptions} loadOptions={loadOptions} value={input} />
      {renderContainer?.(state.value, { removeItem })}
    </div>
  );
};

export default UserSelect;
