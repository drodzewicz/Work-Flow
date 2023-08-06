export interface IModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  size: "s" | "m" | "l";
}
