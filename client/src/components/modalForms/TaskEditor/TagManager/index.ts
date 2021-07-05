export { default } from "./TagManager";
import { TagI } from "types"

export interface TagManagerProps {
  tags: any[];
  selectTagHandler: (tag: TagI) => void;
}