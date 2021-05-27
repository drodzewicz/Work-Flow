export { default } from "./TagButton";


export interface TagButtonProps extends React.ComponentProps<"button">{
  showIcon: boolean;
  color: string;
  name: string;
  selected: boolean;
}