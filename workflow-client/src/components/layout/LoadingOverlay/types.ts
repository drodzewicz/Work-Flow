export interface LoadingOverlayProps {
  show?: boolean;
  opacity?: number;
  className?: string;
  color?: { light: string; dark: string } | undefined;
  children?: React.ReactNode;
}
