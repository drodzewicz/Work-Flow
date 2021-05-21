export { default } from "./Button";

type buttonVariantType = "standard" | "glow";

export interface ButtonProps extends React.ComponentProps<"button"> {
    variant?: buttonVariantType
}