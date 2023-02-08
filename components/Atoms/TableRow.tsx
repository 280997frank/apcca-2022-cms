import React from "react";
import { Td, Tr, IconButton, useToast } from "@chakra-ui/react";
import { IoMdTrash } from "react-icons/io";

import TableCell from "@/components/Atoms/TableCell";

import type { PossibleCellType } from "@/components/Atoms/TableCell";

interface TableRowProps {
  rowIndex: number;
  columnHeaders: { name: string; label: string; type?: PossibleCellType }[];
  data: Map<string, any>;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: string, rowId?: string) => Promise<void>;
  onRemove: (value: string) => Promise<void>;
  useNumber: boolean;
  rowId?: string;
}

export default function TableRow({
  rowIndex,
  columnHeaders,
  data,
  dropdownOptions,
  onDropdownChange,
  onSwitchChange,
  onRemove,
  useNumber,
  rowId = "",
}: TableRowProps) {
  const toast = useToast();

  return (
    <Tr _hover={{ bgColor: "rgba(220, 220, 220, 0.5)" }} fontSize="xl">
      {useNumber && <Td>{`${rowIndex + 1}`.padStart(2, "0")}</Td>}
      {columnHeaders.map(({ name, /* label, */ type }) => {
        /* if (columnsRender?.[name]) {
              const props = {
                name,
                label,
                ...row,
              };

              return (
                <Td key={name}>{createElement(columnsRender[name], props)}</Td>
              );
            } */
        // return cellData(currentRow.get(name), index, type);
        return (
          <TableCell
            key={name}
            value={data.get(name)}
            type={type}
            dropdownOptions={dropdownOptions}
            onDropdownChange={onDropdownChange}
            onSwitchChange={onSwitchChange}
            rowId={rowId}
          />
        );
      })}
      <Td>
        <IconButton
          aria-label="Remove item"
          icon={<IoMdTrash />}
          variant="ghost"
          bgColor="transparent"
          size="sm"
          type="button"
          fontSize="1.4rem"
          onClick={async () => {
            try {
              await onRemove(data.get("id"));
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: error.message,
                  position: "bottom",
                  isClosable: true,
                  status: "error",
                });
              }
            }
          }}
        />
      </Td>
    </Tr>
  );
}
