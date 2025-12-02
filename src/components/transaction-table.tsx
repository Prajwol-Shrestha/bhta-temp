import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import type { Transaction } from "@/types/types";

interface TransactionTableProps {
  transactions: Transaction[];
}

const ITEMS_PER_PAGE = 10;


export function TransactionTable({ transactions }: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  const paginationData = useMemo(() => {
    const totalPages = Math.ceil(sortedTransactions.length / ITEMS_PER_PAGE);
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const paginatedTransactions = sortedTransactions.slice(startIdx, endIdx);

    return { paginatedTransactions, totalPages, currentPage };
  }, [sortedTransactions, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(
      1,
      paginationData.currentPage - Math.floor(maxPagesToShow / 2)
    );
    let endPage = Math.min(
      paginationData.totalPages,
      startPage + maxPagesToShow - 1
    );

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return { pages, startPage, endPage };
  };

  const { pages, startPage, endPage } = getPageNumbers();

  return (
    <div className="space-y-4">
      <Card className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-b border-border hover:bg-transparent">
                <TableHead className="font-semibold text-foreground">
                  Description
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Type
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Category
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginationData.paginatedTransactions.length > 0 ? (
                paginationData.paginatedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-muted/30 border-border transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {transaction.description}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${
                          transaction.type === "income"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          transaction.type === "income"
                            ? "badge-income"
                            : "badge-expense"
                        }
                      >
                        {transaction.type.charAt(0).toUpperCase() +
                          transaction.type.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {transaction.category}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {transaction.date}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="p-12 text-center">
                    <p className="text-muted-foreground">
                      No transactions found
                    </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Shadcn Pagination */}
      {paginationData.totalPages > 1 && (
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() =>
                    handlePageChange(
                      Math.max(1, paginationData.currentPage - 1)
                    )
                  }
                  className={
                    paginationData.currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {startPage > 1 && (
                <>
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>
                      1
                    </PaginationLink>
                  </PaginationItem>
                  {startPage > 2 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                </>
              )}

              {pages.map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => handlePageChange(page)}
                    isActive={page === paginationData.currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              {endPage < paginationData.totalPages && (
                <>
                  {endPage < paginationData.totalPages - 1 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                  <PaginationItem>
                    <PaginationLink
                      onClick={() =>
                        handlePageChange(paginationData.totalPages)
                      }
                    >
                      {paginationData.totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(
                      Math.min(
                        paginationData.totalPages,
                        paginationData.currentPage + 1
                      )
                    )
                  }
                  className={
                    paginationData.currentPage === paginationData.totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Info Text */}
      <div className="text-center text-sm text-muted-foreground">
        Showing{" "}
        {paginationData.paginatedTransactions.length > 0
          ? (paginationData.currentPage - 1) * ITEMS_PER_PAGE + 1
          : 0}{" "}
        -{" "}
        {Math.min(
          paginationData.currentPage * ITEMS_PER_PAGE,
          sortedTransactions.length
        )}{" "}
        of {sortedTransactions.length} transactions
      </div>
    </div>
  );
}
