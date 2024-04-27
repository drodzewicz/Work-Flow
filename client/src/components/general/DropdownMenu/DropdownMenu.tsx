import React, { PropsWithChildren, useEffect, useRef, useState, useImperativeHandle } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import useWindowSize from "@/hooks/useWindowSize";

import Portal from "@/components/layout/Portal";

import "./DropdownMenu.scss";

export interface DropdownMenuProps {
    offset?: {
        x: number;
        y: number;
    };
    onClickClose?: boolean;
    dropdownMaxHeight?: number;
    anchorRef: React.MutableRefObject<HTMLElement | null>;
    className?: string;
}

const DropdownMenu = React.forwardRef<HTMLUListElement | null, PropsWithChildren<DropdownMenuProps>>(
    (props, ref) => {
        const {
            children,
            anchorRef,
            dropdownMaxHeight,
            offset = { x: 0, y: 0 },
            onClickClose = true,
            className = "",
        } = props;

        const [width] = useWindowSize();
        const [cords, setCords] = useState<{ left: number; top: number }>({ left: 0, top: 0 });
        const [show, setShow] = useState<boolean>(false);
        const offsetRef = useRef(offset);
        const dropDownMenuRef = useRef<HTMLUListElement | null>(null);

        useImperativeHandle(ref, () => dropDownMenuRef.current!);

        const closeMenuClickHandler = () => {
            setShow(false);
        };
        
        useClickOutside([dropDownMenuRef, anchorRef], closeMenuClickHandler);

        useEffect(() => {
            const toggleMenu = () => {
                const rect = anchorRef.current?.getBoundingClientRect?.();
                if (rect) {
                    setCords({
                        left: rect.x + rect.width + offsetRef.current.x,
                        top: rect.y + window.scrollY + offsetRef.current.y,
                    });
                }
                setShow((state) => !state);
            };

            anchorRef.current?.addEventListener("click", toggleMenu);

            setShow(false);
            return () => {
                anchorRef.current?.removeEventListener("click", toggleMenu);
            };
        }, [width, anchorRef]);

        if (show) {
            return (
                <Portal mountTo="root-menu">
                    <ul
                        ref={ref}
                        aria-label="dropdown"
                        style={{ top: cords.top, left: cords.left, maxHeight: dropdownMaxHeight }}
                        onClick={onClickClose ? closeMenuClickHandler : undefined}
                        className={`drop-down-menu scrollbar ${className}`}
                    >
                        {children}
                    </ul>
                </Portal>
            );
        } else {
            return null;
        }
    }
);

export default DropdownMenu;
