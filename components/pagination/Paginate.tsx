import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Table } from "@tanstack/react-table";
interface PaginateProps<TData> {
  table: Table<TData>;
}
export function Paginate<TData>({table}:PaginateProps<TData>) {
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();
  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < pageCount; i++) {
      if (
        i === 0 || // Toujours afficher la première
        i === pageCount - 1 || // Toujours afficher la dernière
        (i >= pageIndex - 1 && i <= pageIndex + 1) // Afficher autour de l'index actuel
      ) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => table.setPageIndex(i)}
              isActive={pageIndex === i}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (i === pageIndex - 2 || i === pageIndex + 2) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return pages;
  };
  return (
    <Pagination>
      <PaginationContent>
        {/* Bouton Précédent */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => table.previousPage()}
            aria-disabled={!table.getCanPreviousPage()}
            className={!table.getCanPreviousPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>

        {/* Chiffres de page dynamiques */}
        {renderPageNumbers()}

        {/* Bouton Suivant */}
        <PaginationItem>
          <PaginationNext
            onClick={() => table.nextPage()}
            aria-disabled={!table.getCanNextPage()}
            className={!table.getCanNextPage() ? "pointer-events-none opacity-50" : "cursor-pointer"}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
