import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import React, { ReactNode } from "react";
import { SortDescriptor } from "@react-types/shared/src/collections";

type Props = {
  columns: any[];
  items: any[];
  page?: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  sortDescriptor?: SortDescriptor;
  onSortChange?: (descriptor: SortDescriptor) => void;
  renderCell: ({
    item,
    columnKey,
  }: {
    item: any;
    columnKey: string | number;
  }) => ReactNode;
  isLoading?: boolean;
};

export const TableWrapper: React.FC<Props> = ({
  items,
  page,
  totalPages,
  onPageChange,
  columns,
  sortDescriptor,
  onSortChange,
  renderCell,
  isLoading,
}) => {
  return (
    <div className=" w-full flex flex-col gap-4">
      <Table
        aria-label="Example table with custom cells"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              classNames={{
                item: "bg - transparent",
                cursor: "bg-[#14497A]",
              }}
              isCompact
              showControls
              showShadow
              page={page}
              total={totalPages}
              onChange={onPageChange}
            />
          </div>
        }
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
      >
        <TableHeader columns={columns}>
          {(column: any) => (
            <TableColumn
              key={column.uid}
              allowsSorting={true}
              hideHeader={column.uid === "actions"}
              align={column.uid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          isLoading={isLoading}
          loadingContent={<Spinner />}
        >
          {(item: any) => (
            <TableRow>
              {(columnKey) => (
                <TableCell>{renderCell({ item, columnKey })}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
