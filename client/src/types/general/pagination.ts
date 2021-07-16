export interface PaginatedItems<T> {
  totalPageCount: number;
  items: T[];
  next?: number;
  prev?: number;
}
