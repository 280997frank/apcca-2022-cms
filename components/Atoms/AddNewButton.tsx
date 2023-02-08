import React from "react";
import { Icon, Link, Button } from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import NextLink from "next/link";

export interface AddNewButtonProps {
  url: string;
  bgColor: string;
  onClick?: () => void;
}

export default function AddNewButton({
  url,
  bgColor,
  onClick,
}: AddNewButtonProps) {
  if (onClick) {
    return (
      <Button
        bgColor={bgColor}
        color="#081029"
        fontSize="xl"
        fontWeight="500"
        display="flex"
        alignItems="center"
        px={4}
        borderRadius="16px"
        onClick={onClick}
      >
        <Icon as={AiOutlinePlus} mr={4} />
        ADD
      </Button>
    );
  }

  return (
    <NextLink href={url} passHref>
      <Link
        bgColor={bgColor}
        color="#081029"
        fontSize="xl"
        fontWeight="500"
        display="flex"
        alignItems="center"
        borderRadius="16px"
        px={4}
      >
        <Icon as={AiOutlinePlus} mr={4} />
        ADD
      </Link>
    </NextLink>
  );
}
