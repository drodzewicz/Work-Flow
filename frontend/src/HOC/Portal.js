import { createPortal } from "react-dom";

const Portal = ({ children, mountTo }) => {
	const mount = document.getElementById(mountTo);

	return createPortal(children, mount);
};

export default Portal;
