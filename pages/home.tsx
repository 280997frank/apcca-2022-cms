import React, { useEffect, useState } from "react";
import { Flex, Button, useToast } from "@chakra-ui/react";

import Layout from "@/components/Templates/Layout";
import HomeCard from "@/components/Molecules/HomeCard";

import { useNoticeboardList } from "@/hooks/noticeboard";
import { useDiscussionForumList } from "@/hooks/discussionForum";

import {
  exportNoticeboard,
  exportDiscussionThreads,
} from "@/connections/api/exports";

export default function HomePage() {
  const { fetchNoticeboard, data, loading } = useNoticeboardList({
    limit: 1,
    page: 1,
  });

  const toast = useToast();
  const [isExporting, setExporting] = useState(false);

  const {
    fetchDiscussionForumList,
    data: threadList,
    loading: isFetchingThread,
  } = useDiscussionForumList({ limit: 1, page: 1, search: "" });

  useEffect(() => {
    fetchNoticeboard();
  }, [fetchNoticeboard]);

  useEffect(() => {
    fetchDiscussionForumList();
  }, [fetchDiscussionForumList]);

  return (
    <Layout title="Home" isPrivate>
      <Flex justifyContent="flex-end" my={10}>
        <Button
          fontWeight="bold"
          fontSize="lg"
          bgColor="brand.yellow"
          color="#333333"
          isLoading={isExporting}
          onClick={async () => {
            try {
              setExporting(true);
              await Promise.all([
                exportNoticeboard(),
                exportDiscussionThreads(),
              ]);
            } catch (error) {
              if (error instanceof Error) {
                toast({
                  title: error.message,
                  position: "bottom",
                  isClosable: true,
                  status: "error",
                });
              } else {
                console.error(error);
              }
            } finally {
              setExporting(false);
            }
          }}
        >
          Export Data
        </Button>
      </Flex>
      <Flex justifyContent="space-between" gap={4}>
        <HomeCard
          label="TOTAL DISCUSSION FORUM"
          qty={threadList?.listThreads.total || 0}
          url="/discussion-forum"
          isLoading={isFetchingThread}
        />
        <HomeCard
          label="TOTAL NOTICEBOARD"
          qty={data?.listNoticeboard.total || 0}
          url="/noticeboard"
          isLoading={loading}
        />
      </Flex>
    </Layout>
  );
}
