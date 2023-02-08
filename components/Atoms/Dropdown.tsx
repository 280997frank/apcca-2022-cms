import React from "react";
import { Select, useToast } from "@chakra-ui/react";

interface DropdownProps {
  data: {
    label: string;
    value: string;
  }[];
  onChange?: (value: string, rowId?: string) => Promise<void>;
  initialValue?: string;
  placeholder?: string;
  rowId?: string;
  bgColor?: string;
  color?: string;
  withBorder?: boolean;
}

export default function Dropdown({
  data,
  onChange,
  initialValue,
  placeholder = "",
  rowId,
  bgColor,
  color = "#000",
  withBorder = false,
}: DropdownProps) {
  const toast = useToast();

  return (
    <Select
      variant="filled"
      placeholder={placeholder}
      defaultValue={initialValue}
      fontSize="xl"
      minWidth="135px"
      color={color}
      style={withBorder ? { border: "1px solid #000" } : {}}
      background={bgColor}
      colorScheme={bgColor}
      onChange={async (e) => {
        try {
          await onChange?.(e.target.value, rowId);
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
      sx={{
        "& > option": {
          color: "black",
        },
      }}
    >
      {data.map(({ label, value }) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </Select>
  );
}
