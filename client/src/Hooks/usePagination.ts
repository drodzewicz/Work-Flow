import { useState, useEffect } from "react";

interface IusePagination<T> {
  initialPage: number;
  limit: number;
  initialTotal?: number;
  onPageChangeCallback?: (
    currentPage: number,
    limit: number
  ) => { items: T[]; totalPageCount: number } | Promise<{ items: T[]; totalPageCount: number }>;
}

const usePagination = <T>({
  initialPage,
  limit,
  initialTotal = 1,
  onPageChangeCallback,
}: IusePagination<T>) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(initialTotal);
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    if (onPageChangeCallback) {
      const tetstt = async () => {
        const res = await onPageChangeCallback(currentPage, limit);
        setTotalPages(res.totalPageCount);
        setItems(res.items);
      };
      tetstt();
    }

    return () => {};
  }, [currentPage]);

  return { currentPage, totalPages, limit, setCurrentPage, setTotalPages, items, setItems };
};

export { usePagination };
