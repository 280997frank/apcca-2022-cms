import React, { useEffect } from "react";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
} from "@chakra-ui/react";
import { HiChevronRight } from "react-icons/hi";
import { Formik } from "formik";
import { useRouter } from "next/router";

import NoticeboardForm from "@/components/Organisms/NoticeboardForm";
import Layout from "@/components/Templates/Layout";

import { noticeboardSchema } from "@/constants/validationSchemas";

import { uploadFiles } from "@/connections/api/upload";

import { useCreateNoticeboard } from "@/hooks/noticeboard";

import {
  InitialNoticeboardValues,
  NoticeboardAssetType,
  NoticeboardAssetPayload,
} from "@/types/noticeboard";

const INITIAL_VALUES: InitialNoticeboardValues = {
  title: "",
  description: "",
  multimedias: [],
  documents: [],
};

export default function NewNoticeboard() {
  const toast = useToast();
  const router = useRouter();
  const { create, response } = useCreateNoticeboard();

  useEffect(() => {
    if (response) {
      toast({
        title: "Succes",
        position: "bottom",
        isClosable: true,
        status: "success",
      });
      router.push("/noticeboard");
    }
  }, [toast, router, response]);

  return (
    <Layout title="Noticeboard" isPrivate>
      <Box
        margin={{ base: "0px -30px -2rem", md: "0px 0px 2rem" }}
        p={{ base: "0px 16px", md: "0px" }}
      >
        <Box h="100px" />
        <Breadcrumb
          spacing="8px"
          mb={8}
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
              Add
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Formik<InitialNoticeboardValues>
          initialValues={INITIAL_VALUES}
          validationSchema={noticeboardSchema}
          onSubmit={async (values) => {
            try {
              const files = new FormData();
              const multimediaTypes: NoticeboardAssetType[] = [];
              let imageIndex = 1;
              let videoIndex = 1;
              let photosAndVideos: NoticeboardAssetPayload[] = [];
              let documents: NoticeboardAssetPayload[] = [];

              files.append("folder", "noticeboard");
              values.multimedias.forEach((file) => {
                const mimeType = file.type.split("/")[0];

                switch (mimeType) {
                  case "image":
                    multimediaTypes.push(NoticeboardAssetType.PHOTO);
                    break;
                  case "video":
                    multimediaTypes.push(NoticeboardAssetType.VIDEO);
                    break;
                }

                files.append("files", file);
              });
              values.documents.forEach((file) => files.append("files", file));

              if (values.multimedias.length || values.documents.length) {
                const { data: uploadedFiles } = await uploadFiles(files);
                photosAndVideos = uploadedFiles
                  .slice(0, values.multimedias.length)
                  .map((url, index) => {
                    let title = "";

                    switch (multimediaTypes[index]) {
                      case NoticeboardAssetType.PHOTO:
                        title =
                          NoticeboardAssetType.PHOTO + " #" + imageIndex++;
                        break;
                      case NoticeboardAssetType.VIDEO:
                        title =
                          NoticeboardAssetType.VIDEO + " #" + videoIndex++;
                        break;
                    }

                    return {
                      title,
                      url,
                      noticeboardAssetType: multimediaTypes[index],
                    };
                  });

                documents = uploadedFiles
                  .slice(
                    values.multimedias.length,
                    values.multimedias.length + values.documents.length
                  )
                  .map((url, index) => ({
                    title: "DOCUMENT #" + (index + 1),
                    url,
                    noticeboardAssetType: NoticeboardAssetType.DOCUMENT,
                  }));
              }

              const properValues = {
                title: values.title,
                description: values.description,
                photosAndVideos,
                documents,
              };

              await create({
                variables: { createNoticeboardInput: properValues },
              });
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: error.message,
                  position: "bottom",
                  isClosable: true,
                  status: "error",
                });
              }
            }
          }}
          component={NoticeboardForm}
        />
      </Box>
    </Layout>
  );
}
