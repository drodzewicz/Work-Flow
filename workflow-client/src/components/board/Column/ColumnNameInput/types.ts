export interface ColumnNameInputProps {
  initialVal: string;
  onEnter: (newTitle: string) => void;
  hideInput: () => void;
  editTitle: boolean;
}
