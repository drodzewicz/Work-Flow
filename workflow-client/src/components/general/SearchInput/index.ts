
export interface SearchInputProps {
  debounceTimeout?: number;
  search: (searchString: string) => void;
  result: SearchResultI[];
  clickResult: (data: any) => void;
  clear: () => void;
}

export interface SearchResultProps {
  onClick: (data?: any) => void;
  data: any;
}

export interface SearchResultI {
  text: string;
  _id: string;
}

export { default } from "./SearchInput";