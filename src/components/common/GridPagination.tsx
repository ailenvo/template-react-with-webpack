import React from "react";
import { TablePagination } from "@mui/material";

type Props = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newPageSize: number) => void;
  rowsPerPageOptions?:
    | (
        | number
        | {
            value: number;
            label: string;
          }
      )[]
    | undefined;
};

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPageOptions,
}: Props) {
  const handlePageChange = (event: any, newPage: any) => {
    onPageChange(newPage + 1);
  };

  const handleLimitChange = (event: any) => {
    onRowsPerPageChange(event.target.value);
  };

  return (
    <TablePagination
      component="div"
      count={total}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleLimitChange}
      page={page < 1 ? 0 : page - 1}
      rowsPerPage={pageSize}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}
