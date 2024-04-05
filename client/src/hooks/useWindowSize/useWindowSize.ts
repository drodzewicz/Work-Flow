import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function setWindowSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        // initial call of the function to set window size
        setWindowSize();
        // add function to event listener
        window.addEventListener("resize", setWindowSize);
        return () => window.removeEventListener("resize", setWindowSize);
    }, []);
    return size;
};

export default useWindowSize;
