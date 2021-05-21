export { default } from "./Backdrop";

export interface BackdropProps {
    show: boolean,
    clicked?: () => void,
    opacity?: number
}