import React, {
  /* createElement, */
  useCallback,
  FC,
} from "react";
import {
  Box,
  Flex,
  Spinner,
  Table as ChakraTable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  TableCaption,
} from "@chakra-ui/react";

import TableRow from "@/components/Atoms/TableRow";
import DebouncedSearch from "@/components/Atoms/DebouncedSearch";
import AddNewButton from "@/components/Atoms/AddNewButton";

import type { PossibleCellType } from "@/components/Atoms/TableCell";
import Dropdown from "../Atoms/Dropdown";

interface TableProps<TableData> {
  caption?: string;
  columnHeaders: { name: string; label: string; type?: PossibleCellType }[];
  data: TableData[];
  loading: boolean;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onRemove: (value: string) => Promise<void>;
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: string, rowId?: string) => Promise<void>;
  search?: (str: string) => Promise<void>;
  filterChange?: (str: string) => Promise<void>;
  columnsRender?: {
    [name: string]: FC<
      {
        name: string;
        label: string;
      } & TableData
    >;
  };
  useNumber?: boolean;
  addNewButton?: {
    bgColor: string;
    url: string;
  };
}

const Table = <TableData,>({
  caption,
  data,
  columnHeaders,
  loading,
  dropdownOptions,
  onRemove,
  onDropdownChange,
  onSwitchChange,
  useNumber = false,
  search,
  addNewButton,
  filterChange,
}: // columnsRender = {},
TableProps<TableData>) => {
  const renderRow = useCallback(() => {
    return data.map((row, rowIndex) => {
      const currentRow = new Map(Object.entries(row));
      return (
        <TableRow
          key={currentRow.get("id")}
          useNumber={useNumber}
          rowIndex={rowIndex}
          columnHeaders={columnHeaders}
          data={currentRow}
          dropdownOptions={dropdownOptions}
          onDropdownChange={onDropdownChange}
          onSwitchChange={onSwitchChange}
          onRemove={onRemove}
          rowId={currentRow.get("id")}
        />
      );
    });
  }, [
    columnHeaders,
    data,
    dropdownOptions,
    onDropdownChange,
    onRemove,
    onSwitchChange,
    useNumber,
  ]);

  return (
    <ChakraTable color="#4D4D4D" border="1px solid #D7D7D7" variant="unstyled">
      <TableCaption
        fontSize="2xl"
        fontWeight="bold"
        textAlign="left"
        px={0}
        color="inherit"
        sx={{ captionSide: "top" }}
      >
        <Flex justifyContent="space-between">
          {caption && <Box>{caption}</Box>}
          {search && <DebouncedSearch search={search} />}
          {filterChange && (
            <Box width="15%">
              <Dropdown
                bgColor="#FFDD00"
                initialValue="UPDATED_AT_DESC"
                onChange={(val) => filterChange(val)}
                data={[
                  { value: "TITLE_ASC", label: "TITLE ASC" },
                  { value: "TITLE_DESC", label: "TITLE DESC" },
                  { value: "UPDATED_AT_ASC", label: "OLDEST" },
                  { value: "UPDATED_AT_DESC", label: "LATEST" },
                ]}
              />
            </Box>
          )}
          {addNewButton && <AddNewButton {...addNewButton} />}
        </Flex>
      </TableCaption>
      <Thead>
        <Tr borderBottom="1px solid #D7D7D7">
          {useNumber && (
            <Th fontSize="md" color="inherit">
              NO.
            </Th>
          )}
          {columnHeaders.map(({ name, label }) => {
            return (
              <Th key={name} fontSize="md" color="inherit">
                {label}
              </Th>
            );
          })}
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody position="relative">
        {loading && (
          <Tr>
            <Td colSpan={columnHeaders.length}>
              <Flex align="center" justify="center" width="100%" minH="30vh">
                <Spinner />
              </Flex>
            </Td>
          </Tr>
        )}
        {!loading && data?.length > 0 && renderRow()}
        {!loading && data?.length === 0 && (
          <Tr>
            <Td colSpan={columnHeaders.length}>
              <Flex align="center" justify="center" width="100%" minH="10vh">
                No matching records found
              </Flex>
            </Td>
          </Tr>
        )}
      </Tbody>
    </ChakraTable>
  );
};
export default Table;
