import React, { useEffect, useState } from "react";
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

import {
  useUpdateNoticeboard,
  useGetNoticeboardById,
} from "@/hooks/noticeboard";

import {
  InitialEditNoticeboardValues,
  NoticeboardAssetType,
  NoticeboardAssetPayload,
} from "@/types/noticeboard";

interface NewFilePayload {
  file: File;
  index: number;
}

const mapToFiles = (file: string | File, index: number) => {
  if (file instanceof File) {
    return {
      file,
      index,
    };
  }

  return null;
};

const INITIAL_VALUES: InitialEditNoticeboardValues = {
  title: "",
  description: "",
  multimedias: [],
  documents: [],
};

export default function EditNoticeboard() {
  const toast = useToast();
  const router = useRouter();
  const { update, response } = useUpdateNoticeboard();
  const { fetchGetNoticeboardById, data } = useGetNoticeboardById();
  const { id } = router.query;
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    if (typeof id === "string" && id) {
      fetchGetNoticeboardById({
        variables: { getNoticeboardByIdInput: { id } },
      });
    }
  }, [fetchGetNoticeboardById, id]);

  useEffect(() => {
    if (data?.getNoticeboardById) {
      setInitialValues({
        title: data.getNoticeboardById.title,
        description: data.getNoticeboardById.description,
        multimedias: data.getNoticeboardById.photosAndVideos.map(
          ({ url }) => url
        ),
        documents: data.getNoticeboardById.documents.map(({ url }) => url),
      });
    }
  }, [data]);

  useEffect(() => {
    if (response) {
      toast({
        title: "Success",
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
        <Formik<InitialEditNoticeboardValues>
          enableReinitialize
          initialValues={initialValues}
          validationSchema={noticeboardSchema}
          onSubmit={async (values) => {
            try {
              if (typeof id === "string" && id && data) {
                // Filter new files in form values
                const newMultimediaFiles = values.multimedias
                  .map(mapToFiles)
                  .filter((file) => file) as NewFilePayload[];
                const newDocumentFiles = values.documents
                  .map(mapToFiles)
                  .filter((file) => file) as NewFilePayload[];

                const files = new FormData();
                const multimediaTypes: NoticeboardAssetType[] = [];
                let imageIndex = 1;
                let videoIndex = 1;
                let multimediaIndex = 0;
                let documentIndex = 0;
                let newlyUploadedPhotosAndVideos: NoticeboardAssetPayload[] =
                  [];
                let newlyUploadedDocuments: string[] = [];
                let photosAndVideos: NoticeboardAssetPayload[] = [];
                let documents: NoticeboardAssetPayload[] = [];

                files.append("folder", "noticeboard");
                newMultimediaFiles.forEach(({ file }) => {
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
                newDocumentFiles.forEach(({ file }) =>
                  files.append("files", file)
                );

                if (newMultimediaFiles.length || newDocumentFiles.length) {
                  const { data: uploadedFiles } = await uploadFiles(files);
                  newlyUploadedPhotosAndVideos = uploadedFiles
                    .slice(0, newMultimediaFiles.length)
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

                  newlyUploadedDocuments = uploadedFiles.slice(
                    newMultimediaFiles.length,
                    newMultimediaFiles.length + newDocumentFiles.length
                  );
                }

                photosAndVideos = values.multimedias.map((file, index) => {
                  const multimedia =
                    data.getNoticeboardById.photosAndVideos.find(
                      ({ url }) => url === file
                    );

                  if (file instanceof File) {
                    return newlyUploadedPhotosAndVideos[multimediaIndex];
                  } else if (multimedia) {
                    return {
                      title:
                        multimedia.noticeboardAssetType + " #" + (index + 1),
                      url: multimedia.url,
                      noticeboardAssetType: multimedia.noticeboardAssetType,
                    };
                  }

                  return {
                    title: "",
                    url: "",
                    noticeboardAssetType: NoticeboardAssetType.PHOTO,
                  };
                });

                documents = values.documents.map((file, index) => {
                  if (file instanceof File) {
                    return {
                      title: "DOCUMENT #" + (index + 1),
                      url: newlyUploadedDocuments[documentIndex++],
                      noticeboardAssetType: NoticeboardAssetType.DOCUMENT,
                    };
                  }

                  return {
                    title: "DOCUMENT #" + (index + 1),
                    url: file,
                    noticeboardAssetType: NoticeboardAssetType.DOCUMENT,
                  };
                });

                const properValues = {
                  title: values.title,
                  description: values.description,
                  photosAndVideos,
                  documents,
                  id,
                };

                await update({
                  variables: { editNoticeboardInput: properValues },
                });
              } else {
                throw new Error("Invalid ID");
              }
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
