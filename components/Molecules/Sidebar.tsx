import React from "react";
import { VStack, Box, Img, chakra, Flex, Link } from "@chakra-ui/react";
import { HiHome } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaUserFriends } from "react-icons/fa";
import { useRouter } from "next/router";

import MenuItem from "@/components/Atoms/MenuItem";

import { removeAccessToken } from "@/utils";

import eventLogo from "@/assets/images/apcca-event-logo.png";

const MENU_ITEMS = [
  { url: "/home", label: "Home", icon: HiHome },
  { url: "/discussion-forum", label: "Discussion Forum", icon: FaUserFriends },
  { url: "/noticeboard", label: "Noticeboard", icon: FaBell },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <VStack
      w="18rem"
      h="100vh"
      overflowY="auto"
      p=" 2rem 1rem 1rem"
      justifyContent="space-between"
      alignItems="flex-start"
      sx={{
        "&::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "brand.grey",
          borderRadius: "3rem",
        },
      }}
    >
      <Box w="full">
        <Img
          src={eventLogo.src}
          htmlWidth={eventLogo.width}
          htmlHeight={eventLogo.height}
          w="6rem"
          mx="auto"
          mb={8}
        />
        <Flex flexDir="column" h="100%">
          <chakra.ul listStyleType="none">
            {MENU_ITEMS.map(({ url, label, icon }) => (
              <chakra.li
                key={url}
                sx={{
                  "&:not(:last-of-type)": {
                    marginBottom: "0.5rem",
                  },
                }}
              >
                <MenuItem url={url} label={label} icon={icon} />
              </chakra.li>
            ))}
          </chakra.ul>
        </Flex>
      </Box>
      <Link
        as="button"
        lineHeight="2"
        _hover={{
          textDecoration: "none",
        }}
        w="full"
        onClick={() => {
          removeAccessToken();
          router.push("/");
        }}
      >
        <Flex
          borderRadius="lg"
          gap={4}
          alignItems="center"
          pl={4}
          fontSize="xl"
          _hover={{ bgColor: "brand.yellow", color: "black" }}
        >
          <BiLogOut />
          Logout
        </Flex>
      </Link>
    </VStack>
  );
}
