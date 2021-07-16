import { SvgIconComponent } from "@material-ui/icons"

type svgIcon = React.FunctionComponent<React.SVGProps<SVGSVGElement>>

export interface NavItemProps {
  Icon?: svgIcon | SvgIconComponent;
  label?: string;
  name?: string;
  onClick?: () => void;
  className?: string;
  offset?: { x: number; y: number };
  dropDownOnClickClose?: boolean;
  dropDownScrollableAt?: number;
}

export { default } from "./NavItem";
