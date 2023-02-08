import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useToast } from "@chakra-ui/react";

import {
  DiscussionForumList,
  DiscussionForumInput,
  TDiscussionForumUpdate,
  TResDiscussionForumUpdate,
  TReqDiscussion,
} from "@/types/discussionForum";

const GET_DISCUSSION_FORUM = gql`
  query listThreads($param: ListThreadsInput!) {
    listThreads(param: $param) {
      page
      limit
      total
      totalPage
      data {
        id
        title
        text
        status
        creator {
          id
          firstName
          lastName
        }
        likes {
          id
        }
        replies {
          id
        }
        totalReplies
        createdAt
      }
    }
  }
`;

export const useDiscussionForumList = (payload: TReqDiscussion) => {
  const toast = useToast();
  const [fetchDiscussionForumList, { data, loading, called }] = useLazyQuery<
    DiscussionForumList,
    DiscussionForumInput
  >(GET_DISCUSSION_FORUM, {
    notifyOnNetworkStatusChange: true,
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    variables: {
      param: payload,
    },
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
    },
  });

  return {
    fetchDiscussionForumList,
    data,
    loading,
    called,
  };
};

const DELETE_DISCUSSION_FORUM = gql`
  mutation updateThread($param: UpdateThreadsInput!) {
    updateThread(param: $param) {
      success
    }
  }
`;

export const useUpdateData = (payload: TReqDiscussion, type: string) => {
  const { fetchDiscussionForumList } = useDiscussionForumList(payload);
  const toast = useToast();
  const [mutationUpdate, { data, loading, called }] = useMutation<
    TResDiscussionForumUpdate,
    TDiscussionForumUpdate
  >(DELETE_DISCUSSION_FORUM, {
    onCompleted: () => {
      toast({
        title: `Succes ${type} Data`,
        position: "bottom",
        isClosable: true,
        status: type === "Update" ? "success" : "error",
      });
      fetchDiscussionForumList();
    },
    onError: (error) => {
      toast({
        title: error.message,
        position: "bottom",
        isClosable: true,
        status: "error",
      });
      fetchDiscussionForumList();
    },
  });

  return {
    mutationUpdate,
    data,
    loading,
    called,
  };
};
