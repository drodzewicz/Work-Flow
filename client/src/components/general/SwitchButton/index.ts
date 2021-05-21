export { default } from "./SwitchButton";


export interface SwitchButtonProps {
    toggle: () => void;
    value: boolean;
}