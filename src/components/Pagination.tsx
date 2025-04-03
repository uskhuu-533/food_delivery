import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number | undefined;
  setPage: (page: number) => void;
  page: number;
};
export function PaginationComponent({ totalPages, setPage, page }: Props) {
  const pages = Array.from(Array(totalPages).keys());
  if (!page || !totalPages) return null;
  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem >
            <PaginationPrevious onClick={() => setPage(page - 1)} />
          </PaginationItem>
        )}
        {page > 2 && (
          <PaginationItem >
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink className="cursor-pointer"
              isActive={p + 1 == page}
              onClick={() => setPage(p + 1)}
            >
              {p + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages > page + 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {totalPages > page && (
          <PaginationItem >
            <PaginationNext onClick={() => setPage(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
