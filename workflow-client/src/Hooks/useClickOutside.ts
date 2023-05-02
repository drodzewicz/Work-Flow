import React, { useEffect } from "react";

const useClickOutside = (ref: React.RefObject<HTMLElement>, cb?: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !(ref.current! as any).contains(event.target)) {
        cb?.();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, cb]);
};

export { useClickOutside };
