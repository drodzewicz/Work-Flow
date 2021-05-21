export { default } from "./Tooltip";

export interface TooltipPorps {
    className?: string,
	anchorEl: any,
    offset?: { x: number, y: number },
    debounceTimeout?: number
}