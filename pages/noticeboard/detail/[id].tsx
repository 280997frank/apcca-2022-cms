import Layout from "@/components/Templates/Layout";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import React, { FC, useEffect } from "react";
import { AiFillLike } from "react-icons/ai";
import { BsArrowLeft, BsFillCameraVideoFill } from "react-icons/bs";
import { HiChevronRight, HiMenuAlt2 } from "react-icons/hi";

import landingPageMobilePng from "@/assets/images/landing-mobile-bg.png";
import { useGetNoticeboardById } from "@/hooks/noticeboard";
import { useRouter } from "next/router";

const NoticeboardDetail: FC = () => {
  const { fetchGetNoticeboardById, data } = useGetNoticeboardById();
  const router = useRouter();
  const { id } = router.query;

  // lifecycle
  useEffect(() => {
    if (typeof id === "string" && id) {
      fetchGetNoticeboardById({
        variables: { getNoticeboardByIdInput: { id } },
      });
    }
  }, [fetchGetNoticeboardById, id]);

  return (
    <Layout title="Noticeboard Detail" isPrivate>
      <Box
        backgroundImage={{ base: landingPageMobilePng.src, md: "none" }}
        bgSize="auto 100%"
        bgPos="bottom"
        bgRepeat="no-repeat"
        margin={{ base: "0px -30px -2rem", md: "0px 0px 2rem" }}
        p={{ base: "0px 16px", md: "0px" }}
      >
        <Box h="100px" />
        <Breadcrumb
          display={{ base: "none", lg: "block" }}
          spacing="8px"
          separator={
            <HiChevronRight color="gray.500" fontSize="34px" height="40px" />
          }
        >
          <BreadcrumbItem>
            <BreadcrumbLink
              href="/noticeboard"
              fontWeight="750"
              fontSize="24px"
              textTransform="uppercase"
              color="brand.grey70"
            >
              Noticeboard
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink
              fontWeight="750"
              fontSize="24px"
              textTransform="uppercase"
              color="brand.grey40"
            >
              Details
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Button
          bg="transparent"
          _hover={{}}
          p="0"
          fontWeight="400"
          fontSize="16px"
          lineHeight="19px"
          leftIcon={
            <BsArrowLeft fontSize="26px" style={{ marginBottom: "4px" }} />
          }
          display={{ base: "flex", lg: "none" }}
        >
          BACK
        </Button>

        <Flex mt="40px" gap="24px">
          <Box
            p="24px"
            bg="white"
            border="2px solid #D7D7D7"
            borderRadius="8px"
            w={{ base: "100%", xl: "80%" }}
          >
            <Text
              fontWeight="600"
              fontSize={{ base: "16px", md: "32px" }}
              lineHeight={{ base: "19px", md: "38px" }}
              color="black"
              mb="8px"
            >
              {data?.getNoticeboardById?.title}
            </Text>
            <Text
              fontWeight="400"
              fontSize={{ base: "12px", lg: "16px" }}
              lineHeight={{ base: "14px", lg: "19px" }}
              color="black"
              mb="24px"
            >
              {data?.getNoticeboardById?.description}
            </Text>

            <Grid templateColumns="repeat(2, 1fr)" gap="24px" mb="24px">
              {data?.getNoticeboardById?.photosAndVideos?.map(
                (photoAndVideo) => (
                  <GridItem key={photoAndVideo?.id} w="100%">
                    <Image
                      src={photoAndVideo?.url}
                      w="100%"
                      h={{ "2xl": "150px", "3xl": "241px" }}
                      flex={1}
                      alt="img1"
                    />
                  </GridItem>
                )
              )}
            </Grid>

            <Box mb="24px">
              <Text
                fontWeight="400"
                fontSize="16px"
                lineHeight="19px"
                color="brand.textBody"
                mb="8.5px"
              >
                Attachments
              </Text>
              <Grid
                templateColumns={{
                  base: "repeat(2, 1fr)",
                  xl: "repeat(3, 1fr)",
                  "2xl": "repeat(4, 1fr)",
                  "3xl": "repeat(6, 1fr)",
                }}
                gap="24px"
              >
                {data?.getNoticeboardById?.documents.map((document) => {
                  return (
                    <GridItem key={document?.id}>
                      <Box
                        p="8px 20px"
                        bg="brand.yellowPastel"
                        border="1px solid #D7D7D7"
                        borderRadius="8px"
                      >
                        <Flex alignItems="center" gap="15px">
                          <Box p="5px" borderRadius="5px">
                            {document?.noticeboardAssetType === "DOCUMENT" && (
                              <HiMenuAlt2 color="#FFFAE0" />
                            )}
                            {document?.noticeboardAssetType === "VIDEO" && (
                              <BsFillCameraVideoFill />
                            )}
                          </Box>
                          <Text
                            fontWeight="400"
                            fontSize="12px"
                            lineHeight="14px"
                            color="brand.textTitle"
                          >
                            {document?.title}
                          </Text>
                        </Flex>
                      </Box>
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>

            <Box
              w="fit-content"
              bg="brand.grey10"
              border="1px solid #D7D7D7"
              borderRadius="8px"
              p="10px 20px"
              display={{ base: "flex", xl: "none" }}
            >
              <Flex gap="20px">
                <AiFillLike fontSize="20px" />
                <Text
                  fontWeight="400"
                  fontSize="20px"
                  lineHeight="24px"
                  color="brand.textTitle"
                >
                  {data?.getNoticeboardById?.totalLike}
                </Text>
              </Flex>
            </Box>
          </Box>

          <Flex
            flexDir="column"
            gap="8px"
            display={{ base: "none", xl: "flex" }}
          >
            <Text
              fontWeight="750"
              fontSize="16px"
              lineHeight="19px"
              textTransform="uppercase"
            >
              likes
            </Text>
            <Box bg="brand.yellowPastel" borderRadius="8px" w="264px">
              <Flex justifyContent="center" alignItems="center" h="204px">
                <Text
                  fontWeight="600"
                  fontSize="40px"
                  lineHeight="47px"
                  color="brand.textTitle"
                >
                  {data?.getNoticeboardById?.totalLike}
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default NoticeboardDetail;
