import { useEffect, useRef } from "react";

type DemoPopupType = {
    onOpen?: () => void;
    onClose?: () => void;
    timeout?: number;
    autoPopup?: boolean;
};

const useDemoPopup = ({ onOpen, onClose, timeout = 3000, autoPopup = false }: DemoPopupType) => {
    const LS_POPUP_STATE_KEY = "demo-popup";
    const timeoutRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const isDemoPopUpDisabled = localStorage.getItem(LS_POPUP_STATE_KEY);
        if (autoPopup && !isDemoPopUpDisabled && onOpen) {
            timeoutRef.current = setTimeout(onOpen, timeout);
        }
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const closePopup = () => {
        localStorage.setItem(LS_POPUP_STATE_KEY, "false");
        onClose?.();
    };

    return { closePopup };
};

export default useDemoPopup;
