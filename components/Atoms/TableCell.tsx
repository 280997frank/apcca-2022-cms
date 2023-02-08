import React, { ReactNode, useEffect, useState } from "react";
import NextLink from "next/link";
import { Box, Icon, Td } from "@chakra-ui/react";
import dayjs from "dayjs";
import Switch from "@/components/Atoms/Switch";
import Dropdown from "@/components/Atoms/Dropdown";
import { isNil } from "lodash";

interface TableCellProps {
  value: string | number;
  dropdownOptions: {
    label: string;
    value: string;
  }[];
  onDropdownChange?: (value: string, rowId?: string) => Promise<void>;
  onSwitchChange?: (value: string, rowId?: string) => Promise<void>;
  type?: PossibleCellType;
  rowId?: string;
}

export type PossibleCellType =
  | "dropdown"
  | "switch"
  | "link"
  | "date"
  | "title"
  | "linkEdit"
  | "linkDetail";

export default function TableCell({
  value,
  type,
  dropdownOptions,
  onDropdownChange,
  onSwitchChange,
  rowId,
}: TableCellProps) {
  let data: string | number | ReactNode;
  let detaiPage = `${window.location.pathname}/${!isNil(rowId) ? rowId : ""}`;
  let customDetailPage = `${window.location.pathname}/detail/${
    !isNil(rowId) ? rowId : ""
  }`;
  let customEditPage = `${window.location.pathname}/edit/${
    !isNil(rowId) ? rowId : ""
  }`;

  const [bgColor, setBgColor] = useState("");
  const [color, setColor] = useState("");

  useEffect(() => {
    if (value === "locked") {
      setBgColor("#FFCACA");
      setColor("#DA2229");
    } else if (value === "active") {
      setBgColor("#BDFFDD");
      setColor("#22DA56");
    } else {
      setBgColor("#FFF");
      setColor("#787878");
    }
  }, [value]);

  switch (type) {
    case "dropdown":
      data = (
        <Dropdown
          data={dropdownOptions}
          bgColor={bgColor}
          color={color}
          withBorder
          initialValue={
            typeof value !== "string" ? JSON.stringify(value) : value
          }
          rowId={rowId}
          onChange={onDropdownChange}
        />
      );
      break;
    case "switch":
      data = (
        <Switch isChecked={!!value} rowId={rowId} onChange={onSwitchChange} />
      );
      break;
    case "date":
      data = dayjs(value).format("HH:mm:ss DD/MM/YYYY");
      break;
    case "link":
      data = (
        <NextLink passHref href={detaiPage}>
          {value}
        </NextLink>
      );
      break;
    case "linkDetail":
      data = (
        <Box minWidth="300px">
          <NextLink passHref href={customDetailPage}>
            {value}
          </NextLink>
        </Box>
      );
      break;
    case "linkEdit":
      data = (
        <NextLink passHref href={customEditPage}>
          <Icon viewBox="0 0 24 24" style={{ cursor: "pointer" }}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 16.8538V19.5556C4 19.8045 4.19553 20 4.44438 20H7.14623C7.26177 20 7.37731 19.9556 7.4573 19.8667L17.1626 10.1703L13.8297 6.83738L4.13331 16.5338C4.04444 16.6227 4 16.7293 4 16.8538ZM19.74 7.59283C20.0867 7.24622 20.0867 6.68629 19.74 6.33967L17.6603 4.25996C17.3137 3.91335 16.7538 3.91335 16.4072 4.25996L14.7807 5.8864L18.1136 9.21927L19.74 7.59283Z"
                fill="#757575"
              />
            </svg>
          </Icon>
        </NextLink>
      );
      break;
    case "title":
      data = <Box maxWidth="300px">{value}</Box>;
      break;
    default:
      data = value;
  }

  return <Td>{data}</Td>;
}
