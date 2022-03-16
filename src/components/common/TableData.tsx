import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { BasePagingRes } from "../../models/common/models.type";
import GridPagination from "./GridPagination";
import { OrderDirection } from "../../models/common/models.enum";
import { ArrowDropDown, ArrowDropUp, FilterAlt } from "@mui/icons-material";
import Themes from "../../assets/themes/_index";

export interface ITableHeader<T> {
  field?: keyof T;
  title?: React.ReactNode;
  hangleItem?: (item: T) => React.ReactNode;
  isHide?: boolean;
  align?: "left" | "right" | "center";
  notFilter?: boolean;
}

export interface ITableData<T> {
  data: BasePagingRes<T>;
  headersTable: ITableHeader<T>[];
  handleChangeSearchParams: (
    field: "pageSize" | "page",
    value: string | Date | number
  ) => void;
  handleChangeSelectItems?: (value: number[]) => void;
  sortNames?: string[];
  sortDirections?: OrderDirection[];
  handleSort?: (sortNames: string[], sortDirections: OrderDirection[]) => void;
  minWidth?: number | string;
  single?: boolean;
  footer?: boolean;
}

export const TableData = (props: ITableData<any>) => {
  const classes = Themes.Styles.Components.Table.useStyles();
  const {
    data,
    headersTable,
    handleChangeSearchParams,
    handleChangeSelectItems,
    sortNames,
    sortDirections,
    handleSort,
    minWidth = 1050,
    single = false,
    footer = true,
  } = props;
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const renderIcon = (field: string) => {
    let icon = <FilterAlt className={classes.icon} />;

    const index = sortNames?.findIndex((item) => item === field) ?? -1;

    if (index > -1) {
      const sortType = sortDirections ? sortDirections[index] : null;

      if (sortType === OrderDirection.ASC) {
        icon = <ArrowDropUp className={classes.icon} />;
      }
      if (sortType === OrderDirection.DESC) {
        icon = <ArrowDropDown className={classes.icon} />;
      }
    }

    return icon;
  };

  const handleSortTable = (field: string) => {
    const index = sortNames?.findIndex((item) => item === field) ?? -1;

    let newSortNames: string[] = sortNames ?? [];
    let newSortDirections: OrderDirection[] = sortDirections ?? [];

    if (index > -1) {
      const sortType = newSortDirections[index];

      if (sortType === OrderDirection.DESC) {
        newSortDirections[index] = OrderDirection.ASC;
      }

      if (sortType === OrderDirection.ASC) {
        newSortNames = newSortNames.filter((_, i) => i !== index);
        newSortDirections = newSortDirections.filter((_, i) => i !== index);
      }
    } else {
      newSortNames.push(field);
      newSortDirections.push(OrderDirection.DESC);
    }

    handleSort && handleSort(newSortNames, newSortDirections);
  };

  const handleSelectAll = (event: any) => {
    let newSelectedItems: number[] = [];

    if (event.target.checked) {
      newSelectedItems = data.items.map((customer: any) => customer.id);
    } else {
      newSelectedItems = [];
    }

    setSelectedItems(newSelectedItems);
    handleChangeSelectItems && handleChangeSelectItems(newSelectedItems);
  };

  const handleSelectOne = (event: any, id: number) => {
    const selectedIndex = selectedItems.indexOf(id);
    let newSelectedItems: number[] = [];

    if (selectedIndex === -1) {
      newSelectedItems = newSelectedItems.concat(selectedItems, id);
    } else if (selectedIndex === 0) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(1));
    } else if (selectedIndex === selectedItems.length - 1) {
      newSelectedItems = newSelectedItems.concat(selectedItems.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedItems = newSelectedItems.concat(
        selectedItems.slice(0, selectedIndex),
        selectedItems.slice(selectedIndex + 1)
      );
    }

    setSelectedItems(newSelectedItems);
    handleChangeSelectItems && handleChangeSelectItems(newSelectedItems);
  };
  const handleLimitChange = (newPageSize: number) => {
    handleChangeSearchParams("pageSize", newPageSize);
  };
  const handlePageChange = (newPage: number) => {
    handleChangeSearchParams("page", newPage);
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: minWidth }}>
          <Table>
            <TableHead>
              <TableRow>
                {!single && (
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedItems.length === data.items.length}
                      color="primary"
                      indeterminate={
                        selectedItems.length > 0 &&
                        selectedItems.length < data.items.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                )}

                {headersTable.map((item, key) => {
                  if (item.isHide) {
                    return <TableCell key={key}></TableCell>;
                  } else {
                    return (
                      <TableCell style={{ textAlign: item.align }} key={key}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          {item.title}{" "}
                          {!item.notFilter && handleSort && (
                            <div
                              className={classes.wrapperFilterIcon}
                              onClick={() =>
                                handleSortTable(item.field as string)
                              }
                            >
                              {renderIcon(item.field as string)}
                            </div>
                          )}
                        </div>
                      </TableCell>
                    );
                  }
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.items.length > 0 &&
                data.items.map((item) => (
                  <TableRow
                    hover
                    key={item.id}
                    selected={selectedItems.indexOf(item.id) !== -1}
                  >
                    {!single && (
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedItems.indexOf(item.id) !== -1}
                          onChange={(event) => handleSelectOne(event, item.id)}
                          value="true"
                        />
                      </TableCell>
                    )}

                    {headersTable.map((field, key) => {
                      if (field.hangleItem) {
                        return (
                          <TableCell
                            key={key}
                            style={{ textAlign: field.align }}
                          >
                            {field.hangleItem(item)}
                          </TableCell>
                        );
                      } else {
                        return (
                          <TableCell
                            style={{ textAlign: field.align }}
                            key={key}
                          >
                            {field.field ? item[field.field] : null}
                          </TableCell>
                        );
                      }
                    })}
                  </TableRow>
                ))}
              {/* rgb(244, 246, 248) */}
              {data.items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={headersTable.length + (!single ? 1 : 0)}>
                    <Box className={classes.boxEmpty}>
                      <Typography variant="body2" className={classes.textEmpty}>
                        Dữ liệu trống
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {footer && (
        <GridPagination
          total={data.total}
          page={data.page}
          pageSize={data.pageSize}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      )}
    </Card>
  );
};
