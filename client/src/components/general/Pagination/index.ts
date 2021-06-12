export { default } from "./Pagination";


export interface PaginationProps {
  currentPage: number;
  amountOfPages: number;
  handleChange: (page: number) => void;
}