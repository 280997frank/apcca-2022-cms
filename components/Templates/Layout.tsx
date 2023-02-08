import React, { ReactNode, useEffect } from "react";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { Flex, Box, Heading, Img } from "@chakra-ui/react";

import Sidebar from "@/components/Molecules/Sidebar";

import { getAccessToken } from "@/utils";

import landingPagePng from "@/assets/images/landing-desktop-bg.png";
import landingPageWebp from "@/assets/images/landing-desktop-bg.webp";
import apccaLogoPng from "@/assets/images/apcca-logo.png";
import apccaLogoWebp from "@/assets/images/apcca-logo.webp";
import spsLogoPng from "@/assets/images/sps-logo.png";
import spsLogoWebp from "@/assets/images/sps-logo.webp";

interface LayoutProps {
  children: ReactNode;
  title: string;
  isPrivate?: boolean;
  description?: string;
}

const TRANSPARENT_WHITE_BG =
  "linear-gradient(0deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75))";

export default function Layout({
  children,
  title,
  description,
  isPrivate,
}: LayoutProps) {
  const router = useRouter();

  useEffect(() => {
    if (isPrivate && !getAccessToken()) {
      router.push("/");
    }
  }, [isPrivate, router]);

  return (
    <>
      <Head>
        <title>{title} | APCCA 2022 CMS</title>
        <meta name="description" content={description} />
      </Head>
      <Script src="/modernizr-webp.js" />
      <Flex h="100vh" flexDir="row">
        <Sidebar />
        <Box
          flex="1"
          bgSize="auto 100%"
          bgPos="bottom"
          bgRepeat="no-repeat"
          p={8}
          h="100vh"
          maxH="100vh"
          overflowY="auto"
          flexDir="row"
          sx={{
            ".webp &": {
              bgImage: `${TRANSPARENT_WHITE_BG}, url(${landingPageWebp.src})`,
            },
            ".no-webp &": {
              bgImage: `${TRANSPARENT_WHITE_BG}, url(${landingPagePng.src})`,
            },
          }}
        >
          <Flex as="header" justifyContent="space-between">
            <Heading fontSize="2rem" color="#222222">
              {title}
            </Heading>
            <Flex gap={8}>
              <picture>
                <source srcSet={apccaLogoWebp.src} type="media/webp" />
                <Img
                  src={apccaLogoPng.src}
                  htmlWidth={apccaLogoPng.width}
                  htmlHeight={apccaLogoPng.height}
                  alt="Asian and Pacific Conference of Correctional Administrators"
                  h={10}
                  w="auto"
                />
              </picture>
              <picture>
                <source srcSet={spsLogoWebp.src} type="media/webp" />
                <Img
                  src={spsLogoPng.src}
                  htmlWidth={spsLogoPng.width}
                  htmlHeight={spsLogoPng.height}
                  alt="Singapore Prison Service"
                  h={10}
                  w="auto"
                  pos="relative"
                  top="-0.5rem"
                />
              </picture>
            </Flex>
          </Flex>
          {children}
        </Box>
      </Flex>
    </>
  );
}
