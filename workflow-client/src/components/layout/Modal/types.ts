import { ModalSizeType } from "@/context/ModalContext";

export interface IModalProps {
  show: boolean;
  title: string;
  onClose: () => void;
  size: ModalSizeType;
}
