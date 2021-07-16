export { default } from "./TagManager";
import { TagI } from "types/general"

export interface TagManagerProps {
  tags: any[];
  selectTagHandler: (tag: TagI) => void;
}