import React, { useEffect } from "react";

const useClickOutside = (
  ref: React.RefObject<HTMLUListElement>,
  rootRef: React.RefObject<HTMLElement>,
  cb?: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current! as any).contains(event.target) &&
        !(rootRef.current! as any).contains(event.target)
      ) {
        cb?.();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, rootRef, cb]);
};

export { useClickOutside };
