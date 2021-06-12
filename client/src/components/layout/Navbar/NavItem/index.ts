export { default } from "./NavItem";

export interface NavItemProps {
  icon?: any;
  label?: string;
  name?: string;
  onClick?: () => void;
  className?: string;
  offset?: { x: number; y: number };
  dropDownOnClickClose?: boolean;
  dropDownScrollableAt?: number;
}