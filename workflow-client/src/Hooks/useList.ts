import { useState } from "react";

import _ from "lodash";

function useList<T>(intialData?: T[]) {
  const [data, setData] = useState<T[]>(intialData ?? []);

  const addItem = (item: T) => {
    setData((previousState) => [...previousState, item]);
  };

  const filterItem = (condition: (item: T) => boolean) => {
    setData((previousState) => previousState.filter(condition));
  };

  const removeItem = (item: T, path: string) => {
    setData((previousState) => previousState.filter((it) => _.get(it, path) !== _.get(item, path)));
  };

  const clear = () => {
    setData([]);
  };

  return { data, setData, addItem, filterItem, removeItem, clear };
}

export default useList;
