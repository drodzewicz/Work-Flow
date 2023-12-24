import { useEffect, useRef } from "react";

function useDidUpdateEffect(fn: () => void, inputs: Array<unknown>) {
  const isMountingRef = useRef(false);

  useEffect(() => {
    isMountingRef.current = true;
  }, []);

  useEffect(() => {
    if (!isMountingRef.current) {
      return fn();
    } else {
      isMountingRef.current = false;
    }
  }, inputs);
}

export { useDidUpdateEffect };

export default useDidUpdateEffect;
