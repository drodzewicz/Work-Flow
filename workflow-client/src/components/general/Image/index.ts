export { default } from "./Image";

export interface ImageProps extends React.ComponentProps<"img"> {
  fallbackImage?: string
}