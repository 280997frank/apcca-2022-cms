import React from "react";
import { VStack, Heading, Button, Text, SkeletonText } from "@chakra-ui/react";
import { RiBarChartFill } from "react-icons/ri";
import { useRouter } from "next/router";

interface HomeCardProps {
  label: string;
  qty: number;
  url: string;
  isLoading: boolean;
}

export default function HomeCard({
  label,
  qty,
  url,
  isLoading,
}: HomeCardProps) {
  const router = useRouter();

  return (
    <VStack
      borderColor="brand.yellow"
      borderWidth="2px"
      borderStyle="solid"
      bgColor="white"
      p={4}
      borderRadius="lg"
      justifyContent="center"
      flex="1"
      gap={6}
    >
      <Heading fontSize="md" color="#4d4d4d">
        {label}
      </Heading>
      {isLoading ? (
        <SkeletonText mt="4" noOfLines={1} spacing="4" fontSize="5xl" />
      ) : (
        <Text color="#4d4d4d" fontSize="5xl" fontWeight="bold">
          {qty}
        </Text>
      )}
      <Button
        leftIcon={<RiBarChartFill />}
        bgColor="brand.yellow"
        color="#222222"
        w="full"
        borderRadius="2xl"
        onClick={() => router.push(url)}
      >
        SHOW DETAILS
      </Button>
    </VStack>
  );
}
