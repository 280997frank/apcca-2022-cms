import React, { useState, useEffect } from "react";
import Script from "next/script";
import Head from "next/head";
import {
  Center,
  Flex,
  Box,
  Img,
  Button,
  IconButton,
  chakra,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import FormInput from "@/components/Atoms/FormInput";

import { useLoginSubmit } from "@/hooks/auth";

import { storeAccessToken, getAccessToken } from "@/utils";

import landingPagePng from "@/assets/images/landing-desktop-bg.png";
import landingPageWebp from "@/assets/images/landing-desktop-bg.webp";
import eventLogo from "@/assets/images/apcca-event-logo.png";

interface InitialValues {
  email: string;
  password: string;
}

const INITIAL_VALUES: InitialValues = {
  email: "",
  password: "",
};

const ChakrafiedForm = chakra(Form);

export default function LoginPage() {
  const [isPasswordInput, setPasswordInput] = useState(true);
  const { login, response, loading } = useLoginSubmit();

  useEffect(() => {
    if (response) {
      storeAccessToken(response.login.token);
      window.location.href = "/home";
    }
  }, [response]);

  useEffect(() => {
    if (getAccessToken()) {
      window.location.href = "/home";
    }
  }, []);

  return (
    <>
      <Head>
        <title>APCCA 2022 CMS</title>
      </Head>
      <Script src="/modernizr-webp.js" />
      <Center
        bgSize="100% auto"
        bgPos="bottom"
        h="100vh"
        sx={{
          ".webp &": {
            bgImage: `url(${landingPageWebp.src})`,
          },
          ".no-webp &": {
            bgImage: `url(${landingPagePng.src})`,
          },
        }}
      >
        <Flex
          flexDir="column"
          alignItems="center"
          bgColor="rgba(255, 255, 255, 0.5)"
          borderRadius="2.5rem"
          p="2rem 4.5rem"
          w="43.75vw"
          maxH="full"
          overflowY="auto"
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
          <Img
            src={eventLogo.src}
            htmlWidth={eventLogo.width}
            htmlHeight={eventLogo.height}
            w="16.15vw"
          />
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={(values) => {
              return login({ variables: { loginInput: values } });
            }}
          >
            {() => {
              return (
                <ChakrafiedForm w="full">
                  <Box mt={4} mb={6}>
                    <FormInput
                      name="email"
                      id="email"
                      label="EMAIL"
                      isDisabled={loading}
                      type="email"
                    />
                  </Box>
                  <Box mb={8}>
                    <FormInput
                      name="password"
                      id="password"
                      label="PASSWORD"
                      type={isPasswordInput ? "password" : "text"}
                      isDisabled={loading}
                      RightElement={
                        <IconButton
                          bgColor="white"
                          aria-label={`${
                            isPasswordInput ? "Show" : "Hide"
                          } password`}
                          color="#4D4D4D"
                          icon={isPasswordInput ? <FaEyeSlash /> : <FaEye />}
                          onClick={() =>
                            setPasswordInput(() => !isPasswordInput)
                          }
                          _focus={{ boxShadow: "none" }}
                        />
                      }
                    />
                  </Box>
                  <Button
                    type="submit"
                    bgColor="brand.yellow"
                    fontSize="xl"
                    fontWeight="normal"
                    w="full"
                    isLoading={loading}
                  >
                    SIGN IN
                  </Button>
                </ChakrafiedForm>
              );
            }}
          </Formik>
        </Flex>
      </Center>
    </>
  );
}
