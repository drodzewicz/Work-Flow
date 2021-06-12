import LoadingOverlay from "./LoadingOverlay"

export interface LoadingOverlayProps {
  show?: boolean;
  opacity?: number;
  className?: string;
  color?: { light: string; dark: string };
}

export default LoadingOverlay;