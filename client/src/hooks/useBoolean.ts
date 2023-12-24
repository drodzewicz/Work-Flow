import { useDebugValue, useState } from "react";

const useBoolean = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  useDebugValue(state, (state) => state);

  const toggleState = () => setState((prevState) => !prevState);
  const setTrue = () => setState(true);
  const setFalse = () => setState(false);

  return { state, setState, toggleState, setTrue, setFalse };
};

export { useBoolean };

export default useBoolean;
