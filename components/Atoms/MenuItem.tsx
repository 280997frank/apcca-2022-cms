import React, { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Flex, Link, Icon } from "@chakra-ui/react";

interface MenuItemProps {
  url: string;
  label: string;
  icon: FC;
}

export default function MenuItem({ url, label, icon }: MenuItemProps) {
  const router = useRouter();

  return (
    <NextLink href={url} passHref>
      <Link
        lineHeight="2"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Flex
          borderRadius="lg"
          gap={4}
          alignItems="center"
          pl={4}
          fontSize="xl"
          color={router.pathname.includes(url) ? "black" : "#9b9b9b"}
          bgColor={
            router.pathname.includes(url) ? "brand.yellow" : "transparent"
          }
          _hover={{ bgColor: "brand.yellow", color: "black" }}
        >
          <Icon as={icon} />
          {label}
        </Flex>
      </Link>
    </NextLink>
  );
}
