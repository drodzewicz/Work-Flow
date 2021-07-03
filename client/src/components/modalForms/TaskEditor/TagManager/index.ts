export { default } from "./TagManager";

export interface TagManagerProps {
  tags: any[];
  selectTagHandler: (id: string) => void;
}