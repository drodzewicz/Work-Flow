export interface PaginationI {
  current: number;
  total: number;
}

export interface PaginationProps extends PaginationI {
  handleChange: (page: number) => void;
}
