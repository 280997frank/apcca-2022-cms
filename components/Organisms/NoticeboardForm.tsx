import React from "react";
import { Form, FieldArray, FormikProps } from "formik";
import {
  HStack,
  VStack,
  Flex,
  Wrap,
  WrapItem,
  Box,
  Button,
  FormLabel,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";

import FormInput from "@/components/Atoms/FormInput";
import RichTextInput from "@/components/Atoms/RichTextInput";
import DocumentBadge from "@/components/Atoms/DocumentBadge";

interface BareboneValues {
  multimedias: (File | string)[];
  documents: (File | string)[];
}

interface NoticeboardFormProps<T> extends FormikProps<T> {}

const MediaUpload = dynamic(() => import("@/components/Atoms/MediaUpload"), {
  ssr: false,
});

export default function NoticeboardForm<T extends BareboneValues>({
  values,
  resetForm,
  isSubmitting,
}: NoticeboardFormProps<T>) {
  return (
    <Form>
      <HStack mb={8} gap={4}>
        <VStack flex="1" gap={8} alignSelf="stretch">
          <FormInput name="title" id="title" label="TITLE" />
          <RichTextInput
            name="description"
            id="description"
            label="DESCRIPTION"
          />
        </VStack>
        <VStack flex="1" alignSelf="stretch" alignItems="flex-start">
          <Box w="full">
            <FormLabel fontWeight="750">PHOTO AND VIDEO</FormLabel>
            <Wrap spacing={8} w="full">
              <FieldArray name="multimedias">
                {({ remove }) => {
                  return values.multimedias.map((file, index) => (
                    <WrapItem key={file instanceof File ? file.name : file}>
                      <Box w="10rem">
                        <MediaUpload
                          name={`multimedias.${index}`}
                          ratio={(4 / 3) * 100}
                          type="all"
                          onRemove={() => remove(index)}
                        />
                      </Box>
                    </WrapItem>
                  ));
                }}
              </FieldArray>
              <WrapItem>
                <Box w="10rem">
                  <MediaUpload
                    name={`multimedias.${values.multimedias.length}`}
                    ratio={(4 / 3) * 100}
                    type="all"
                  />
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
          <Box w="full">
            <FormLabel fontWeight="750">DOCUMENT</FormLabel>
            <VStack gap={4}>
              <FieldArray name="documents">
                {({ remove }) => {
                  return (
                    <>
                      {values.documents.map((file, index) => {
                        const fileName =
                          file instanceof File ? file.name : file;
                        return (
                          <DocumentBadge
                            key={fileName}
                            fileName={fileName}
                            onRemove={() => remove(index)}
                          />
                        );
                      })}
                      <MediaUpload
                        name={`documents.${values.documents.length}`}
                        ratio={(2 / 10) * 100}
                        type="application/pdf"
                        accept="application/pdf"
                      />
                    </>
                  );
                }}
              </FieldArray>
            </VStack>
          </Box>
        </VStack>
      </HStack>
      <Flex gap={4}>
        <Button
          fontWeight="750"
          borderRadius="lg"
          color="#333333"
          bgColor="brand.yellow"
          minW="10rem"
          type="submit"
          isLoading={isSubmitting}
        >
          PUBLISH
        </Button>
        <Button
          fontWeight="500"
          borderRadius="lg"
          color="#757575"
          minW="10rem"
          border="1px solid #D7D7D7"
          onClick={() => resetForm()}
          disabled={isSubmitting}
        >
          CANCEL
        </Button>
      </Flex>
    </Form>
  );
}
