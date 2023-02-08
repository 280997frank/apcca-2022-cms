import React from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  chakra,
} from "@chakra-ui/react";
import { useField } from "formik";
import dynamic from "next/dynamic";

import "react-quill/dist/quill.snow.css";

interface RichTextInputProps {
  name: string;
  id: string;
  label: string;
  placeholder?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
}

const ReactQuill = chakra(
  dynamic(() => import("react-quill"), {
    ssr: false,
  })
);

export default function RichTextInput({
  name,
  id,
  label,
  placeholder = "",
  isDisabled = false,
  isReadOnly = false,
}: RichTextInputProps) {
  const [, { value, error, touched }, { setValue }] = useField(name);

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(error && touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <FormLabel fontWeight="750">{label}</FormLabel>
      <ReactQuill
        mt="0.5rem"
        bgColor="white"
        theme="snow"
        value={value || placeholder}
        onChange={(val) => setValue(val)}
        sx={{
          "& .ql-editor": {
            minHeight: "12.7rem",
          },
        }}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
