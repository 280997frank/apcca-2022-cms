import React, { ReactNode } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";

interface FormInputProps {
  name: string;
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  description?: string;
  isDisabled?: boolean;
  isReadOnly?: boolean;
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
}

export default function FormInput({
  name,
  id,
  label,
  type = "text",
  placeholder = "",
  description = "",
  isDisabled = false,
  isReadOnly = false,
  LeftElement,
  RightElement,
}: FormInputProps) {
  const [{ value }, meta, { setValue }] = useField(name);
  let autoComplete = "off";

  switch (type) {
    case "email":
      autoComplete = "email";
      break;
    case "password":
      autoComplete = "current-password";
      break;
  }

  return (
    <FormControl
      id={id}
      isInvalid={Boolean(meta.error && meta.touched)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
    >
      <FormLabel fontWeight="750">{label}</FormLabel>
      <InputGroup>
        {LeftElement && (
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            {LeftElement}
          </InputLeftElement>
        )}
        <Input
          type={type}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          bgColor="white"
          color="#757575"
          fontFamily="Avenir Next"
          lineHeight="1.5"
          fontWeight="500"
          autoComplete={autoComplete}
          value={value}
        />
        {RightElement && (
          <InputRightElement
            // pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
          >
            {RightElement}
          </InputRightElement>
        )}
      </InputGroup>
      {description && <FormHelperText>{description}</FormHelperText>}
      <FormErrorMessage>{meta.error}</FormErrorMessage>
    </FormControl>
  );
}
