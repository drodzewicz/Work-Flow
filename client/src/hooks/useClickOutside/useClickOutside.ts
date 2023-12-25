import React, { useEffect } from "react";

const useClickOutside = (refs: React.RefObject<HTMLElement>[], cb?: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        refs.length > 0 &&
        !refs.some((ref) => ref.current && (ref.current! as any).contains(event.target))
      ) {
        cb?.();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cb]);
};

export default useClickOutside;
