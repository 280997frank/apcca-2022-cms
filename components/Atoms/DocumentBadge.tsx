import React from "react";
import { Flex, Icon, IconButton, Text } from "@chakra-ui/react";
import { BsFileText } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

interface DocumentBadgeProps {
  fileName: string;
  onRemove: () => void;
}

export default function DocumentBadge({
  fileName,
  onRemove,
}: DocumentBadgeProps) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bgColor="#FFFAE0"
      borderRadius="lg"
      border="1px solid #D7D7D7"
      p="0.25rem 2rem"
      w="full"
    >
      <Icon as={BsFileText} mr={6} />
      <Text fontSize="sm" color="#222222" flex="1">
        {fileName}
      </Text>
      <IconButton
        aria-label="Remove file"
        icon={<GrClose />}
        onClick={onRemove}
        bgColor="transparent"
        fontSize="1.5rem"
        sx={{
          "& path": {
            stroke: "#da2229",
          },
        }}
      />
    </Flex>
  );
}
