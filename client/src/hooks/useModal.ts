import { useDebugValue, useState } from "react";

const useModal = (initialStale = false) => {
  const [show, setShow] = useState<boolean>(initialStale);

  useDebugValue(() => (show ? "Open" : "Closed"));

  const toggle = () => setShow((prevState) => !prevState);
  const close = () => setShow(false);
  const open = () => setShow(true);

  return { show, toggle, close, open };
};

export default useModal;
