type svgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export interface NavItemProps {
  Icon?: svgIcon;
  label?: string;
  name?: string;
  onClick?: () => void;
  className?: string;
  offset?: { x: number; y: number };
  dropDownOnClickClose?: boolean;
  dropDownScrollableAt?: number;
  children?: React.ReactNode;
}
