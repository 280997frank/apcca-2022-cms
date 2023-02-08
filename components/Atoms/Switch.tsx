import React from "react";
import { Switch as ChakraSwitch } from "@chakra-ui/react";

interface SwitchProps {
  isChecked: boolean;
  onChange?: (value: string, rowId?: string) => Promise<void>;
  rowId?: string;
}

export default function Switch({ isChecked, onChange, rowId }: SwitchProps) {
  return (
    <ChakraSwitch
      colorScheme="green"
      display="flex"
      alignItems="center"
      minW={100}
      isChecked={isChecked}
      onChange={(e) => onChange?.(e.target.value, rowId)}
      // sx={{
      //   "& > span": {
      //     // borderRadius: 0,
      //     // bgColor: "white",
      //     // border: "1px solid black",
      //   },
      // }}
    />
  );
}
