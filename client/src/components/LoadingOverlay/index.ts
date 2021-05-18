import LoadingOverlay from "./LoadingOverlay"

export interface LoadingOverlayProps {
    show?: boolean;
    opacity?: number;
    classes?: string[];
	color?: { light: string, dark: string },
}

export default LoadingOverlay;