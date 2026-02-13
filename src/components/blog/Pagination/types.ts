export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  preserveParams?: { sort?: string; q?: string };
};
export type PageItem = number | "dots";
