
export interface SearchInputProps {
  debouceTimeout?: number;
  search: (searchString: string) => void;
  result: any[];
  clickResult: (data: any) => void;
  clear: () => void;
}

export { default } from "./SearchInput";